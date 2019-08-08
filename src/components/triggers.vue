<template>
    <div id="Triggers" class="tabcontent">

<router-view @reload-triggers="reloadTriggers()" @show-notification="showNotification($event)"></router-view>
<div id="header">
        <h1>Triggers</h1>
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <div id="usersdata" v-on="on">
              <i id="ikona" class="material-icons">arrow_drop_down</i>
              <button id="slika">
                <img id="pic" class="img-circle" width="80" height="70" />
              </button>
              <div id="credentials">
                <h3 id="ime">Amina Fajić</h3>
                <br />
                <p id="email">aminafajic879@gmail.com</p>
              </div>
            </div>
          </template>
          <ul id="settings">
            <li class="listaopcijauser" v-for="(item, index) in items" :key="index" @click="prikazi(index)">
              <p id="opcijauser">  {{ item.title }} </p>            </li>
          </ul>
        </v-menu>
      </div>
      <div id="lista">
    <ul id="list">
      <li id="title-li">

        <div class="column1 column">
          <h5>Message</h5>
          <p>
            <i class="material-icons" @click="sortBy('message.title')">arrow_drop_down</i>
          </p>
        </div>

        <div class="column2 column">
          <h5>Trigger</h5>
          <p>
            <i class="material-icons" @click="sortBy('createdAt')">arrow_drop_down</i>
          </p>
        </div>

        <div class="column3 column">
          <h5>Channel</h5>
          <p>
            <i class="tooltip material-icons" @click="sortBy('channel')">arrow_drop_down</i>
          </p>
        </div>

        <div class="column5 column">
          <h5>Active</h5>
          <p>
            <i class="tooltip material-icons" @click="sortBy('active')">arrow_drop_down</i>
          </p>
        </div>

        <div class="column4 column">
          <p>
            <i class="material-icons">filter_list</i>
          </p>
        </div>
      </li>

      <li v-for="trigger in triggersData" :key="trigger.triggerId">
        <div class="linear1"></div>
        <div class="linear2"></div>
        <div class="column1 column">
          <p> {{ trigger.message.title }} </p>
        </div>
        <div class="column2 column">
          <p> {{ trigger.createdAt | shortDate }}</p>
        </div>
        <div class="column3 column">
          <p>{{ trigger.channel }}</p>
        </div>

        <div class="column5 column">
          <p> {{ trigger.active | activeView }}</p>
        </div>
        <div class="column4 column">
          <i class="material-icons" @click="editTrigger(trigger.triggerId)">create</i>
          <i class="material-icons" @click="deleteTrigger(trigger.triggerId)">delete</i>
        </div>
      </li>
    </ul>
     </div>

    <div id="footer">
      <button id="footer-btn" @click="toggleMenu" v-click-outside="hideMenu">{{ this.rowSize }} Rows</button>
      <div id="menu" v-show="menu">
        <div class="menu-article" v-for="rowValue in rowSizesValue" :key="rowValue" @click="setRows(rowValue)">{{ rowValue }}</div>
      </div>

      <div class="text-xs-center">
        <v-pagination v-model="page" :length="pagesSize" :total-visible="5" @input="changePage"></v-pagination>
      </div>
    </div>

    <button @click="showTriggerForm" id="btn">+</button>

    <div id="notification" v-show="showNoti" :class="{redBorder: errorOccured, greenBorder: !errorOccured}">
      <input type="text" v-model="textNoti" readonly :class="{redText: errorOccured, greenText: !errorOccured}" />
      <button @click="showNotification" :class="{redBackground: errorOccured, greenBackground: !errorOccured}">OK</button>
    </div>
</div>
</template>

