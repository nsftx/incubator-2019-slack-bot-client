<template>
  <div id="Audit">
    <div id="header">
      <h1>Activity</h1>
    </div>

    <div id="divlist">
      <ul id="list">
        <li id="title-li">
          <div class="column1 column">
            <h5>ID</h5>
            <p>
              <i class="material-icons">arrow_drop_down</i>
            </p>
          </div>
          <div class="column2 column">
            <h5>cause</h5>
            <p>
              <i class="material-icons">arrow_drop_down</i>
            </p>
          </div>
           <div class="column3 column">
            <h5>consequence</h5>
            <p>
              <i class="material-icons">arrow_drop_down</i>
            </p>
          </div>
          <div class="column4 column">
            <p>
              <i class="material-icons">filter_list</i>
            </p>
          </div>
        </li>

        <li v-for="audit in auditData" :key="audit.id">
          <div class="linear2"></div>
          <div class="linear1"></div>
          <div class="column1 column">
            <p>{{ audit.id }}</p>
          </div>
          <div class="column2 column">
            <p>{{ audit.cause}}</p>
          </div>
          <div class="column3 column">
            <p>{{ audit.consequence}}</p>
          </div>
        </li>
      </ul>
    </div>

    <div id="footer">
      <button id="footer-btn" @click="toggleMenu" v-click-outside="hideMenu">{{ this.rowSize }} Rows</button>
      <div id="menu" v-show="menu">
        <div
          class="menu-article"
          v-for="rowValue in rowSizesValue"
          :key="rowValue"
          @click="setRows(rowValue)"
        >{{ rowValue }}</div>
      </div>

      <div class="text-xs-center">
        <v-pagination v-model="page" :length="pagesSize" :total-visible="5" @input="changePage"></v-pagination>
      </div>
    </div>

    <div
      id="notification"
      v-show="showNoti"
      :class="{redBorder: errorOccured, greenBorder: !errorOccured}"
    >
      <input
        type="text"
        v-model="textNoti"
        readonly
        :class="{redText: errorOccured, greenText: !errorOccured}"
      />
      <button
        @click="showNotification"
        :class="{redBackground: errorOccured, greenBackground: !errorOccured}"
      >OK</button>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../constants/index.js";
import { Current_User_Role, THEME_ID, THEME } from "../constants/index.js";
import { User_Email } from "../constants/index.js";
import { ACCESS_TOKEN, CAUSE ,CONSEQUENCE ,USER_LANGUAGE, ACTIVITY_LOG } from "../constants/index.js";
import axios from "axios";
import ClickOutside from "vue-click-outside";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

export default {
  name: "Audit",
  data(){
      return{
        auditData: [],
        textNoti: "",
        showNoti: false,
        rowSizesValue: [5, 10, 20],
        rowSize: 20,
        page: 1, //current active page
        pagesSize: 1, //Number of pages
        menu: false,
        sortByValue: "createdAt",
        textNoti: "",
        errorOccured: false,
        showNoti: false
      }
  },
  mounted: function(){
     if (localStorage.getItem(THEME) == "light") {
      document.getElementById("header").style.backgroundColor = "white";
      document.getElementById("divlist").style.backgroundColor = "white";
    } else if (localStorage.getItem(THEME) == "dark") {
      document.getElementById("header").style.backgroundColor = "black";
      document.getElementById("divlist").style.backgroundColor = "black";
      document.getElementById("Audit").style.backgroundColor = "black";
    }
     if (localStorage.getItem(USER_LANGUAGE) != "en") {
       document.getElementsByTagName("H1")[0].innerHTML = localStorage.getItem(
       ACTIVITY_LOG
      );
      document.getElementsByTagName("H5")[1].innerHTML = localStorage.getItem(
        CAUSE
      );
      document.getElementsByTagName("H5")[2].innerHTML = localStorage.getItem(
        CONSEQUENCE
      );
     
    }
    this.auditData = [{id: 1, cause: "Testni tekst 1", consequence: "Testni tekst 1"}, {id: 2, cause: "Testni tekst 2", consequence: "Testni tekst 2"}]
  },
  methods:{
      toggleMenu() {
      this.menu = !this.menu;
    },

    hideMenu() {
      this.menu = false;
    },

    setRows(value) {
      if (value != this.rowSize) {
        this.rowSize = value;
        //this.reloadTriggers();
      }
      this.menu = !this.menu;
    },

    changePage(nextPage) {
      this.page = nextPage;
      //this.reloadTriggers(nextPage - 1);
    },

    async create() {
      try {
        const res = await axios.get(
          API_BASE_URL + "/api/triggers?page=0&size=" + this.rowSize
        );
        this.triggersData = res.data.content;
        if (res.data.totalPages == 0) this.pagesSize = 1;
        else this.pagesSize = res.data.totalPages;
        this.rowSize = res.data.size;
      } catch (err) {
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
  },
  directives: {
    ClickOutside
  }
};
</script>

<style scoped>

h1 {
  margin-top: 0px;
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
}

#divlist {
    width: 100%;
    height: 100vh;
}

#table {
  background-color: white;
}


#Audit {
  padding: 20px;
  background-color: white;
}

body {
  font-family: "Lato", sans-serif;
}

#footer {
  position: absolute;
  bottom: -10px;
  width: calc(93% - 20px);
  margin-right: 20px;
}

#title-li .column4{
  width: 45%;
}

.column2{
  width: 25%;
}

.column3{
  width: 17%;
  margin-left: 0px;
}

</style>