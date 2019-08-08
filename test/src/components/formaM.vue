<template>
  <div id="formaM" >
    <div id="form-style-10">
      <form id="forma">
        <div id="section">
          <p>
            {{ formType }} Message
            <label id="close-icon" @click="exit" style="font-size: 20px">X</label>
          </p>
        </div>

        <div id="inner-wrap">
          <label :class="{errorText: showTitleError}">Title</label>
          <input
            type="text"
            name="field1"
            placeholder="New message"
            v-model="title"
            id="field1"
            :class="{errorBorder: showTitleError}"
          />
          <br>
          <span v-show="showTitleError">Title size must be between 5 and 30 characters</span>

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
          <br>
          <span v-show="showMessageError">Text size must be more then 20 characters</span>

          <br>
          <input type="button" value="Save" @click="save" id="submit" />
          <input type="button" value="Cancel" @click="exit" id="cancle" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

/*
window.addEventListener("mouseup", function(event){
	if(event.target != document.getElementById("formaM") && event.target.parentNode != document.getElementById("formaM") && 
	event.target.parentNode !=  document.getElementById("forma") && event.target.parentNode != document.getElementById("inner-wrap")
	&& event.target != document.getElementById("section") && event.target.parentNode != document.getElementById("section"))
	{
		this.exit;
	}
});*/

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
      regexTitle: /^.{5,30}$/,
      regexText: /^.{20,}$/
    };
  },

  mounted: function() {
    if (this.$route.params.id != null) {
      this.create();
      (this.formType = "Update");
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
            await axios.post("http://localhost:8080/api/messages", {
              title: this.title,
              text: this.text
            });
          } catch (err) {
            this.$emit("show-notification", -1);
            this.$router.go(-1);
            return;
          }
        } else {
		  try 
		  {
            await axios.put("http://localhost:8080/api/messages/" + this.$route.params.id, { title: this.title, text: this.text });
		  } 
		  catch (err) 
		  {
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
      try
      {
		    const res = await axios.get("http://localhost:8080/api/messages/" + this.$route.params.id);
      	this.title = res.data.title;
        this.text = res.data.text;
      }
      catch(err)
      {
        this.$emit("show-notification", -1);
      }
    },
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}

#form-style-10 {
  width: 640px;
  height: 480px;
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
  background: #fff;
  border-radius: 6px;
  margin-bottom: 15px;
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
  /*border: 1px inset rgba(0, 0, 0, 0.2);*/
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
  margin-bottom: 5px;
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
