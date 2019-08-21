<template>
  <div id="settings2">
    <router-view></router-view>
    <div id="header">
      <h1 id="title">Settings</h1>
    </div>
    <div class="data" id="profile">
      <br />
      <br />
      <p id="theme">
        <strong>Theme:</strong>
      </p>
      <div id="select">
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <button
              id="color"
              v-on="on"
              v-on:input="bgc.backgroundColor = $event.target.value"
            >Select color</button>
            <br />
            <br />
          </template>
          <ul id="settings">
            <li
              class="options"
              v-for="(item, index) in items2"
              :key="index"
              @click="showThemeSettings(index)"
            >
              <p class="option">{{ item.title }}</p>
            </li>
          </ul>
        </v-menu>
      </div>
      <br />
      <p id="languageparagraph">
        <strong>Language:</strong>
      </p>
      <div id="select">
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <button
              id="language"
              v-on="on"
              v-on:input="bgc.backgroundColor = $event.target.value"
            >Select Language</button>
            <br />
            <br />
          </template>
          <ul id="settings">
            <li
              class="options"
              v-for="(item, index) in items3"
              :key="index"
              @click="showLanguageSettings(index)"
            >
              <p class="option">{{ item.title }}</p>
            </li>
          </ul>
        </v-menu>
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
  CREATEDAT
} from "../constants/index.js";
import {
  USER_EMAIL,
  THEME,
  SETTINGS,
  COLOR,
  LANGUAGE,
  THEMEPARAGRAPH,
  LANGUAGEPARAGRAPH,
  USER_LANGUAGE
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
      items3Value: "",
      items2Value: "",
      items2: [{ title: "dark" }, { title: "light" }],
      items3: [
        { title: "English", value: "en" },
        { title: "Bosnian", value: "fr" }
      ]
    };
  },
  mounted: function() {
    if (localStorage.getItem(THEME) == "light") {
      this.$emit("change-light");
      document.getElementById("settings2").style.backgroundColor = "white";
      document.getElementById("settings2").style.color = "black";
      document.getElementById("header").style.backgroundColor = "white";
    } else if (localStorage.getItem(THEME) == "dark") {
      this.$emit("change-dark");
      document.getElementById("settings2").style.backgroundColor = "black";
      document.getElementById("header").style.backgroundColor = "black";
      document.getElementById("color").style.backgroundColor = "black";
      document.getElementById("color").style.color = "white";
      document.getElementById("language").style.backgroundColor = "black";
      document.getElementById("language").style.color = "white";
      document.getElementById("languageparagraph").style.color = "black";
      document.getElementById("theme").style.color = "black";
      document.getElementById("profile").style.backgroundColor = "#2c3e50";
    }

    axios
      .get(API_BASE_URL + "/user/translation", {
        params: {
          language: localStorage.getItem(USER_LANGUAGE)
        },
        headers: headers
      })
      .then(
        response => {
          localStorage.setItem(SETTINGS, response.data.settings);
          localStorage.setItem(COLOR, response.data.theme);
          localStorage.setItem(LANGUAGE, response.data.language);
          localStorage.setItem(THEMEPARAGRAPH, response.data.select.color);
          localStorage.setItem(LANGUAGEPARAGRAPH, response.data.select.language);
          localStorage.setItem(MESSAGES, response.data.messages);
          localStorage.setItem(SCHEDULES, response.data.schedules);
          localStorage.setItem(USERS, response.data.users);
          localStorage.setItem(TRIGGERS, response.data.triggers);
          localStorage.setItem(TITLE, response.data.title);
          localStorage.setItem(TEXT, response.data.text);
          localStorage.setItem(MESSAGE, response.data.message);
          localStorage.setItem(NEXTRUN, response.data.nextRun);
          localStorage.setItem(ACTIVEAT, response.data.activeAt);
          localStorage.setItem(REPEAT, response.data.repeat);
          localStorage.setItem(CHANNEL, response.data.channel);
          localStorage.setItem(TRIGGER, response.data.trigger);
          localStorage.setItem(ACTIVE, response.data.active);
          localStorage.setItem(NAME, response.data.name);
          localStorage.setItem(ROLE, response.data.role);
          localStorage.setItem(CREATEDAT, response.data.createdAt);
          localStorage.setItem(SAVE, response.data.save);
          localStorage.setItem(ERROR, response.data.error);
          document.getElementById("color").innerHTML = localStorage.getItem(
            COLOR
          );
          document.getElementById("language").innerHTML = localStorage.getItem(
            LANGUAGE
          );
          document.getElementById("theme").innerHTML = localStorage.getItem(
            THEMEPARAGRAPH
          );
          document.getElementById(
            "languageparagraph"
          ).innerHTML = localStorage.getItem(LANGUAGEPARAGRAPH);
          document.getElementById("title").innerHTML = localStorage.getItem(
            SETTINGS
          );
          document.getElementById("submit").value = localStorage.getItem(SAVE);
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  },
  methods: {
    showThemeSettings(index) {
      this.items2Value = this.items2[index].title;
      if (index == 0) {
        this.$emit("change-dark");
        document.getElementById("header").style.backgroundColor = "black";
        document.getElementById("settings2").style.backgroundColor = "black";
        document.getElementById("color").style.backgroundColor = "black";
        document.getElementById("language").style.backgroundColor = "black";
      } else if (index == 1) {
        this.$emit("change-light");
        document.getElementById("header").style.backgroundColor = "white";
        document.getElementById("settings2").style.backgroundColor = "white";
        document.getElementById("settings2").style.color = "black";
        document.getElementById("color").style.backgroundColor = "white";
        document.getElementById("language").style.backgroundColor = "white";
      }
    },
    showLanguageSettings(index) {
      this.items3Value = this.items3[index].value;
    },
    Save() {
      axios
        .post(
          API_BASE_URL + "/user/userSettings",
          { theme: this.items2Value, language: this.items3Value },
          {
            headers: headers
          }
        )
        .then(
          response => {
            localStorage.setItem(THEME, response.data.theme);
            localStorage.setItem(USER_LANGUAGE, response.data.language);
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
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
  margin-right: 10px;
  display: block;
  width: 99%;
  float: right;
  background-color: white;
  height: 72px;
}
h1[data-v-47aa12d3] {
  margin-left: 0px;
  color: #2c3e50;
  margin-top: 0px;
  width: 200px;
  float: left;
}
#header {
  padding-left: 20px;
  margin-left: 15px;
  margin-right: 10px;
  display: block;
  width: 99%;
  float: right;
  background-color: white;
  height: 72px;
}
.data p[data-v-47aa12d3] {
  margin-left: 20px;
  text-align: left;
  display: inline;
}
button[data-v-47aa12d3] {
  height: 100%;
  width: 100%;
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
  bottom: 450px;
  right: 100px;
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
  margin-bottom: 15px;
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
  margin-left: 20px;
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
  height: 500px;
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
#select {
  display: inline;
  width: 100px;
  background-color: white;
  margin-top: 0px;
  margin-left: 30px;
  float: left;
}
</style>