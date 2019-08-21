<template>
  <div id="FormPoll">
    <div id="form-style-10">
      <form id="forma">
        <div id="section">
          <p>
            Create Poll
            <label id="close-icon" @click="exit" style="font-size: 20px">X</label>
          </p>
        </div>
          <label class="la">Title</label>
          <div id="inner-wrap">
          <input
            autocomplete="off"
            type="text"
            name="field1"
            placeholder="New poll title"
            v-model="title"
            id="field1"
            :class="{errorBorder: showTitleError, noErrorBorder: !showTitleError}"
          />
          <span v-show="showTitleError">Title size is minimum 3 characters</span>
          <br> <br>

          <label>Choices:</label>
          <input type="text" v-for="(choice, index) in choices" :key="index" v-model="choice.choiceValue" :class="{noErrorBorder: true}" :placeholder="index+1 + '.'"/>

		  <input type="button" value="+" @click="addNewChoice" :disabled="choices.length == 5" id="choiceButton" :class="{disabledButton: (choices.length == 5)}">


      <span v-show="showChoiceError">Choice can not be empty</span> <br>
		  <span v-show="choices.length==5" style="color: #888"> Maximum number of choices has been reached </span>

		<br> <br> <br>

          <input type="button" value="Save" @click="save" id="submit" class="input-options" />
          <input type="button" value="Cancel" @click="exit" id="cancle" class="input-options" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ACCESS_TOKEN } from "../constants/index.js";
import axios from "axios";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

export default {
  name: "FormPoll",
  data() {
    return {
      title: "",
      choices: [],
      liveValidation: false,
      showTitleError: false,
      showChoiceError: false
    };
  },

  mounted: function() 
  {
    this.choices.push({choiceValue: ""});
    this.choices.push({choiceValue: ""});
  },

  watch: {
    choices(value){
      this.choices = value;
      if(this.liveValidation == true) this.check_choices(value);
    },

    title(value) {
      this.title = value;
      if (this.liveValidation == true) this.check_title(value);
    }
  },

  methods: {
    exit() {
      this.$router.go(-1);
    },
    addNewChoice() {
      this.choices.push({choiceValue: ""});
    },

    check_title(value) {
      if (this.title.length<3) {
        this.showTitleError = true;
        return false;
      } else {
        this.showTitleError = false;
        return true;
      }
    },

    check_choices(value)
    {
      for(var i=0; i<this.choices.length; i++)
      {
        if(this.choices[i].choiceValue == "")
        {
          this.showChoiceError = true;
          return false;
        }
      }

      this.showChoiceError = false;
      return true;
    },

    save() {
    this.liveValidation = true;
    if (this.check_title(this.title) == false) this.invalid = true;
    if(this.check_choices(this.choices) == false) this.invalid = true;
    if (this.invalid == true) {
        this.invalid = false;
        return;
    } 

    console.log(this.choices);

		/*
      axios
        .post(
          "http://localhost:8080/user/create",
          { email: this.title, role: this.roleType },
          {
            headers: headers
          }
        )
        .then(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      /*if(this.$route.params.id == null)
			{
				alert("Sacuvaj");
			}
			else
			{
				alert("Update -> " + this.$route.params.id);
			}*/
      this.$router.go(-1);
    }
    /*async create(){
			const res = await axios.get("../../jsonM.txt");
			this.title = res.data.title;
			this.text = res.data.text;
		},
		async destroyed(){
			this.title = "",
			this.text = ""
		}
  },*/
  }
};

</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}

#form-style-10 {
  width: 640px;
  height: auto;
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
  z-index: 120;
  padding-bottom: 50px;
}

#form-style-10 #inner-wrap {
  display: block;
  padding: 20px;
  padding-top: 0px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 15px;
}

#form-style-10 label {
  font: 13px Arial, Helvetica, sans-serif;
  color: #888;
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
  margin-bottom: 20px;
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
}

#close-icon,
#submit,
#cancle:hover {
  cursor: pointer;
}

.la {
  display: inline-block;
  background-color: white;
  position: relative;
  top: 23px;
  left: 30px;
  padding: 0px 7px;
}

.input-options {
  position: relative;
  top: 10px;
}

#form-style-10 #choiceButton{
	float: right;
	height: 30px;
	width: 30px;
	background-color: #0080ff;
	color: white;
	border-radius: 50%;
	font-size: 25px;
	line-height: 10px;
}

.disabledButton{
	display: none;
}

.errorBorder {
    border: 1px inset rgb(253, 38, 38);
}

.noErrorBorder{
    border: 1px inset rgba(0, 0, 0, 0.2);
}

#filed1{
  border: unset;
}

span{
  color: rgb(253, 38, 38);
  font-weight: 400;
}

</style>