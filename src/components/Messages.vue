<template>
  <div id="messages">
    <router-view @reload-messages="reloadMessages()" @show-notification="showNotification($event)"></router-view>
    <div id="header">
      <h1>Messages</h1>
    </div>
    <div id="divlist">
      <ul id="list">
        <li id="title-li">
          <div class="column1 column">
            <h5>Title</h5>
            <p>
              <i class="material-icons" @click="sortBy('title')" title="Sort by title">arrow_drop_down</i>
            </p>
          </div>
          <div class="column2 column">
            <h5>Text</h5>
            <p>
              <i class="material-icons" @click="sortBy('text')" title="Sort by text">arrow_drop_down</i>
            </p>
          </div>
          <div class="column3 column">
            <h5>Created At</h5>
            <p>
              <i class="tooltip, material-icons" @click="sortBy('createdAt')" title="Sort by date">arrow_drop_down</i>
            </p>
          </div>
          <div class="column4 column">
            <p>
              <i class="material-icons">filter_list</i>
            </p>
          </div>
        </li>

        <li v-for="message in messagesData" :key="message.messageId">
          <div class="linear2"></div>
          <div class="linear1"></div>
          <div class="column1 column">
            <p>{{message.title}}</p>
          </div>
          <div class="column2 column">
            <p class="lip">{{message.text}}</p>
          </div>
          <div class="column3 column">
            <p class="lip">{{message.createdAt | shortDate }}</p>
          </div>
          <div class="column4 column">
            <i
              class="material-icons tooltip"
              @click="showScheduleForm(message.messageId)"
            title="Create schedule">assignment_turned_in</i>
            <i class="material-icons" @click="showTriggerForm(message.messageId)" title="Create trigger">assistant</i>
            <i class="material-icons" @click="editMessage(message.messageId)" title="Edit message">create</i>
            <i class="material-icons" @click="deleteMessage(message.messageId)" title="Delete message">delete</i>
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

    <button @click="showMessageForm" id="btn">+</button>

    <div
      id="notification"
      v-show="showNotificationValue"
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
/* eslint-disable */
import {
  THEME_ID,
  THEME,
  API_BASE_URL,
  TITLE,
  TEXT,
  CREATEDAT,
  USER_THEME,
  USER_LANGUAGE,
  USER_NAME,
  USER_PIC,
  CURRENT_USER_ROLE
} from "../constants/index.js";
import { USER_EMAIL, LANGUAGE } from "../constants/index.js";
import { ACCESS_TOKEN, MESSAGES } from "../constants/index.js";
import axios from "axios";
import ClickOutside from "vue-click-outside";
import { setTimeout } from "timers";
export default {
  name: "messages",
  data() {
    return {
      messagesData: [],
      rowSize: 20, //Number of rows
      pagesSize: 1, //Number of pages
      page: 1, //current active page
      menu: false,
      rowSizesValue: [5, 10, 20],
      sortType: "desc",
      dateSort: true,
      sortByValue: "createdAt",
      textNoti: "",
      errorOccured: false,
      showNotificationValue: false
    };
  },
  mounted: async function() {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    };
    await axios

      .get(API_BASE_URL + "/user/me", {
        headers: headers
      })
      .then(response => {
        localStorage.setItem(USER_EMAIL, response.data.email);
        localStorage.setItem(USER_NAME, response.data.name);
        localStorage.setItem(USER_PIC, response.data.imageUrl);
        localStorage.setItem(CURRENT_USER_ROLE, response.data.role);
        localStorage.setItem(USER_THEME, response.data.userSettings.theme);
        localStorage.setItem(
          USER_LANGUAGE,
          response.data.userSettings.language
        );
        return axios
          .get(API_BASE_URL + "/user/translation", {
            params: {
              language: localStorage.getItem(USER_LANGUAGE)
            },
            headers: headers
          })
          .then(
            response => {
              for (var key in response.data) {
                if (response.data.hasOwnProperty(key)) {
                  localStorage.setItem(key, response.data[key]);
                }
              }
            },
            error => {
              console.log(error);
            }
          );
      })
      .catch(err => {
        console.log(err);
      });
    if (localStorage.getItem(USER_THEME) == "Light") {
      this.$emit("change-light");
      document.getElementById("header").style.backgroundColor = "white";
      document.getElementById("messages").style.backgroundColor = "white";
    } else if (localStorage.getItem(USER_THEME) == "Dark") {
      this.$emit("change-dark");
     document.getElementById("footer").style.backgroundColor="#191919";
     document.getElementsByTagName("H1")[0].style.color="#f1f1f1";
      document.getElementById("divlist").style.backgroundColor="#4c4c4c";
      document.getElementById("header").style.backgroundColor = "#191919";
      document.getElementById("messages").style.backgroundColor = "#191919";
      document.getElementById("messages").style.color = "#f1f1f1";
      document.getElementById("title-li").style.backgroundColor="#323232";
      document.getElementById("title-li").style.color="#f1f1f1";
      document.getElementsByTagName("H5")[0].style.color="#f1f1f1";
       document.getElementsByTagName("H5")[1].style.color="#f1f1f1";
        document.getElementsByTagName("H5")[2].style.color="#f1f1f1";
      
    }
    if (localStorage.getItem(USER_LANGUAGE) == "fr") {
      document.getElementsByTagName("H1")[0].innerHTML = localStorage.getItem(
        MESSAGES
      );
      document.getElementsByTagName("H5")[0].innerHTML = localStorage.getItem(
        TITLE
      );
      document.getElementsByTagName("H5")[1].innerHTML = localStorage.getItem(
        TEXT
      );
      document.getElementsByTagName("H5")[2].innerHTML = localStorage.getItem(
        CREATEDAT
      );
    }
    this.create();
  },
  filters: {
    shortDate(value) {
      let dateVar = new Date(value);
      let dataVar2 = dateVar.toDateString();
      let data = dataVar2.substring(4);
      return data;
    }
  },
  methods: {
    async reloadMessages() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      var pg = this.page - 1;
      try {
        const res = await axios.get(
          API_BASE_URL +
            "/api/messages?page=" +
            pg +
            "&size=" +
            this.rowSize +
            "&sort=" +
            this.sortByValue +
            "," +
            this.sortType,
          { headers: headers }
        );

        if (res.data.totalPages < this.page)
          this.changePage(res.data.totalPages);

        this.messagesData = res.data.content;
        this.pagesSize = res.data.totalPages;
      } catch (err) {
        this.showNotification(-1);
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
      this.showNoti = !this.showNotificationValue;
      setTimeout(this.closeNotification, 1500);
      {
      }
    },

    closeNotification() {
      this.showNotificationValue = false;
    },

    showMessageForm() {
      this.$router.push("/dashboard/messages/newMessage");
    },

    showTriggerForm(id) {
      this.$router.push("/dashboard/messages/newTrigger/" + id);
    },

    showScheduleForm(id) {
      this.$router.push("/dashboard/messages/newSchedule/" + id);
    },

    async editMessage(id) {
      this.$router.push("/dashboard/messages/updateMessage/" + id);
    },

    async deleteMessage(id) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      await axios.delete(API_BASE_URL + "/api/messages/" + id);
      var pg = this.page - 1;

      try {
        const res = await axios.get(
          API_BASE_URL +
            "/api/messages?page=" +
            pg +
            "&size=" +
            this.rowSize +
            "&sort=" +
            this.sortByValue +
            "," +
            this.sortType,
          { headers: headers }
        );

        if (res.data.numberOfElements == 0) {
          if (this.page != 1) this.changePage(this.page - 1);
        }
        this.messagesData = res.data.content;
        if (res.data.totalPages == 0) this.pagesSize = 1;
        else this.pagesSize = res.data.totalPages;
        this.showNotification(200);
      } catch (err) {
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
        this.reloadMessages();
      }
      this.menu = !this.menu;
    },

    changePage(nextPage) {
      this.page = nextPage;
      this.reloadMessages(nextPage - 1);
    },

    async create() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      try {
        const res = await axios.get(
          API_BASE_URL +
            "/api/messages?page=0&size=" +
            this.rowSize +
            "&sort=createdAt," +
            this.sortType,
          { headers: headers }
        );
        this.messagesData = res.data.content;
        if (res.data.totalPages == 0) this.pagesSize = 1;
        else this.pagesSize = res.data.totalPages;
        this.rowSize = res.data.size;
      } catch (err) {
        this.showNotification(-1);
      }
      /* if (localStorage.getItem(USER_THEME) == "Light") {
      this.$emit("change-light");
      document.getElementById("header").style.backgroundColor = "white";
      document.getElementById("messages").style.backgroundColor = "white";
    } else if */ if (
        localStorage.getItem(USER_THEME) == "Dark"
      ) {
        this.$emit("change-dark");
        for (var i; i < document.getElementsByTagName("li").length; i++) {
          document.getElementsByTagName("li")[i].style.backgroundColor =
            "#3c4858";
          document.getElementsByTagName("li")[i].style.color = "white";
          //document.getElementById("messages").style.backgroundColor = "black";
        }
      } else if (localStorage.getItem(USER_THEME) == "Light") {
        /*document.getElementById("linear1").style.backgroundImage="linear-gradient(
    90deg,
    rgba(236, 236, 236, 0) 0%,
    white 100%
  )";*/
        //this.$emit("change-dark");
        for (var i; i < document.getElementsByTagName("li").length; i++)
          document.getElementsByTagName("li")[i].style.backgroundColor =
            "white";
      }
    },

    sortBy(value) {
      if (this.sortType == "desc") this.sortType = "asc";
      else this.sortType = "desc";

      this.sortByValue = value;
      this.reloadMessages();
    }
  },

  directives: {
    ClickOutside
  }
};
</script>

