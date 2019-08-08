<template>

<div id="user">
    <router-view></router-view>
 <div id="header">
        <h1>Users</h1>
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <div id="usersdata" v-on="on">
              <i id="ikona" class="material-icons">arrow_drop_down</i>
              <button id="slika">
                <img id="pic" class="img-circle" width="80" height="70" />
              </button>
              <div id="credentials">
                <h3 id="ime"> </h3>
                <br />
                <p id="email"> </p>
              </div>
            </div>
          </template>
          <ul id="settings">
            <li class="listaopcijauser" v-for="(item, index) in items" :key="index" @click="prikazi(index)">
              <p id="opcijauser">  {{ item.title }} </p>            </li>
          </ul>
        </v-menu>
      </div>
    <ul id="lista">
             <li id="title-li">
                 <div class="column1 column"> <h5>Name</h5> <p> <i class="material-icons">arrow_drop_down</i> </p> </div>
                 <div class="column2 column"> <h5>Email</h5> <p> <i class="material-icons">arrow_drop_down</i> </p> </div>
                 <div class="column3 column"> <h5>ID</h5> <p> <i class="material-icons">arrow_drop_down</i> </p> </div>
             </li>

        <li v-for="user in usersData" :key="user.id">
            <div class='linear2'></div>
            <div class='linear1'></div>
            <div class='column1 column'>
                <p> {{user.name}}</p> 
            </div> 
            <div class='column2 column'> 
                <p>{{user.Email}}</p>
            </div>
            <div class='column3 column'> 
                <p>{{user.ID}}</p>
            </div>
        </li>

    </ul>

   <!-- <div id="footer">
        <button id="footer-btn" @click="toggleMenu" v-click-outside="hideMenu"> {{ this.rowSize }} Rows </button>
        <div id="menu" v-show="menu">
            <div class="menu-article" v-for="rowValue in rowSizesValue" :key="rowValue" @click="setRows(rowValue)">{{ rowValue }}</div>
        </div>

        <div class="text-xs-center">
            <v-pagination
                v-model="page"
                :length="pagesSize"
                :total-visible="5"
                @input="changePage"
            ></v-pagination>
        </div>

    </div>    -->

    <button @click="showUserForm" id="btn"> + </button>
</div>

</template>

<script>
import {Current_User_Role, THEME_ID, THEME} from "../constants/index.js";
import {User_Email} from "../constants/index.js";
import {ACCESS_TOKEN} from "../constants/index.js";
import navigation from "./navigation.vue"
import axios from "axios";
import ClickOutside from "vue-click-outside";
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
} 
export default {
    name: "user",
    data(){
        return{
           items: [
        { title: "Profile" },
        { title: "Settings" },
        { title: "Terms and Conditions" },
        { title: "Log Out" }
      ],
            usersData:[],
            
        }
    },
    	mounted: function(){
           var xhr = new XMLHttpRequest();
         xhr.open('GET', 'http://localhost:8080/user/me');
         
xhr.setRequestHeader('Content-Type', 'application/json');
if(localStorage.getItem(ACCESS_TOKEN)) {
xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
//console.log("dohvati ga");
}
xhr.send();
      xhr.onload = function() {
  console.log('Signed in as: ' + xhr.responseText);
 var obj=JSON.parse(xhr.responseText);
 document.getElementById("email").innerHTML=obj.email;
localStorage.setItem(User_Email,obj.email);
 document.getElementById("ime").innerHTML=obj.name;
 document.getElementById("pic").src=obj.imageUrl;
 localStorage.setItem(Current_User_Role, obj.role);
 localStorage.setItem(THEME,obj.userSettings.theme);
};
if(localStorage.getItem(THEME)=="light"){
document.getElementById("header").style.backgroundColor="white";
document.getElementById("lista").style.backgroundColor="white";
}else if(localStorage.getItem(THEME)=="dark") {
document.getElementById("header").style.backgroundColor="black";
document.getElementById("lista").style.backgroundColor="black";
}
    //onload funkcija
    this.create();
  }
,
    methods: {
        showUserForm(){
            this.$router.push("/dashboard/user/newUser");
        },
        prikazi(index) {
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

</style>