<template>
   <div id="Schedules" class="tabcontent">
<router-view @reload-messages="reloadSchedules()" @show-notification="showNotification($event)"></router-view>

    <ul id="list">
      <li id="title-li">
        <div class="column1 column">
          <h5>Message</h5>
          <p>
            <i class="material-icons" @click="sortByTitle">arrow_drop_down</i>
          </p>
        </div>
        <div class="column2 column">
          <h5>Next Run</h5>
          <p>
            <i class="material-icons" @click="sortByText">arrow_drop_down</i>
          </p>
        </div>
        <div class="column3 column">
          <h5>Active At</h5>
          <p>
            <i class="tooltip, material-icons" @click="sortByDate">arrow_drop_down</i>
          </p>
        </div>
        <div class="column4 column">
          <p>
            <i class="material-icons">filter_list</i>
          </p>
        </div>
      </li>

      <li>
        <div class="linear1"></div>
        <div class="column1 column">
          <p>Testni naslov naslov naslov naslov naslov naslov naslov naslov naslov naslov naslov naslov naslov naslov naslov naslov naslov naslov naslov naslov</p>
        </div>
        <div class="column2 column">
          <p>26 Sept 2019</p>
        </div>
        <div class="column3 column">
          <p>Active</p>
        </div>
        <div class="column4 column">
          <i class="material-icons" @click="editSchedule(0)">create</i>
          <i class="material-icons" @click="deleteSchedule(0)">delete</i>
        </div>

      </li>

      <!-- <li v-for="message in messagesData" :key="message.messageId">
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
          <i class="material-icons tooltip" @click="showScheduleForm(message.messageId)" data-tooltip="Neki tekst">assignment_turned_in</i>
          <i class="material-icons" @click="showTriggerForm(message.messageId)">assistant</i>
          <i class="material-icons" @click="editSchedule(message.messageId)">create</i>
          <i class="material-icons" @click="deleteSchedule(message.messageId)">delete</i>
        </div>
      </li> -->
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

    <button @click="showScheduleForm" id="btn">+</button>

    <div id="notification" v-show="showNoti" :class="{redBorder: errorOccured, greenBorder: !errorOccured}">
      <input type="text" v-model="textNoti" readonly :class="{redText: errorOccured, greenText: !errorOccured}" />
      <button @click="showNotification" :class="{redBackground: errorOccured, greenBackground: !errorOccured}">OK</button>
    </div>
   </div>
</template>

<script>
import axios from "axios"
import ClickOutside from "vue-click-outside"

export default {
  name: "schedules",

  data(){
    return{
      schedulesData: [],
      rowSize: 20, //Number of rows
      pagesSize: 1, //Number of pages
      page: 1, //current active page
      menu: false,
      rowSizesValue: [5, 10, 20],
      sortType: "desc",
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
    }
  },

  mounted: function() {
    //onload funkcija
    this.create();
  },

  methods: {
    showScheduleForm(){
        this.$router.push("/dashboard/schedules/newSchedule");
      },

    async reloadSchedules() {
      var pg = this.page - 1;
      try 
      {
        var res;
        if(this.titleSort == true)
          res = await axios.get("http://localhost:8080/api/messages?page=" + pg + "&size=" + this.rowSize + "&sort=title," + this.sortType);
        else if(this.textSort == true)
          res = await axios.get("http://localhost:8080/api/messages?page=" + pg + "&size=" + this.rowSize + "&sort=text," + this.sortType);
        else
          res = await axios.get("http://localhost:8080/api/messages?page=" + pg + "&size=" + this.rowSize + "&sort=createdAt," + this.sortType);

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
       setTimeout(this.closeNoti, 1500)
       {}
    },

    closeNoti(){
        this.showNoti = false;
    },

    showScheduleForm() {
      this.$router.push("/dashboard/schedules/newSchedule");
    },

    async editSchedule(id) {
      this.$router.push("/dashboard/schedules/updateSchedule/" + id);
    },

    async deleteSchedule(id) {
      await axios.delete("http://localhost:8080/api/messages/" + id);
      var pg = this.page - 1;
      try 
      {
        var res;
        if(this.textSort == true)
          res = await axios.get("http://localhost:8080/api/messages?page=" + pg + "&size=" + this.rowSize + "&sort=text," + this.sortType);
        else
          res = await axios.get("http://localhost:8080/api/messages?page=" + pg + "&size=" + this.rowSize + "&sort=createdAt," + this.sortType);
        
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
        //this.reloadSchedules();
      }
      this.menu = !this.menu;
    },

    changePage(nextPage) {
      this.page = nextPage;
      this.reloadSchedules(nextPage - 1);
    },

    async create() {
      try 
      {
        const res = await axios.get("http://localhost:8080/api/schedules");
        console.log(res.data)
        this.schedulesData = res.data.content;
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
      if (this.sortType == "desc") 
        this.sortType = "asc";
      else 
        this.sortType = "desc";
      this.dateSort = true,
      this.titleSort = false,
      this.textSort = false,

      this.reloadSchedules();
    },

    sortByTitle(){
      if (this.sortType == "desc") 
        this.sortType = "asc";
      else 
        this.sortType = "desc";
      this.dateSort = false,
      this.titleSort = true,
      this.textSort = false

      this.reloadSchedules();
    },

    sortByText(){
      if (this.sortType == "desc") 
        this.sortType = "asc";
      else 
        this.sortType = "desc";
      this.dateSort = false,
      this.titleSort = false,
      this.textSort = true

      this.reloadSchedules();
    }
  },
  directives: {
    ClickOutside
  }
  }
</script>

<style scoped>
body {font-family: "Lato", sans-serif;
background:#EAEAEA;}


#Schedules{
  height: 100vh;
  width: 100%;
  padding: 20px;
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

#footer{
  width: 92%;
  height: 7vh;
  background-color: white;
  float: left;
  z-index: 0;
  position: absolute;
  border: 1px solid lightgray;
  bottom: 0px;
  margin: 0px;
  padding: 0px 20px;
}

#footer-btn{
    border: 1px solid grey;
    padding: 5px 5px;
    width: 105px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 4px;
}

.column1{
  width: 35%;
  margin-right: 10px;
}

.column2{
  width: 5%;
  margin-right: 20px;
}

#title-li .column4{
  margin-left: 30px;
}

.column4{
  width: 50%;
}

.linear1{
  left: 36%;
}

</style>
