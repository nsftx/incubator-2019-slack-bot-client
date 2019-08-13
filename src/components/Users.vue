<template>

<div id="user">
    <router-view></router-view>
 <div id="header">
        <h1>Users</h1>
      </div>
       <div id="divlist">
    <ul id="list">
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
    </div>

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
import {API_BASE_URL} from  "../constants/index.js";
import {Current_User_Role, THEME_ID, THEME} from "../constants/index.js";
import {User_Email} from "../constants/index.js";
import {ACCESS_TOKEN} from "../constants/index.js";
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
            usersData:[],
            
        }
    },
    	mounted: function(){
        if(localStorage.getItem(THEME)=="light"){
document.getElementById("header").style.backgroundColor="white";
document.getElementById("divlist").style.backgroundColor="white";
}else if(localStorage.getItem(THEME)=="dark") {
document.getElementById("header").style.backgroundColor="black";
document.getElementById("divlist").style.backgroundColor="black";
}
    //onload funkcija
    this.create();
  }
,
    methods: {
        showUserForm(){
            this.$router.push("/dashboard/user/newUser");
        },
        
    }
  }

</script>

<style scoped>
h1 {
  margin-top: 0px;
  margin-left: 20px;
  width: 200px;
  float: left;
}
#header[data-v-040e3608] {
  margin-top:10px;
  margin-left: 15px;
  margin-right: 10px;
  display: block;
  width: 99%;
  float: right;
  background-color: white;
  height: 72px;
}
#divlist {
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 100vh;
}
body {
  font-family: "Lato", sans-serif;
background:#EAEAEA;
}
</style>