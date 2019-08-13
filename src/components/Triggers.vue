<template>
    <div id="Triggers" class="tabcontent">
      <div id="header">
 <h1>Triggers</h1>
 </div>
<router-view @reload-triggers="reloadTriggers()" @show-notification="showNotification($event)"></router-view>

       
        
      
      <div id="divlist">
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
import {API_BASE_URL} from  "../constants/index.js";
import axios from "axios"
import ClickOutside from "vue-click-outside";
import {Current_User_Role, THEME_ID, THEME} from "../constants/index.js";
import {User_Email} from "../constants/index.js";
import {ACCESS_TOKEN} from "../constants/index.js";
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
} 
export default {
    name: "Triggers",
    data(){
      return{
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
   if(localStorage.getItem(THEME)=="light"){
document.getElementById("header").style.backgroundColor="white";
document.getElementById("Triggers").style.backgroundColor="white";
}else if(localStorage.getItem(THEME)=="dark") {
document.getElementById("header").style.backgroundColor="black";
document.getElementById("Triggers").style.backgroundColor="black";
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
        const res = await axios.get(API_BASE_URL+"/api/triggers?page=" + pg + "&size=" + this.rowSize + "&sort=" + this.sortByValue + "," + this.sortType);

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
      await axios.delete(API_BASE_URL+"/api/triggers/" + id);
      var pg = this.page - 1;
      try 
      {
        const res = await axios.get(API_BASE_URL+"/api/triggers?page=" + pg + "&size=" + this.rowSize + "&sort=" + this.sortByValue + "," + this.sortType);
        
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
        const res = await axios.get(API_BASE_URL+"/api/triggers?page=0&size=" + this.rowSize);
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
h1 {
  margin-top: 0px;
  margin-left: 20px;
  width: 200px;
  float: left;
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
#divlist {
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