<script>
import axios from "axios"
import ClickOutside from "vue-click-outside";
import {Current_User_Role, THEME_ID, THEME} from "../constants/index.js";
import {User_Email} from "../constants/index.js";
import {ACCESS_TOKEN} from "../constants/index.js";
import navigation from "./navigation.vue"
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
} 
export default {
    name: "Triggers",
    data(){
      return{
        items: [
        { title: "Profile" },
        { title: "Settings" },
        { title: "Terms and Conditions" },
        { title: "Log Out" }
      ],
        triggersData: [],
        rowSize: 20, //Number of rows
        pagesSize: 1, //Number of pages
        page: 1, //current active page
        menu: false,
        rowSizesValue: [5, 10, 20],
        sortType: "desc",
        sortByValue: "createdAt",
        textNoti: "",
        errorOccured: false,
        showNoti: false
      }
    },

    filters: {
    shortDate(value) {
      let dateVar = new Date(value);
      let dataVar2 = dateVar.toDateString();
      let data = dataVar2.substring(4);
      return data;
    },
    activeView(value){
      if(value == true)
        return "Active";
      else
        return "Not active";
    }
  },

  mounted: function() {
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
    //this.create();
  },

  methods: {
    showTriggerForm(){
        this.$router.push("/dashboard/triggers/newTrigger");
      },

    async reloadTriggers() {
      var pg = this.page - 1;
      try 
      {
        const res = await axios.get("http://localhost:8080/api/triggers?page=" + pg + "&size=" + this.rowSize + "&sort=" + this.sortByValue + "," + this.sortType);

        if (res.data.totalPages < this.page)
          this.changePage(res.data.totalPages);

        this.triggersData = res.data.content;
        this.pagesSize = res.data.totalPages;
      } 
      catch (err) 
      {
       // alert(err);
       console.log(err);
      }
    },

    showNotification(value) {
       if(value == -1)
       {
           this.textNoti = "Some error have occured";
           this.errorOccured = true;
       }
       else
       {
          this.errorOccured = false;
          this.textNoti = "Succes"; 
       }
       this.showNoti = !this.showNoti;
       setTimeout(this.closeNoti, 1500)
       {}
    },

    closeNoti(){
        this.showNoti = false;
    },

    async editTrigger(id) {
      this.$router.push("/dashboard/triggers/updateTrigger/" + id);
    },

    async deleteTrigger(id) {
      await axios.delete("http://localhost:8080/api/triggers/" + id);
      var pg = this.page - 1;
      try 
      {
        const res = await axios.get("http://localhost:8080/api/triggers?page=" + pg + "&size=" + this.rowSize + "&sort=" + this.sortByValue + "," + this.sortType);
        
        if (res.data.numberOfElements == 0) 
        {
          if (this.page != 1) 
            this.changePage(this.page - 1);
        }
        this.messagesData = res.data.content;
        if (res.data.totalPages == 0) 
            this.pagesSize = 1;
        else 
            this.pagesSize = res.data.totalPages;
        this.reloadTriggers();
        this.showNotification(200);
      } 
      catch (err) 
      {
        this.showNotification(-1);
      }
    },

    toggleMenu() {
      this.menu = !this.menu;
    },

    hideMenu() {
      this.menu = false;
    },

    setRows(value) {
      if (value != this.rowSize) {
        this.rowSize = value;
        this.reloadTriggers();
      }
      this.menu = !this.menu;
    },

    changePage(nextPage) {
      this.page = nextPage;
      this.reloadTriggers(nextPage - 1);
    },

    async create() {
      try 
      {
        const res = await axios.get("http://localhost:8080/api/triggers?page=0&size=" + this.rowSize);
        this.triggersData = res.data.content;
        if (res.data.totalPages == 0) 
            this.pagesSize = 1;
        else 
            this.pagesSize = res.data.totalPages;
        this.rowSize = res.data.size;
      }
      catch (err) {
        alert(err);
      }
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
    },
  
    changeSortType(){
      if (this.sortType == "asc") 
        this.sortType = "desc";
      else 
        this.sortType = "asc";
    },

    sortBy(value)
    {
      if (this.sortType == "asc") 
        this.sortType = "desc";
      else 
        this.sortType = "asc";

      this.sortByValue = value;
      this.reloadTriggers();
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped>
#settings{
    background-color:  #006BF5;
    border-collapse: collapse;
}

.listaopcijauser{
    width:100%;
    height:30px;
    text-align: center;
     border-collapse: collapse;
     border-width: 0 0 1px 1px;
     border-radius: 1px;
     background-color:#f1f1f1;
}
#opcijauser{
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
#opcijauser:hover{
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
#ikona {
  float: right;
  margin-top: 25px;
  margin-right: 10px;
}
h1 {
  margin-top: 15px;
  margin-left: 20px;
  width: 200px;
  float: left;
}
#ime {
  margin-right: 10px;
  margin-top: 10px;
  float: right;
}
#email {
  margin-left: 10px;
  margin-top: 10px;
  float: right;
}
#header {
  margin-left: 15px;
  margin-right: 10px;
  display: block;
  width: 99%;
  float: right;
  background-color: white;
  height: 72px;
}
#pic {
  border-radius: 50%;
  float: right;
  margin-top: 0px;
}
#slika {
  margin-top: 0px;
  float: right;
}
#lista {
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 100vh;
}
body {font-family: "Lato", sans-serif;
background:#EAEAEA;}


#Triggers{
  height: 100vh;
  padding: 20px;
  padding-bottom: 0px;
   width: 100%;
}

.column1{
  width: 34%;
  margin-right: 15px;
}

.column2{
  width: 8%;
}

.column3{
  width: 8%;
  margin-right: 20px;
  margin-left: 20px;
}

.column5{
  width: 5%;
}

.column4{
  width: 40%;
}

.linear1{
  left: 34%;
}

.linear1{
  width: 84px;
}

.linear2{
  left: 53%;
}

#btn {
    float:right;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    font-size: 30px;
    position: absolute;
    bottom: 50px;
    right: 13px;
    background-color:  #006BF5;;
    color: white;
    border: 1px solid white;
    font-family: 'Courier New', Courier, monospace;
    line-height: 60px;
    z-index: 99;
}

#btn:hover{
  cursor: pointer;
}
</style>
