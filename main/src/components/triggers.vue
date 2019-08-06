<template>
    <div id="Triggers" class="tabcontent">

<router-view @reload-triggers="reloadTriggers()" @show-notification="showNotification($event)"></router-view>

    <ul id="list">
      <li id="title-li">

        <div class="column1 column">
          <h5>Message</h5>
          <p>
            <i class="material-icons" @click="sortByTitle">arrow_drop_down</i>
          </p>
        </div>

        <div class="column2 column">
          <h5>Trigger</h5>
          <p>
            <i class="material-icons" @click="sortByDate">arrow_drop_down</i>
          </p>
        </div>

        <div class="column3 column">
          <h5>Channel</h5>
          <p>
            <i class="tooltip material-icons" @click="sortByChannel">arrow_drop_down</i>
          </p>
        </div>

        <div class="column5 column">
          <h5>Active</h5>
          <p>
            <i class="tooltip material-icons" @click="sortByActive">arrow_drop_down</i>
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
        titleSort: false,
        dateSort: true,
        channelSort: false,
        activeSort: false,
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
    //onload funkcija
    //console.log(this.$router.currentRoute.fullPath == "/dashboard/triggers");
    this.create();
  },

  methods: {
    showTriggerForm(){
        this.$router.push("/dashboard/triggers/newTrigger");
      },

    async reloadTriggers() {
      var pg = this.page - 1;
      try 
      {
        var res;

        if(this.titleSort == true)
          res = await axios.get("http://localhost:8080/api/triggers?page=" + pg + "&size=" + this.rowSize + "&sort=message.title," + this.sortType);

        else if(this.channelSort == true)
          res = await axios.get("http://localhost:8080/api/triggers?page=" + pg + "&size=" + this.rowSize + "&sort=channel," + this.sortType);

        else if(this.activeSort == true)
          res = await axios.get("http://localhost:8080/api/triggers?page=" + pg + "&size=" + this.rowSize + "&sort=active," + this.sortType);

        else
          res = await axios.get("http://localhost:8080/api/triggers?page=" + pg + "&size=" + this.rowSize + "&sort=createdAt," + this.sortType);

        if (res.data.totalPages < this.page)
          this.changePage(res.data.totalPages);

        this.triggersData = res.data.content;
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

    async editTrigger(id) {
      this.$router.push("/dashboard/triggers/updateTrigger/" + id);
    },

    async deleteTrigger(id) {
      await axios.delete("http://localhost:8080/api/triggers/" + id);
      var pg = this.page - 1;
      try 
      {
        var res;
        if(this.textSort == true)
          res = await axios.get("http://localhost:8080/api/triggers?page=" + pg + "&size=" + this.rowSize + "&sort=text," + this.sortType);
        else
          res = await axios.get("http://localhost:8080/api/triggers?page=" + pg + "&size=" + this.rowSize + "&sort=createdAt," + this.sortType);
        
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
        const res = await axios.get("http://localhost:8080/api/triggers");
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

    sortByDate() {

      this.changeSortType();

      this.dateSort = true;
      this.titleSort = false;
      this.channelSort = false;
      this.activeSort = false;

      this.reloadTriggers();
    },

    sortByTitle(){
      this.changeSortType();

      this.dateSort = false;
      this.titleSort = true;
      this.channelSort = false;
      this.activeSort = false;

      this.reloadTriggers();
    },

    sortByChannel(){
      this.changeSortType();

      this.dateSort = false;
      this.titleSort = false;
      this.channelSort = true;
      this.activeSort = false;

      this.reloadTriggers();
    },

    sortByActive(){
      this.changeSortType();

      this.dateSort = false;
      this.titleSort = false;
      this.channelSort = false;
      this.activeSort = true;

      this.reloadTriggers();
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
