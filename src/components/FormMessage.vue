<template>
  <div id="formaM">
    <div id="form-style-10">
      <form id="forma">
        <div id="section">
          <p>
            <span id="formTitle">{{ formType }} Message</span>
            <label id="close-icon" @click="exit" style="font-size: 20px">X</label>
          </p>
        </div>

        <div id="style-options">
          <div
            class="style-option"
            style="font-weight: bold"
            :class="{styleOptionSelected: boldSelected}"
            @click="select('bold')"
          >Bold</div>
          <div
            class="style-option"
            style="font-style: italic"
            :class="{styleOptionSelected: italicSelected}"
            @click="select('italic')"
          >Italic</div>
          <div
            style="text-decoration: underline"
            class="style-option"
            :class="{styleOptionSelected: urlSelected}"
            @click="select('url')"
          >Url</div>
        </div>

        <div id="inner-wrap">
          <label :class="{errorText: showTitleError}">Title</label>
          <input
            autocomplete="off"
            type="text"
            name="field1"
            placeholder="New message"
            v-model="title"
            id="field1"
            :class="{errorBorder: showTitleError}"
          />
          <span v-show="showTitleError">Title size should be between 5 and 30 characters</span>
          <br />
          <span
            v-show="boldSelected || italicSelected"
            style="color: grey"
          >Please input text between {{ styleCharacters }}</span>
          <span
            v-show="urlSelected"
            style="color: grey"
          >Please input your url instead "url" and your text instead "text"</span>

          <label :class="{errorText: showMessageError}">Text</label>
          <textarea
            id="textarea"
            name="field2"
            placeholder="Type your message text here"
            v-model="text"
            cols="30"
            rows="8"
            :class="{errorBorder: showMessageError}"
          ></textarea>
          <span v-show="showMessageError">Text size should be more then 20 characters</span>
          <br />
          <br />
          <input type="button" value="Save" @click="save" id="submit" />
          <input type="button" value="Cancel" @click="exit" id="cancle" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  ACCESS_TOKEN,
  USER_LANGUAGE,
  CREATEMESSAGE,
  SAVE,
  CANCEL,
  TITLE,
  TEXT,
  NEWMESSAGE,
  TYPEYOURMESSAGE,
  USER_THEME
} from "../constants/index.js";
import axios from "axios";

import { API_BASE_URL } from "../constants";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

export default {
  name: "formaM",
  data() {
    return {
      title: "",
      text: "",
      formType: "Create",
      showTitleError: false,
      showMessageError: false,
      invalid: false,
      liveValidation: false,
      boldSelected: false,
      italicSelected: false,
      urlSelected: false,
      regexTitle: /^.{5,30}$/,
      regexText: /^.{20,}$/,
      styleCharacters: ""
    };
  },

  mounted: function() {
    if (this.$route.params.id != null) {
      this.create();
      this.formType = "Update";
    }
    if (localStorage.getItem(USER_LANGUAGE) != "en") {
      document.getElementById("formTitle").innerHTML = localStorage.getItem(
        CREATEMESSAGE
      );
      document.getElementById("submit").value = localStorage.getItem(SAVE);
      document.getElementById("cancle").value = localStorage.getItem(CANCEL);
      document.getElementsByTagName(
        "label"
      )[1].innerHTML = localStorage.getItem(TITLE);
      document.getElementsByTagName(
        "label"
      )[2].innerHTML = localStorage.getItem(TEXT);
      document.getElementsByTagName(
        "input"
      )[0].placeholder = localStorage.getItem(NEWMESSAGE);
      document.getElementsByTagName(
        "textarea"
      )[0].placeholder = localStorage.getItem(TYPEYOURMESSAGE);
    }
    if(localStorage.getItem(USER_THEME)=="Dark"){
       document.getElementById("cancle").style.backgroundColor="#191919";
        document.getElementById("cancle").style.color="white";
      document.getElementById("formTitle").style.color="white";
      document.getElementById("form-style-10").style.backgroundColor="#191919";
       document.getElementById("inner-wrap").style.backgroundColor="#191919";
       document.getElementsByTagName("label")[0].style.backgroundColor="#191919";
       document.getElementsByTagName("label")[1].style.backgroundColor="#191919";
       document.getElementsByTagName("label")[2].style.backgroundColor="#191919";

    }
  },

  watch: {
    title(value) {
      this.title = value;
      if (this.liveValidation == true) this.check_title(value);
    },

    text(value) {
      this.text = value;
      if (this.liveValidation == true) this.check_text(value);
    }
  },

  methods: {
    exit() {
      this.$emit("reload-messages");
      this.$router.go(-1);
    },

    check_title(value) {
      if (!this.regexTitle.test(value)) {
        this.showTitleError = true;
        return false;
      } else {
        this.showTitleError = false;
        return true;
      }
    },

    check_text(value) {
      if (!this.regexText.test(value)) {
        this.showMessageError = true;
        return false;
      } else {
        this.showMessageError = false;
        return true;
      }
    },

    select(value) {
      if (value == "bold") {
        if (this.boldSelected == false) {
          this.boldSelected = true;
          this.urlSelected = false;
        } else {
          if (this.italicSelected == true) {
            this.text += " _ _";
            this.styleCharacters = "_ _";
          }
          this.boldSelected = false;
          return;
        }
      } else if (value == "italic") {
        if (this.italicSelected == false) {
          this.italicSelected = true;
          this.urlSelected = false;
        } else {
          if (this.boldSelected == true) {
            this.text += " **";
            this.styleCharacters = "**";
          }
          this.italicSelected = false;
          return;
        }
      } else if (value == "url") {
        if (this.urlSelected == false) this.urlSelected = true;
        else this.urlSelected = false;

        this.italicSelected = false;
        this.boldSelected = false;
      }

      if (this.italicSelected == true && this.boldSelected == true) {
        this.text += " _**_";
        this.styleCharacters = "_**_";
      } else if (this.boldSelected == true) {
        this.text += " **";
        this.styleCharacters = "**";
      } else if (this.italicSelected == true) {
        this.text += " _ _";
        this.styleCharacters = "_ _";
      } else if (this.urlSelected == true) this.text += " <url|text>";
    },

    async save() {
      this.liveValidation = true;
      if (this.check_text(this.text) == false) this.invalid = true;
      if (this.check_title(this.title) == false) this.invalid = true;
      if (this.invalid == true) {
        this.invalid = false;
        return;
      } else {
        if (this.$route.params.id == null) {
          try {
            await axios.post(
              API_BASE_URL + "/api/messages",
              {
                title: this.title,
                text: this.text
              },
              { headers: headers }
            );
          } catch (err) {
            this.$emit("show-notification", -1);
            this.$router.go(-1);
            return;
          }
        } else {
          try {
            await axios.put(
              API_BASE_URL + "/api/messages/" + this.$route.params.id,
              { title: this.title, text: this.text }
            );
          } catch (err) {
            this.$emit("show-notification", -1);
            this.$router.go(-1);
            return;
          }
        }
        this.$emit("reload-messages");
        this.$emit("show-notification");
        this.$router.go(-1);
      }
    },

    async create() {
      try {
        const res = await axios.get(
          API_BASE_URL + "/api/messages/" + this.$route.params.id
        );
        this.title = res.data.title;
        this.text = res.data.text;
      } catch (err) {
        this.$emit("show-notification", -1);
      }
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}
#formTitle{
  color: #4d4d4d;
}
#form-style-10 {
  width: 640px;
  height: 530px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
  display: block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 95;
}

