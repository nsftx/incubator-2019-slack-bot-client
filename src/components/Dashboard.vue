<template>
    <div id="Dashboard">
     <div id="nav-bar">
       <navigation />
    </div>
    <div id="dropdown">
<v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <div id="usersdata" v-on="on">
              <i id="icon" class="material-icons">arrow_drop_down</i>
              <button id="picture">
                <img id="pic" class="img-circle" width="80" height="70" />
              </button>
              <div id="credentials">
                <h3 id="name"></h3>
                <br />
                <p id="email"></p>
              </div>
            </div>
          </template>
          <ul id="settings">
            <li class="options" v-for="(item, index) in items" :key="index" @click="showDropdown(index)">
              <p class="option">  {{ item.title }} </p>            </li>
          </ul>
        </v-menu>
        </div>
    <div id="dashboard">
        <div id="table">
          <router-view @change-light="changeLight()" @change-dark="changeDark()"></router-view>
        </div>
    </div>

    </div>
</template>

<script>
import {API_BASE_URL, LANGUAGE} from  "../constants/index.js";
import {USER_EMAIL} from "../constants/index.js";
import {CURRENT_USER_ROLE, THEME_ID, THEME} from "../constants/index.js";
import {ACCESS_TOKEN} from "../constants/index.js";
import navigation from "./Navigation.vue"
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
      color:"",
       items: [
        { title: "Profile" },
        { title: "Settings" },
        { title: "Log Out" }
      ]
    }
  },
  mounted: function() {
    axios.get(API_BASE_URL + "/user/me", {
  headers:headers
}).then((response) => {
  console.log(response);
  document.getElementById("email").innerHTML=response.data.email;
localStorage.setItem(USER_EMAIL,response.data.email);
 document.getElementById("name").innerHTML=response.data.name;
 document.getElementById("pic").src=response.data.imageUrl;
 localStorage.setItem(CURRENT_USER_ROLE, response.data.role);
 localStorage.setItem(THEME,response.data.userSettings.theme);
 localStorage.setItem(LANGUAGE,response.data.userSettings.language);

      })
      .catch((err) => {
        console.log(err);
      });
    //onload funkcija
    //this.create();
    if(localStorage.getItem(THEME)=="light"){
document.getElementById("dropdown").style.backgroundColor="white";
//document.getElementById("divlist").style.backgroundColor="white";
}else if(localStorage.getItem(THEME)=="dark") {
document.getElementById("dropdown").style.backgroundColor="black";
//document.getElementById("divlist").style.backgroundColor="black";
}
},
  methods:{
    changeLight(){
document.getElementById("dropdown").style.backgroundColor="white";
    },
    changeDark(){
document.getElementById("dropdown").style.backgroundColor="black";
    },
    showDropdown(index) {
        if(index==0){
          this.$router.push("/profile");
        }
        else if(index==1){
        this.$router.push("/settings");
        }
        else if(index==2){
        localStorage.setItem(ACCESS_TOKEN,"");
        localStorage.setItem(CURRENT_USER_ROLE,"");
        localStorage.setItem(THEME,"");
        localStorage.setItem(CURRENT_USER_ROLE,"");
        localStorage.setItem(USER_EMAIL,"");
        localStorage.setItem(LANGUAGE,"");
        localStorage.setItem(USER_EMAIL,"");
          alert("You're safely logged out!");
          this.$router.push("/login");
        }
    }
  },
  }
</script>

<style scoped>
#dropdown{
  width:94%;
  height:72px;
  margin-bottom:0px;
  float:right;
}
#settings{
    background-color:  #006BF5;
    border-collapse: collapse;
}

#name {
  margin-right: 10px;
  margin-top: 10px;
  float: right;
}
#email {
  margin-left: 10px;
  margin-top: 10px;
  float: right;
}
#pic {
  border-radius: 50%;
  float: right;
  margin-top: 0px;
}
.options{
    width:100%;
    height:30px;
    text-align: center;
     border-collapse: collapse;
     border-width: 0 0 1px 1px;
     border-radius: 1px;
     background-color:#f1f1f1;
}
.option{
    padding-top:5px;
    box-sizing:border-box;
    width:100%;
    height: 100%;
    text-align:center;
     font-family: "Roboto", sans-serif;
  font-weight: 500;
    text-decoration:bold;
    
   border-collapse: collapse;

}
.option:hover{
  color:white;
  background-color:#006BF5;
}
#usersdata {
  float: right;
  height: 72px;
  margin-top: 0px;
}
#usersdata:hover {
  background-color: #f1f1f1;
}
#credentials {
  height: inherit;
  float: right;
  margin-right: 10px;
  margin-top: 5px;
}
#icon {
  float: right;
  margin-top: 25px;
  margin-right: 10px;
}
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
#picture{
  margin-top: 0px;
  float: right;
}
</style>