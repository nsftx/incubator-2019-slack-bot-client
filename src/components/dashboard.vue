<template>
    <div id="Dashboard">

     <div id="nav-bar">
       <navigation />
    </div>
<v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <div id="usersdata" v-on="on">
              <i id="ikona" class="material-icons">arrow_drop_down</i>
              <button id="slika">
                <img id="pic" class="img-circle" width="80" height="70" />
              </button>
              <div id="credentials">
                <h3 id="ime"></h3>
                <br />
                <p id="email"></p>
              </div>
            </div>
          </template>
          <ul id="settings">
            <li class="listaopcijauser" v-for="(item, index) in items" :key="index" @click="showDropdown(index)">
              <p id="opcijauser">  {{ item.title }} </p>            </li>
          </ul>
        </v-menu>
    <div id="dashboard">
        <div id="table">
          <router-view></router-view>
        </div>
    </div>

    </div>
</template>

<script>
import {User_Email} from "../constants/index.js";
import {Current_User_Role, THEME_ID, THEME} from "../constants/index.js";
import {ACCESS_TOKEN} from "../constants/index.js";
import navigation from "./navigation.vue"
import axios from "axios";
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
} 
export default {
  name: 'Dashboard',
  components: {
    navigation,
  },
  data () {
    return {
       items: [
        { title: "Profile" },
        { title: "Settings" },
        { title: "Terms and Conditions" },
        { title: "Log Out" }
      ]
      //
    }
  },
  mounted: function() {
    axios.get('http://localhost:8080/user/me', {
  headers:headers
}).then((response) => {
  console.log(response);
  document.getElementById("email").innerHTML=response.data.email;
localStorage.setItem(User_Email,response.data.email);
 document.getElementById("ime").innerHTML=response.data.name;
 document.getElementById("pic").src=response.data.imageUrl;
 localStorage.setItem(Current_User_Role, response.data.role);
 localStorage.setItem(THEME,response.data.userSettings.theme);

      })
      .catch((err) => {
        console.log(err);
      });
if(localStorage.getItem(THEME)=="light"){
document.getElementById("header").style.backgroundColor="white";
document.getElementById("lista").style.backgroundColor="white";
}else if(localStorage.getItem(THEME)=="dark") {
document.getElementById("header").style.backgroundColor="black";
document.getElementById("lista").style.backgroundColor="black";
}
    //onload funkcija
    //this.create();
  },
  methods:{
    showDropdown(index) {
        if(index==0){
          this.$router.push("/profile");
        }
        else if(index==1){
        this.$router.push("/settings");
        }
        else if(index==2){
this.$router.push("/terms");
        }
        else if(index==3){
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(Current_User_Role);
          alert("You're safely logged out!");
          this.$router.push("/login");
        }
    }
  },
  }
</script>

<style scoped>

*{
  box-sizing: border-box;
  margin: 0px;
}

html, body{
  height: 100%;
  background-color: #F1F1F1;
}

#app {font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#nav-bar{
  height: 100%;
  width: 6%;
  float: left;
}

#dashboard{
  width: 94%;
  height: 100%;
  float: left;
}

#table{
  height: 90vh;
}

#footer{
  background-color: white;
  z-index: 2;
  border-top: 2px solid grey;
  bottom: 0px;
}
</style>