<template>
  <div id="messages">
    <router-view @reload-messages="reloadMessages()" @show-notification="showNotification($event)"></router-view>

    <ul id="list">
      <li id="title-li">
        <div class="column1 column">
          <h5>Title</h5>
          <p>
            <i class="material-icons">arrow_drop_down</i>
          </p>
        </div>
        <div class="column2 column">
          <h5>Text</h5>
          <p>
            <i class="material-icons">arrow_drop_down</i>
          </p>
        </div>
        <div class="column3 column">
          <h5>Created At</h5>
          <p>
            <i class="material-icons" @click="sortByDate">arrow_drop_down</i>
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
          <p>{{message.text}}</p>
        </div>
        <div class="column3 column">
          <p>{{message.createdAt | shortDate }}</p>
        </div>
        <div class="column4 column">
          <i class="material-icons"@click="showScheduleForm(message.messageId)">assignment_turned_in</i>
          <i class="material-icons" @click="showTriggerForm(message.messageId)">assistant</i>
          <i class="material-icons" @click="editMessage(message.messageId)">create</i>
          <i class="material-icons" @click="deleteMessage(message.messageId)">delete</i>
        </div>
      </li>
    </ul>

    <div id="footer">
      <button id="footer-btn" @click="toggleMenu" v-click-outside="hideMenu">{{ this.rowSize }} Rows</button>
      <div id="menu" v-show="menu">
        <div class="menu-article" v-for="rowValue in rowSizesValue" :key="rowValue" @click="setRows(rowValue)">{{ rowValue }}</div>
      </div>

      <div class="text-xs-center">
        <v-pagination v-model="page" :length="pagesSize" :total-visible="5" @input="changePage"></v-pagination>
      </div>
    </div>

    <button @click="showMessageForm" id="btn">+</button>

    <div id="notification" v-show="showNoti" :class="{redBorder: errorOccured, greenBorder: !errorOccured}">
      <input type="text" v-model="textNoti" readonly :class="{redText: errorOccured, greenText: !errorOccured}" />
      <button @click="showNotification">OK</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import ClickOutside from "vue-click-outside";
import { setTimeout } from 'timers';

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
      dateSort: "desc",
      showNoti: false,
      textNoti: "",
      errorOccured: false
    };
  },
  mounted: function() {
    //onload funkcija
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
      var pg = this.page - 1;
      try 
      {
        const res = await axios.get("http://localhost:8080/api/messages?page=" + pg + "&size=" + this.rowSize + "&&sort=createdAt," + this.dateSort);

        if (res.data.totalPages < this.page)
          this.changePage(res.data.totalPages);

        this.messagesData = res.data.content;
        this.pagesSize = res.data.totalPages;
      } 
      catch (err) 
      {
        alert(err);
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
       setTimeout(this.closeNoti, 2000)
       {};
    },

    closeNoti(){
        this.showNoti = false;
    },

    showMessageForm() {
      this.$router.push("/messages/newMessage");
    },

    showTriggerForm(id) {
      this.$router.push("/messages/newTrigger/" + id);
    },

    showScheduleForm(id) {
      this.$router.push("/messages/newSchedule/" + id);
    },

    async editMessage(id) {
      this.$router.push("/messages/updateMessage/" + id);
    },

    async deleteMessage(id) {
      await axios.delete("http://localhost:8080/api/messages/" + id);
      var pg = this.page - 1;
      try 
      {
        const res = await axios.get("http://localhost:8080/api/messages?page=" + pg + "&size=" + this.rowSize + "&sort=createdAt," + this.dateSort);
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
      } 
      catch (err) 
      {
        alert(err);
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
      try 
      {
        const res = await axios.get("http://localhost:8080/api/messages?sort=createdAt,desc&page=0&size=" + this.rowSize + "&sort=createdAt," + this.dateSort);
        this.messagesData = res.data.content;
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
    sortByDate() {
      if (this.dateSort == "desc") 
        this.dateSort = "asc";
      else 
        this.dateSort = "desc";
      this.reloadMessages();
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style>
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
  height: 95%;
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
  background-color: white;
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

li p {
  margin: 0px;
  color: rgb(70, 67, 67);
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
  padding-right: 20px;
}

li:hover {
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
  background-image: linear-gradient(
    90deg,
    rgba(236, 236, 236, 0) 0%,
    white 100%
  );
  width: 60px;
  height: 40px;
  margin-top: 5px;
  position: absolute;
  left: 17%;
}

.linear2 {
  background-image: linear-gradient(
    90deg,
    rgba(236, 236, 236, 0) 0%,
    white 100%
  );
  width: 60px;
  height: 40px;
  margin-top: 5px;
  z-index: 5;
  position: absolute;
  left: 48%;
}

#btn {
  float: right;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  font-size: 30px;
  position: absolute;
  bottom: 50px;
  right: 13px;
  background-color: #006bf5;
  color: white;
  border: 1px solid white;
  font-family: "Courier New", Courier, monospace;
  line-height: 60px;
  z-index: 99;
}

#btn:hover {
  cursor: pointer;
}

#footer {
  height: 7%;
  position: relative;
  bottom: 2%;
  background-color: white;
  z-index: 0;
  border: 1px solid lightgray;
  padding: 0px 20px;
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

.greenBorder{
    border: 1px solid rgb(85, 235, 85);
}

.redBorder{
    border: 1px solid rgb(248, 74, 74);
}

.redText{
    color: rgb(248, 74, 74);
}

.greenText{
    color: rgb(85, 235, 85);
}

#notification {
  height: 10vh;
  width: 400px;
  position: absolute;
  right: 100px;
  bottom: 10px;
  background-color: white;
  border-radius: 10px;
}

#notification input{
    height: 60%;
    width: 100%;
    text-align: center;
    font-size: 25px;
}

#notification button{
    width: 100%;
    height: 40%;
    text-align: center;
    font-size: 20px;
    background-color: rgb(211, 205, 205);
}

#notification button:hover{
    background-color: rgb(233, 224, 224);
}
</style>