<style>
h1 {
  margin-top: 0px;
  width: 200px;
  float: left;
}

#header {
  display: block;
  width: 100%;
  float: right;
  background-color: white;
}

#divlist {
  width: 100%;
  height: 100vh;
}

* {
  box-sizing: border-box;
  margin: 0px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
}

*:focus {
  outline: none;
}

#menu {
  width: 105px;
  position: absolute;
  float: left;
  bottom: 69%;
}

.text-xs-center {
  width: 400px;
  float: right;
  position: relative;
  right: 50%;
  transform: translateX(50%);
}

.menu-article {
  border: 1px solid white;
  width: 100%;
  display: flex;
  background-color: rgb(192, 188, 188);
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  z-index: 99;
  padding: 10px 0px;
}

.menu-article:hover {
  cursor: pointer;
  background-color: lightgray;
}

#messages {
  padding: 20px;
  padding-bottom: 0px;
  height: 100vh;
}

#list {
  height: 83%;
  overflow: auto;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

#btn {
  position: absolute;
  bottom: 100px;
  right: 50px;
}

ul {
  width: 100%;
  height: 100%;
  padding: 0px;
}

#title-li {
  border-radius: 3px 3px 0px 0px;
  background-color: #f1f1f1;
  position: sticky;
  top: 0;
}