#form-style-10 #inner-wrap {
  display: block;
  padding: 20px;
  padding-top: 0px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 15px;
}

#style-options {
  display: flex;
  padding-left: 20px;
  margin-top: 15px;
}

.style-option {
  width: 50px;
  height: 35px;
  border: 1px inset rgba(0, 0, 0, 0.2);
  text-align: center;
  margin-right: 15px;
  line-height: 35px;
  border-radius: 7px;
}

.style-option:hover {
  cursor: pointer;
  background-color: rgb(226, 217, 217);
  border: none;
}

.styleOptionSelected {
  cursor: pointer;
  background-color: rgb(226, 217, 217);
  border: none;
}

#form-style-10 label {
  display: block;
  font: 13px Arial, Helvetica, sans-serif;
  margin-bottom: 15px;
}

#form-style-10 input[type="text"],
#form-style-10 input[type="date"],
#form-style-10 input[type="datetime"],
#form-style-10 input[type="email"],
#form-style-10 input[type="number"],
#form-style-10 input[type="search"],
#form-style-10 input[type="time"],
#form-style-10 input[type="url"],
#form-style-10 input[type="password"],
#form-style-10 textarea,
#form-style-10 select {
  padding-top: 10px;
  overflow: none;
  margin-bottom: 10px;
  display: block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  height: 40%;
  padding: 8px;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  font-size: 15px;
}

input,
textarea {
  border: 1px inset;
  border-color: rgba(0, 0, 0, 0.2);
}

#form-style-10 #section {
  font: normal 23px "Bitter", serif;
  padding-left: 20px;
}

#form-style-10 #section p {
  width: 100%;
  height: 20%;
  font-weight: bold;
  color: black;
  margin-top: 18px;
  margin-bottom: 20px;
}

#form-style-10 input[type="button"] {
  margin-right: 15px;
  float: right;
  padding: 8px 8px 8px 8px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  color: #4d4d4d;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
  font: normal 30px "Bitter", serif;
  -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
  -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
  box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
  border: 1px solid #257c9e;
  font-size: 15px;
  border: none;
  background: #fff;
}

#form-style-10 #submit {
  float: right;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 18%;
  height: 30%;
  overflow: hidden;
  background: #0080ff;
  padding: 8px 20px 8px 20px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
  font: normal 30px "Bitter", serif;
  border: 1px solid #0080ff;
  font-size: 15px;
}

#form-style-10 #submit:hover {
  background: darkblue;
  -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}

#form-style-10 .privacy-policy {
  float: right;
  width: 250px;
  font: 12px Arial, Helvetica, sans-serif;
  color: #4d4d4d;
  margin-top: 10px;
  text-align: right;
}
#textarea {
  display: block;
  overflow: none;
  height: 100%;
  width: 100%;
}

#close-icon {
  display: inline;
  text-align: right;
  float: right;
  margin: 0 20px 10px 0px;
  position: unset;
}

#close-icon,
#submit,
#cancle:hover {
  cursor: pointer;
}

span {
  color: rgb(253, 38, 38);
  font-weight: 400;
}

label {
  position: relative;
  top: 20px;
  left: 13px;
  background-color: white;
  display: inline;
  width: 35px;
  text-align: center;
  color: #888;
}

.errorBorder {
  border-color: red;
}
</style>
