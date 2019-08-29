<template>
  <div class="tab">
    <div id="logo" class="tablinks"></div>

    <router-link to="/dashboard/messages" class="router-link">
      <button class="active">
        <v-icon color="white" style="margin-bottom: 10px">local_post_office</v-icon>
        <br />
        <span>Messages</span>
      </button>
    </router-link>

    <router-link to="/dashboard/schedules" class="router-link">
      <button>
        <v-icon color="white" style="margin-bottom: 10px">assignment_turned_in</v-icon>

        <br />
        <span>Schedules</span>
      </button>
    </router-link>

    <router-link to="/dashboard/triggers" class="router-link">
      <button>
        <v-icon color="white" style="margin-bottom: 10px">assistant</v-icon>
        <br />
        <span>Triggers</span>
      </button>
    </router-link>

    <router-link to="/dashboard/poll" class="router-link">
      <button>
        <v-icon color="white" size="32" style="margin-bottom: 10px">poll</v-icon>

        <br />
        <span>Poll</span>
      </button>
    </router-link>

    <div class="notification">
      <span id="notificationNumber">{{notificationNumber}}</span>
    </div>

    <router-link to="/dashboard/activity" class="router-link">
      <button>
        <v-icon color="white" size="32" style="margin-bottom: 10px">track_changes</v-icon>
        <br />
        <span>Activity log</span>
      </button>
    </router-link>

    <router-link to="/dashboard/user" class="router-link">
      <button id="usertab">
        <v-icon color="white" size="32" style="margin-bottom: 10px">person</v-icon>
        <br />
        <span>Users</span>
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
  CREATEDAT,
  ERROR,
  ACTIVITY_LOG,
  NEWMESSAGE
} from "../constants/index.js";
import {
  USER_EMAIL,
  THEME,
  USER_THEME,
  SETTINGS,
  COLOR,
  LANGUAGE,
  THEMEPARAGRAPH,
  LANGUAGEPARAGRAPH,
  USER_LANGUAGE,
  POLL
} from "../constants/index.js";
import { ACCESS_TOKEN, TRIGGERS, ACTIVEAT } from "../constants/index.js";
import {
  SAVE,
  USER_NAME,
  USER_PIC,
  CURRENT_USER_ROLE,
  LOGOUT,
  CANCEL,
  CAUSE,
  CONSEQUENCE,
  PROFILE,
  NEWUSEREMAIL,
  CREATEMESSAGE,
  CREATESCHEDULE,
  CREATEUSER,
  RUNAT,
  SOMECHANNELNAME,
  SELECTDATE,
  NEWUSERROLE,
  TYPEYOURMESSAGE,
  SOMEMESSAGETITLE
} from "../constants/index.js";
import axios from "axios";
import { async } from "q";

export default {
  name: "navigation",
  data() {
    return {
      notificationNumber: 0,
      userId: 0
    };
  },
  mounted: async function() {
     let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    };
    await axios
      .get(API_BASE_URL + "/user/me", {
        headers: headers
      })
      .then(response => {
        localStorage.setItem(USER_EMAIL, response.data.email);
        localStorage.setItem(USER_NAME, response.data.name);
        localStorage.setItem(USER_PIC, response.data.imageUrl);
        localStorage.setItem(CURRENT_USER_ROLE, response.data.role);
        localStorage.setItem(USER_THEME, response.data.userSettings.theme);
        localStorage.setItem(
          USER_LANGUAGE,
          response.data.userSettings.language
        );
        return axios
          .get(API_BASE_URL + "/user/translation", {
            params: {
              language: localStorage.getItem(USER_LANGUAGE)
            },
            headers: headers
          })
          .then(
            response => {
              for (var key in response.data) {
                if (response.data.hasOwnProperty(key)) {
                  localStorage.setItem(key, response.data[key]);
                }
              }
            },
            error => {
              console.log(error);
            }
          );
      })
      .catch(err => {
        console.log(err);
      });

    if (localStorage.getItem(CURRENT_USER_ROLE) != "ADMIN") {
      document.getElementById("usertab").style.display = "none";
    }
    if (localStorage.getItem(USER_LANGUAGE) == "fr") {
      document.getElementsByTagName("span")[0].innerHTML = localStorage.getItem(
        MESSAGES
      );
      document.getElementsByTagName("span")[1].innerHTML = localStorage.getItem(
        SCHEDULES
      );
      document.getElementsByTagName("span")[2].innerHTML = localStorage.getItem(
        TRIGGERS
      );
      document.getElementsByTagName("span")[3].innerHTML = localStorage.getItem(
        POLL
      );
      document.getElementsByTagName("span")[5].innerHTML = localStorage.getItem(
        ACTIVITY_LOG
      );
      document.getElementsByTagName("span")[6].innerHTML = localStorage.getItem(
        USERS
      );
    }
    this.subscribeToNotification();
  },
  methods: {
    Translate() {
      if (localStorage.getItem(USER_LANGUAGE) == "fr") {
        document.getElementsByTagName(
          "span"
        )[0].innerHTML = localStorage.getItem(MESSAGES);
        document.getElementsByTagName(
          "span"
        )[1].innerHTML = localStorage.getItem(SCHEDULES);
        document.getElementsByTagName(
          "span"
        )[2].innerHTML = localStorage.getItem(TRIGGERS);
        document.getElementsByTagName(
          "span"
        )[3].innerHTML = localStorage.getItem(POLL);
        document.getElementsByTagName(
          "span"
        )[4].innerHTML = localStorage.getItem(ACTIVITY_LOG);
        document.getElementsByTagName(
          "span"
        )[5].innerHTML = localStorage.getItem(USERS);
      }
    },

    async subscribeToNotification() {
      let self = this;
      this.source = null;

      await axios
        .get(API_BASE_URL + "/user/me", {
          headers: headers
        })
        .then(response => {
          this.userId = response.data.id;
        })
        .catch(err => {
          console.log(err);
        });

      this.source = new EventSource(
        API_BASE_URL + "/api/logs/new-logs-stream/" + this.userId
      );

      this.source.addEventListener("new-log-event", function(event) {
        var comment = JSON.parse(event.data);
        self.notificationNumber = event.data;
      });

      this.source.onerror = function() {
        console.log("TESTERRR");
        this.close();
      };
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

.notification {
  position: relative;
  height: 0px;
}

.notification::before,
.notification::after {
  position: absolute;
  left: 20%;
  opacity: 1;
  transition: all ease 0.3s;
}

.notification::after {
  content: attr(notificationNumber);
  top: 25px;
  width: 20px;
  font-size: 16px;
  margin-left: 34px;
  padding: 11px;
  border-radius: 10px;
  color: #eee;
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%);
  color: white;
  text-align: center;
}

#notificationNumber {
  color: white;
  position: relative;
  left: 24px;
  font-size: 15px;
}

</style>
