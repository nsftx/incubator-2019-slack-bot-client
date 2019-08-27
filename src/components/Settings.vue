<template>
  <div id="settings2">
    <router-view></router-view>
    <div id="header">
      <h1 id="title">Settings</h1>
    </div>
    <div class="data" id="profile">
      <br />
      <br />
      <div id="select1">
            <button
              id="color"
            >Select Theme</button>
            <br />
            <br />
         <input type="radio" id="one" value="Dark" v-model="picked1" @click="showThemeSettings('Dark')">
<label id="dark" for="one">Dark</label>
<br>
<br>
<input type="radio" id="two" value="Light" v-model="picked1" @click="showThemeSettings('Light')">
<label id="light" for="two">Light</label>
<br>
<br>
<br>
<span> <span id="picked1">Picked:  </span> {{ picked1 }}</span>
      </div>
      <br />
      <div id="select2">
            <button
              id="language" 
            >Select Language</button>
            <br />
            <br />
         <input type="radio" id="one1" value="English" v-model="picked2" >
<label id="english" for="one">English</label>
<br>
<br>
<input type="radio" id="two1" value="Bosnian" v-model="picked2" >
<label id="bosnian" for="two">Bosnian</label>
<br>
<br>
<br>
<span> <span id="picked2">Picked: </span> {{ picked2}}</span>
</div>
      <input type="button" value="Save" @click="Save()" id="submit" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {
  API_BASE_URL,
  MESSAGES,
  SCHEDULES,
  USERS,
  TITLE,
  TEXT,
  MESSAGE,
  NEXTRUN,
  REPEAT,
  CHANNEL,
  TRIGGER,
  ACTIVE,
  NAME,
  ROLE,
  CREATEDAT,
  LANGUAGEFR,
  LANGUAGEEN,
  DARK,
  LIGHT
} from "../constants/index.js";
import {
  USER_EMAIL,
  USER_THEME,
  SETTINGS,
  THEME,
  LANGUAGE,
  SELECTCOLOR,
  SELECTLANGUAGE,
  USER_LANGUAGE,
  PICKED
} from "../constants/index.js";
import { ACCESS_TOKEN, TRIGGERS, ACTIVEAT } from "../constants/index.js";
import { SAVE } from "../constants/index.js";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

export default {
  name: "settings2",
  data() {
    return {
      picked1:" ",
      picked2:" ",
    };
  },
  mounted: function() {
    if (localStorage.getItem(USER_THEME) == "light") {
      this.$emit("change-light");
      document.getElementById("settings2").style.backgroundColor = "white";
      document.getElementById("settings2").style.color = "black";
      document.getElementById("header").style.backgroundColor = "white";
    } else if (localStorage.getItem(USER_THEME) == "dark") {
      this.$emit("change-dark");
      document.getElementById("settings2").style.backgroundColor = "black";
      document.getElementById("header").style.backgroundColor = "black";
      document.getElementById("profile").style.backgroundColor = "#2c3e50";
       document.getElementById("profile").style.color= "black";
    }

    if(localStorage.getItem(USER_LANGUAGE)!="en"){
          document.getElementById("picked1").innerHTML=localStorage.getItem(PICKED);
          document.getElementById("picked2").innerHTML=localStorage.getItem(PICKED);
          document.getElementById("color").innerHTML = localStorage.getItem(
           SELECTCOLOR
          );
          document.getElementById("language").innerHTML = localStorage.getItem(
            SELECTLANGUAGE
          );
          document.getElementById("title").innerHTML = localStorage.getItem(
            SETTINGS
          );
          document.getElementById("submit").value = localStorage.getItem(SAVE);
          document.getElementById("english").innerHTML= localStorage.getItem(LANGUAGEEN);
          document.getElementById("bosnian").innerHTML= localStorage.getItem(LANGUAGEFR);
          document.getElementById("dark").innerHTML=localStorage.getItem(DARK);
          document.getElementById("light").innerHTML=localStorage.getItem(LIGHT);
  }
        },
  methods: {
    showThemeSettings(value) {
      if (value=="Dark") {
        this.$emit("change-dark");
      document.getElementById("settings2").style.backgroundColor = "black";
      document.getElementById("header").style.backgroundColor = "black";
      document.getElementById("profile").style.backgroundColor = "#2c3e50";
      document.getElementById("select1").style.color= "black";
       document.getElementById("select2").style.color= "black";
       //document.getElementById("profile").style.color="white";
      } else if (value=="Light") {
        this.$emit("change-light");
        document.getElementById("header").style.backgroundColor = "white";
        document.getElementById("settings2").style.backgroundColor = "white";
        document.getElementById("settings2").style.color = "black";
        document.getElementById("profile").style.backgroundColor = "#f1f1f1";
      }

    },
    Save() {
      console.log(this.picked1,this.picked2);
      let lang;
      if(this.picked2=="English")
      lang="en";
      else
      lang="fr";
      console.log(this.picked2);
      axios
        .post(
          API_BASE_URL + "/user/userSettings",
          { theme: this.picked1, language: lang },
          {
            headers: headers
          }
        )
        .then(
          response => {
            localStorage.setItem(USER_THEME, response.data.theme);
            localStorage.setItem(USER_LANGUAGE, response.data.language);
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
        this.picked1="";
        this.picked2="";
      this.$emit("change-language");
    }
  }
};
</script>
<style scoped>
#settings2 {
  padding: 20px;
  padding-bottom: 0px;
  height: 100vh;
}
#header[data-v-47aa12d3] {
  display: block;
  width: 99%;
  float: right;
  background-color: white;
}
h1[data-v-47aa12d3] {
  margin-left: 0px;
  color: #2c3e50;
  margin-top: 0px;
  width: 200px;
  float: left;
}
#header {
  display: block;
  width: 99%;
  float: right;
  background-color: white;
}
.data p[data-v-47aa12d3] {
  margin-left: 20px;
  text-align: left;
  display: inline;
}
button[data-v-47aa12d3] {
  float: left;
  text-align: center;
}
#option {
  width: 100%;
  text-align: center;
  padding-top: 5px;
}
#settings2 input[type="button"] {
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
  margin-top: 30px;
  margin-left: 20px;
}

#settings2 #submit {
  position: absolute;
  bottom: 420px;
  right: 90px;
  float: right;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 18%;
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

#settings2 #submit:hover {
  background: darkblue;
  -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}
#usersdata {
  float: right;
  height: 72px;
  margin-top: 0px;
}
#usersdata:hover {
  background-color: #f1f1f1;
}
h1 {
  float: left;
}
#settings2 {
  width: 100%;
  height: 100%;
  background-color: white;
}
.data p {
  margin-left: 20px;
  float: left;
  text-align: left;
  display: inline;
}
.data {
  background-color: #f1f1f1;
  margin-top: 20px;
  width: 100%;
  margin-right: 20px;
}
#email {
  float: left;
  width: 30%;
}
#ime {
  float: left;
  width: 30%;
}
#profile {
  display: flex;
  flex-direction: column;
  height: 60%;

  text-align: left;
}
#pic {
  margin-top: 10px;
  margin-left: 10px;
  float: left;
}
button {
  float: left;
}
#select1,#select2 {
  display: inline;
  margin-left: 20px;
  color:#2c3e50;
  font-size:120%;
}
input{
  font-size:30%;
}
label{
  text-align:center;
  font-weight:300;

}
span{
  font-weight:100;
}

</style>