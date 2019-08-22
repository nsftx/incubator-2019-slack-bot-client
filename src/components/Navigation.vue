<template>
  <div class="tab">
    <div id="logo" class="tablinks"></div>

    <router-link to="/dashboard/messages" class="router-link">
      <button class="active">
        <v-icon color="white" style="margin-bottom: 10px">local_post_office</v-icon>
        <br />Messages
      </button>
    </router-link>

    <router-link to="/dashboard/schedules" class="router-link">
      <button>
        <v-icon color="white" style="margin-bottom: 10px">assignment_turned_in</v-icon>
        <br />Schedules
      </button>
    </router-link>

    <router-link to="/dashboard/triggers" class="router-link">
      <button>
        <v-icon color="white" style="margin-bottom: 10px">assistant</v-icon>
        <br />Triggers
      </button>
    </router-link>

    <router-link to="/dashboard/poll" class="router-link">
      <button>
        <v-icon color="white" size="32" style="margin-bottom: 10px">poll</v-icon>
        <br />Poll
      </button>
    </router-link>

    <router-link to="/dashboard/activity" class="router-link">
      <button>
        <v-icon color="white" size="32" style="margin-bottom: 10px">track_changes</v-icon>
        <br />Activity log
      </button>
    </router-link>

    <router-link to="/dashboard/user" class="router-link">
      <button id="user">
        <v-icon color="white" size="32" style="margin-bottom: 10px">person</v-icon>
        <br />User
      </button>
    </router-link>
  </div>
</template>

<script>
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
import {
  SAVE,
  USER_NAME,
  USER_PIC,
  CURRENT_USER_ROLE
} from "../constants/index.js";
import axios from "axios";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
export default {
  name: "navigation",
  mounted: function() {
    axios
      .get(API_BASE_URL + "/user/me", {
        headers: headers
      })
      .then(response => {
        console.log(response);

        localStorage.setItem(USER_EMAIL, response.data.email);
        localStorage.setItem(USER_NAME, response.data.name);
        localStorage.setItem(USER_PIC, response.data.imageUrl);
        localStorage.setItem(CURRENT_USER_ROLE, response.data.role);
        localStorage.setItem(THEME, response.data.userSettings.theme);
        localStorage.setItem(
          USER_LANGUAGE,
          response.data.userSettings.language
        );
      })
      .catch(err => {
        console.log(err);
      });
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
          localStorage.setItem(THEMEPARAGRAPH, response.data.selectColor);
          localStorage.setItem(LANGUAGEPARAGRAPH, response.data.selectLanguage);
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
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    if (localStorage.getItem(CURRENT_USER_ROLE) != "ADMIN") {
      //document.getElementById("user").style.display = "none";
    }
    if (localStorage.getItem(USER_LANGUAGE) != "en") {
      document.getElementsByTagName("span")[0].innerHTML = "Poruke";
      document.getElementsByTagName("span")[1].innerHTML = "Podsjetnici";
      document.getElementsByTagName("span")[2].innerHTML = "Okidaci";
      document.getElementsByTagName("span")[3].innerHTML = "Korisnici";
    }
  },
  methods: {
    Translate() {
      if (localStorage.getItem(USER_LANGUAGE) != "en") {
        document.getElementsByTagName("span")[0].innerHTML = "Poruke";
        document.getElementsByTagName("span")[1].innerHTML = "Podsjetnici";
        document.getElementsByTagName("span")[2].innerHTML = "Okidaci";
        document.getElementsByTagName("span")[3].innerHTML = "Korisnici";
      }
    }
  }
};
</script>

<style>
#logo {
  margin-top: 10px;
  height: 50px;
  background-image: url("../assets/logo.png");
  background-position: center;
  margin-bottom: 10px;
}

.tab {
  text-align: center;
  float: left;
  background-color: #006bf5;
  width: 100%;
  height: 100vh;
  padding: 5px 0px;
}

.tab button {
  display: block;
  color: #fff;
  width: 100%;
  border: none;
  outline: none;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;
  height: 80px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: rgb(45, 146, 247);
}

/* Create an active/current "tab button" class */
a.router-link.router-link-exact-active.router-link-active button {
  background-color: rgb(45, 146, 247);
}

.router-link.router-link-active button {
  background-color: rgb(45, 146, 247);
}

/* Style the tab content */
.tabcontent {
  float: left;
  width: 94%;
  border-left: none;
  height: 100%;
  padding: 13px;
}

li i {
  margin-left: 25px;
}

li .material-icons {
  font-size: 18px;
  color: gray;
  display: none;
}

li:hover .material-icons {
  display: inline;
  display: block;
}

.material-icons:hover {
  color: black;
  cursor: pointer;
}

.router-link {
  text-decoration: none;
}
</style>
