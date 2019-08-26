<template>
  <div class="tab">
    <div id="logo" class="tablinks"></div>

  
    <router-link to="/dashboard/messages" class="router-link">
      <button class="active">
        <v-icon color="white" style="margin-bottom: 10px">local_post_office</v-icon>
        <br /> <span> Messages </span>

      </button>
    </router-link>

    <router-link to="/dashboard/schedules" class="router-link">
      <button>
        <v-icon color="white" style="margin-bottom: 10px">assignment_turned_in</v-icon>

        <br /> <span> Schedules </span>

      </button>
    </router-link>

    <router-link to="/dashboard/triggers" class="router-link">
      <button>
        <v-icon color="white" style="margin-bottom: 10px">assistant</v-icon>
        <br /> <span>Triggers </span>

      </button>
    </router-link>

    <router-link to="/dashboard/poll" class="router-link">
      <button>
        <v-icon color="white" size="32" style="margin-bottom: 10px">poll</v-icon>

        <br /> <span> Poll </span>
      </button>
    </router-link>

    <router-link to="/dashboard/audit" class="router-link">
      <button>
        <v-icon color="white" size="32" style="margin-bottom: 10px">track_changes</v-icon>
        <br /> <span> Activity log </span>

      </button>
    </router-link>

    <router-link to="/dashboard/user" class="router-link">

      <button id="usertab">
        <v-icon color="white" size="32" style="margin-bottom: 10px">person</v-icon>
        <br /> <span>Users </span>

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
  ACTIVITY_LOG,NEWMESSAGE

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
  LOGOUT,CANCEL,
  CAUSE,CONSEQUENCE, PROFILE,NEWUSEREMAIL,CREATEMESSAGE,CREATESCHEDULE,CREATEUSER,RUNAT,SOMECHANNELNAME,SELECTDATE,NEWUSERROLE,TYPEYOURMESSAGE,SOMEMESSAGETITLE
} from "../constants/index.js";
import axios from "axios";
import { async } from 'q';
/*const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};*/
export default {
  name: "navigation",
  mounted: async function() {
   
  
     
    if (localStorage.getItem(CURRENT_USER_ROLE) != "ADMIN") {
      document.getElementById("usertab").style.display = "none";
    }
    if (localStorage.getItem(USER_LANGUAGE) != "en") {
      document.getElementsByTagName("span")[0].innerHTML =localStorage.getItem(MESSAGES);
      document.getElementsByTagName("span")[1].innerHTML = localStorage.getItem(SCHEDULES);
      document.getElementsByTagName("span")[2].innerHTML =localStorage.getItem(TRIGGERS);
        document.getElementsByTagName("span")[3].innerHTML = localStorage.getItem(POLL);
      document.getElementsByTagName("span")[4].innerHTML = localStorage.getItem(ACTIVITY_LOG);
      document.getElementsByTagName("span")[5].innerHTML = localStorage.getItem(USERS);
    }
  },
  methods: {
    Translate() {
      if (localStorage.getItem(USER_LANGUAGE) != "en") {
        document.getElementsByTagName("span")[0].innerHTML =localStorage.getItem(MESSAGES);
      document.getElementsByTagName("span")[1].innerHTML = localStorage.getItem(SCHEDULES);
      document.getElementsByTagName("span")[2].innerHTML =localStorage.getItem(TRIGGERS);
      document.getElementsByTagName("span")[3].innerHTML = localStorage.getItem(POLL);
      document.getElementsByTagName("span")[4].innerHTML = localStorage.getItem(ACTIVITY_LOG);
      document.getElementsByTagName("span")[5].innerHTML = localStorage.getItem(USERS);
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
