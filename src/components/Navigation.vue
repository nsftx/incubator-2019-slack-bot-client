<template>
    <div class="tab">

      <div id="logo" class="tablinks"></div>

      <router-link to="/dashboard/messages" class="router-link">
        <button class="active">
          <v-icon color="white" style="margin-bottom: 10px">local_post_office</v-icon> <br> Messages
        </button>
      </router-link>

      <router-link to="/dashboard/schedules" class="router-link">
        <button>
          <v-icon color="white" style="margin-bottom: 10px">assignment_turned_in</v-icon> <br> Schedules
        </button>
      </router-link>

      <router-link to="/dashboard/triggers" class="router-link">
        <button>
          <v-icon color="white" style="margin-bottom: 10px">assistant</v-icon> <br> Triggers
        </button>
      </router-link>

      <router-link to="/dashboard/user" class="router-link">
        <button id="user">
          <v-icon  color="white" size="32" style="margin-bottom: 10px">person</v-icon> <br> User
        </button>
      </router-link>

    </div>
</template>

<script>
import {CURRENT_USER_ROLE, LANGUAGE} from "../constants/index.js";
export default {
    name: "navigation",
     mounted: function() {
       axios.get(API_BASE_URL + "/user/me", {
  headers:headers
}).then((response) => {
  console.log(response);
  
localStorage.setItem(USER_EMAIL,response.data.email);
localStorage.setItem(USER_NAME,response.data.name);
localStorage.setItem(USER_PIC,response.data.imageUrl);
 localStorage.setItem(CURRENT_USER_ROLE, response.data.role);
 localStorage.setItem(THEME,response.data.userSettings.theme);
 localStorage.setItem(LANGUAGE,response.data.userSettings.language);

      })
      .catch((err) => {
        console.log(err);
      });
     if(localStorage.getItem(CURRENT_USER_ROLE)!="ADMIN"){
       document.getElementById("user").style.display="none";
     }
     if(localStorage.getItem(LANGUAGE)!="en"){
       document.getElementsByTagName("button")[0].innerHTML="Poruke";
       document.getElementsByTagName("button")[1].innerHTML="Podsjetnici";
       document.getElementsByTagName("button")[2].innerHTML="Okidaci";
       document.getElementsByTagName("button")[3].innerHTML="Korisnici";
     }
     },
}
</script>

<style>
#logo{
  margin-top: 10px;
  height: 50px;
  background-image: url("../assets/logo.png");
  background-position: center;
  margin-bottom: 10px;
}

.tab {
  text-align:center;
  float: left;
  background-color: #006BF5;
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
.tab button:hover{
  background-color: rgb(45, 146, 247);
}

/* Create an active/current "tab button" class */
a.router-link.router-link-exact-active.router-link-active button{
  background-color: rgb(45, 146, 247);
}

.router-link.router-link-active button{
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

li i{
  margin-left: 25px;
}

li .material-icons{
  font-size: 18px;
  color: gray;
  display: none;
}

li:hover .material-icons{
  display: inline;
  display: block;
}

.material-icons:hover{
  color: black;
  cursor: pointer;
}

.router-link{
  text-decoration: none;
}

</style>
