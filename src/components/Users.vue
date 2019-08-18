<template>

<div id="user">
    <router-view @reload-users="reloadUsers()" @show-notification="showNotification($event)"></router-view>
   
 <div id="header">
        <h1>Users</h1>
      </div>
       <div id="divlist">
    <ul id="list">
             <li id="title-li">
                 <div class="column1 column"> <h5>Name</h5> <p> <i class="material-icons">arrow_drop_down</i> </p> </div>
                 <div class="column2 column"> <h5>Email</h5> <p> <i class="material-icons">arrow_drop_down</i> </p> </div>
                 <div class="column3 column"> <h5>Role</h5> <p> <i class="material-icons">arrow_drop_down</i> </p> </div>
             </li>

        <li v-for="user in usersData" :key="user.id">
            <div class='linear2'></div>
            <div class='linear1'></div>
            <div class='column1 column'>
                <p> {{user.name}}</p> 
            </div> 
            <div class='column2 column'> 
                <p>{{user.email}}</p>
            </div>
            <div class='column3 column'> 
                <p>{{user.role}}</p>
                 <div class="column4 column">
          <i class="material-icons" @click="editUser(user.userId)">create</i>
          <i class="material-icons" @click="deleteUser(user.userId)">delete</i>
        </div>
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
import {API_BASE_URL, NAME, ROLE} from  "../constants/index.js";
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
      rowSize: 20, //Number of rows
      pagesSize: 1, //Number of pages
      page: 1, //current active page
      menu: false,
      rowSizesValue: [5, 10, 20],
      sortType: "desc",
      dateSort: true,
      sortByValue: "createdAt",
            
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
if(localStorage.getItem(LANGUAGE)!="en"){
       document.getElementsByTagName("H1")[0].innerHTML=localStorage.getItem(USERS);
       document.getElementsByTagName("H5")[0].innerHTML=localStorage.getItem(NAME);
       document.getElementsByTagName("H5")[2].innerHTML=localStorage.getItem(ROLE);
        }
    //onload funkcija
    this.create();
  }
,
    methods: {
        async editUser(id) {
      this.$router.push("/dashboard/messages/updateUser/" + id);
    },
    async deleteUser(id) {
      await axios.delete(API_BASE_URL+"/user/delete/" + id);
      var pg = this.page - 1;
      try 
      {
        var res;
        if(this.titleSort == true)
          res = await axios.get(API_BASE_URL+"/user/getAllUsers?page=" + pg + "&size=" + this.rowSize + "&sort=title," + this.sortType);
        else if(this.textSort == true)
          res = await axios.get(API_BASE_URL+"/user/getAllUsers?page=" + pg + "&size=" + this.rowSize + "&sort=text," + this.sortType);
        else
          res = await axios.get(API_BASE_URL+"/user/getAllUsers?page=" + pg + "&size=" + this.rowSize + "&sort=createdAt," + this.sortType);
        
        if (res.data.numberOfElements == 0) 
        {
          if (this.page != 1) 
            this.changePage(this.page - 1);
        }
        this.usersData = res.data.content;
        if (res.data.totalPages == 0) 
            this.pagesSize = 1;
        else 
            this.pagesSize = res.data.totalPages;
        this.showNotification(200);
      } 
      catch (err) 
      {
        this.showNotification(-1);
      }
    },
        async reloadUsers() {
      var pg = this.page - 1;
      try 
      {
        const res = await axios.get(API_BASE_URL+"/api/messages?page=" + pg + "&size=" + this.rowSize + "&sort=" + this.sortByValue + "," + this.sortType);

        if (res.data.totalPages < this.page)
          this.changePage(res.data.totalPages);

        this.messagesData = res.data.content;
        this.pagesSize = res.data.totalPages;
      } 
      catch (err) 
      {
        this.showNotification(-1);
      }
    },
        showUserForm(){
            this.$router.push("/dashboard/user/newUser");
        },
        async reloadMessages() {
      var pg = this.page - 1;
      try 
      {
        const res = await axios.get(API_BASE_URL+"/user/getAllUsers?page=" + pg + "&size=" + this.rowSize + "&sort=" + this.sortByValue + "," + this.sortType);

        if (res.data.totalPages < this.page)
          this.changePage(res.data.totalPages);

        this.usersData = res.data.content;
        this.pagesSize = res.data.totalPages;
      } 
      catch (err) 
      {
        this.showNotification(-1);
      }
    },
    async create() {
      try 
      {
        const res = await axios.get(API_BASE_URL+"/user/getAllUsers?page=0&size=" + this.rowSize + "&sort=name," + this.sortType);
        this.usersData = res.data.content;
        if (res.data.totalPages == 0) 
            this.pagesSize = 1;
        else 
            this.pagesSize = res.data.totalPages;
        this.rowSize = res.data.size;
      }
      catch (err) {
        //alert(err);
         console.log(err);
      }
    },
    sortBy(value) {
      if (this.sortType == "desc") 
        this.sortType = "asc";
      else 
        this.sortType = "desc";
      
      this.sortByValue = value;
      this.reloadMessages();
    }
    },
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