#title-li .column {
  overflow: unset;
}

#title-li .material-icons {
  display: block;
}

li {
  display: flex;
  height: 48px;
  width: 100%;
  /*background-color: white;*/
  border: 0.5px solid lightgray;
  border-bottom: 0px;
  overflow: hidden;
}

li:last-child {
  border-bottom: 0.5px solid lightgray;
}

li p {
  font-size: 13px;
}

.column {
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 300;
}

#title-li .column h5 {
  font-size: 14px;
}

#title-li .column {
  margin-left: 20px;
  color: black;
}

#title-li .column4 {
  padding-right: 20px;
}

li p {
  margin: 0px;
  /*color: rgb(70, 67, 67);*/
}

.column1 {
  width: 13%;
}

.column2 {
  width: 35%;
}

.column3 {
  width: 7%;
  margin-left: 30px;
}

.column4 {
  width: 45%;
}

.column4 p {
  margin-left: 20px;
}

.column4 {
  justify-content: flex-end;
  padding-right: 55px;
}

li:hover {
  color: #2c3e50;
  background-color: #f1f1f1;
}

li:hover .linear1 {
  background-image: linear-gradient(
    90deg,
    rgba(236, 236, 236, 0) 0%,
    rgb(241, 238, 238) 100%
  );
}

li:hover .linear2 {
  background-image: linear-gradient(
    90deg,
    rgba(236, 236, 236, 0) 0%,
    rgb(241, 238, 238) 100%
  );
}

.linear1 {
  /*background-image: linear-gradient(
    90deg,
    rgba(236, 236, 236, 0) 0%,
    white 100%
  );*/
  width: 60px;
  height: 40px;
  margin-top: 5px;
  position: absolute;
  left: 16%;
}

.linear2 {
  /*background-image: linear-gradient(
    90deg,
    rgba(236, 236, 236, 0) 0%,
    white 100%
  );*/
  width: 60px;
  height: 39px;
  margin-top: 5px;
  position: absolute;
  left: 45%;
}

#btn {
  float: right;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  font-size: 30px;
  position: absolute;
  bottom: 4%;
  right: 5%;
  background-color: #006bf5;
  color: white;
  border: 1px solid white;
  font-family: "Courier New", Courier, monospace;
  line-height: 60px;
  z-index: 95;
}

#btn:hover {
  cursor: pointer;
}

#footer {
  height: 7%;
  position: relative;
  bottom: 15%;
  background-color: white;
  z-index: 0;
  border: 1px solid lightgray;
  padding: 0px 20px;
}

#footer {
  position: absolute;
  bottom: -10px;
  width: calc(87.5% - 20px);
  margin-right: 20px;
}

#footer-btn {
  border: 1px solid grey;
  padding: 5px 5px;
  width: 105px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 4px;
}

#footer ul li {
  display: block;
  border: 0px;
}

#footer ul li:hover {
  background-color: white;
}

#footer ul li button {
  height: 100%;
}

#footer li .material-icons {
  /* for right and left nav icons */
  display: block;
}

.theme--light.v-pagination .v-pagination__item--active {
  /* for active page */
  color: lightgray;
}
.text-xs-center {
  height: 100%;
}

.v-pagination__item {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.v-pagination__navigation {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.greenBorder {
  border: 1px solid rgb(85, 235, 85);
}

.redBorder {
  border: 1px solid rgb(248, 74, 74);
}

.redText {
  color: rgb(248, 74, 74);
}

.greenText {
  color: rgb(85, 235, 85);
}

.redBackground {
  background-color: rgb(248, 74, 74);
}

.redBackground:hover {
  background-color: rgb(241, 101, 101);
}

.greenBackground {
  background-color: rgb(85, 235, 85);
}

.greenBackground:hover {
  background-color: rgb(140, 231, 140);
}

#notification {
  height: 10vh;
  width: 370px;
  position: absolute;
  right: 11%;
  bottom: 20px;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#notification input {
  height: 60%;
  width: 100%;
  text-align: center;
  font-size: 25px;
}

#notification button {
  width: 100%;
  height: 40%;
  text-align: center;
  font-size: 20px;
  color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
