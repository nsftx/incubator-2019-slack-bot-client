<template>
  <div id="poll">
    <router-view></router-view>

    <div id="header">
      <h1>Poll</h1>
    </div>

    <div id="divlist">
      <ul id="list">
        <li id="title-li">
          <div class="column1 column">
            <h5>Title</h5>
            <p>
              <i class="material-icons">arrow_drop_down</i>
            </p>
          </div>
          <div class="column2 column">
            <h5>Channel</h5>
            <p>
              <i class="material-icons">arrow_drop_down</i>
            </p>
          </div>
          <div class="column3 column">
            <h5>Active</h5>
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

        <li v-for="poll in pollData" :key="poll.id" @click="viewPoll(poll.id)">
          <div class="linear2"></div>
          <div class="linear1"></div>
          <div class="column1 column">
            <p>{{poll.title}}</p>
          </div>
          <div class="column2 column">
            <p>{{poll.channel}}</p>
          </div>
          <div class="column3 column">
            <p>{{poll.active}}</p>
          </div>
          <div class="column4 column">
            <i class="material-icons">delete</i>
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

    <button @click="showPollForm" id="btn">+</button>

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

<script scoped>
import { API_BASE_URL } from "../constants/index.js";
import { Current_User_Role, THEME_ID, THEME,POLL,USER_LANGUAGE,TITLE,CHANNEL,ACTIVE} from "../constants/index.js";
import { User_Email } from "../constants/index.js";
import { ACCESS_TOKEN } from "../constants/index.js";
import axios from "axios";
import ClickOutside from "vue-click-outside";
import { setTimeout } from "timers";

export default {
    name: "poll",
    data(){
        return{
            pollData: [],
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
        document.getElementById("poll").style.backgroundColor = "white";
      document.getElementById("header").style.backgroundColor = "white";
      document.getElementById("divlist").style.backgroundColor = "white";
    } else if (localStorage.getItem(THEME) == "dark") {
      document.getElementById("header").style.backgroundColor = "black";
      document.getElementById("divlist").style.backgroundColor = "black";
      document.getElementById("poll").style.backgroundColor = "black";
    }
    if (localStorage.getItem(USER_LANGUAGE) != "en") {
       document.getElementsByTagName("H1")[0].innerHTML = localStorage.getItem(
       POLL
      );
      document.getElementsByTagName("H5")[0].innerHTML = localStorage.getItem(
        TITLE
      );
      document.getElementsByTagName("H5")[1].innerHTML = localStorage.getItem(
        CHANNEL
      );
      document.getElementsByTagName("H5")[2].innerHTML = localStorage.getItem(
        ACTIVE
      );
    }
      this.pollData = [{id: 1, title: "Probni naslov 1", channel: "general", active: "active"},{id: 2, title: "Probni naslov 2", channel: "general", active: "not active"}]
    },
    methods:{
    showPollForm() {
      this.$router.push("/dashboard/poll/newPoll");
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
        alert(err);
      }
    },

    showNotification(value) {
      if (value == -1) {
        this.textNoti = "Some error have occured";
        this.errorOccured = true;
      } else {
        this.errorOccured = false;
        this.textNoti = "Succes";
      }
      this.showNoti = !this.showNoti;
      setTimeout(this.closeNoti, 1500);
      {
      }
    },

    closeNoti() {
      this.showNoti = false;
    },

    viewPoll(id){
      this.$router.push("/dashboard/poll/viewPoll/" + id)
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped>
#poll {
  padding: 20px;
  height: 100%;
}

#header[data-v-040e3608] {
  margin-left: 15px;
  margin-right: 10px;
  display: block;
  width: 99%;
  float: right;
  background-color: white;
}

#footer {
  position: absolute;
  bottom: -10px;
  width: calc(93% - 20px);
  margin-right: 20px;
}

.column1{
  width: 35%;
}

.column2{
  width: 10%;
  margin-left: 20px;
}

.column3{
  width: 7%;
  padding: 15px;
}

.linear2{
  left: 45%;
}

li:hover{
  cursor: pointer;
}
</style>