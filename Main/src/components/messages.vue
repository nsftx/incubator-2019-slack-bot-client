<template>

<div id="messages">
    <router-view></router-view>
      <ul id="list">
               <li id="title-li">
                   <div class="column1 column"> <h5>Title</h5> <p> <i class="material-icons">arrow_drop_down</i> </p> </div>
                   <div class="column2 column"> <h5>Text</h5> <p> <i class="material-icons">arrow_drop_down</i> </p> </div>
                   <div class="column3 column"> <h5>Created At</h5> <p> <i class="material-icons">arrow_drop_down</i> </p> </div>
                   <div class="column4 column"> <p> <i class="material-icons">filter_list</i> </p> </div>
               </li>
          
        <!-- <li>
            <div class='linear2'></div>
         <div class='linear1'></div>
            <div class='column1 column'><p>The Emerald Buddha</p> </div> <div class='column2 column'> <p>Your cheap internet-based banner advertising will become one of the sought for ads there are. Today, the world of Internet advertising is rapidly evolving beyond banner ads and intrusive pop-ups. Bayles A common medium for advertising on the Internet is the use of banner ads. Since the dawn of the internet, Banner Ads have been one of the most reliable forms of web advertising.   These internet banners advertising may come cheap</p></div>
        <div class='column3 column'> <p>26 Sep 2018</p></div>
        <div class='column4 column'> <i class='material-icons' @click="showScheduleForm">assignment_turned_in</i> 
        <i class='material-icons' @click="showTriggerForm">assistant</i> </div>
        </li> -->

        <li v-for="message in messagesData" :key="message.id">
            <div class='linear2'></div>
            <div class='linear1'></div>
            <div class='column1 column'>
                <p> {{message.title}}</p> 
            </div> 
            <div class='column2 column'> 
                <p>{{message.text}}</p>
            </div>
            <div class='column3 column'> 
                <p>{{message.created_at | shortDate }}</p>
            </div>
            <div class='column4 column'> 
            <i class='material-icons' @click="showScheduleForm(message.id)">assignment_turned_in</i> 
            <i class='material-icons' @click="showTriggerForm(message.id)">assistant</i> 
            <i class="material-icons" @click="editMessage(message.id)">create</i>
            <i class="material-icons" @click="deleteMessage(message.id)">delete</i>
            </div>
            
        </li>

      </ul>

    <div id="footer">
        <button id="footer-btn" @click="toggleMenu"> {{ this.rowSize }} Rows </button>
        <div id="menu" v-show="menu">
            <div class="menu-article" @click="setRows(5)">5</div>
            <div class="menu-article" @click="setRows(10)">10</div>
            <div class="menu-article" @click="setRows(20)">20</div>
        </div>

    <div class="text-xs-center">
        <v-pagination
            v-model="page"
            :length="5"
            :total-visible="5"
            @input="changePage"
        ></v-pagination>
    </div>

    </div>    

    <button @click="showMessageForm" id="btn"> + </button>
</div>

</template>


<script>
import axios from "axios";
//import { async } from 'q';

export default {
    name: "messages",
    data(){
        return{
            messagesData: [],
            rowSize: 20, //Number of rows
            pagesSize: 1, //Number of pages
            page: 1, //curren active page
            menu: false
        }
    },
    mounted: function(){
        //onload funkcija
        this.create();
    },
    filters: {
        shortDate(value){
            let datum = value;
            let datumVar = new Date(datum);
            let mjesec = datumVar.toDateString();
            let data = mjesec.substring(4);
            return data;
        }
    },
    methods: {
        showMessageForm(){
            this.$router.push("/messages/newMessage");
        },
        showTriggerForm(id){
            this.$router.push("/messages/newTrigger/" + id);
        },
        showScheduleForm(id){
            this.$router.push("/messages/newSchedule/" + id);
        },
        editMessage(id)
        {
            console.log("Edituj poruku sa id: " + id);
            this.$router.push("/messages/newMessage/" + id);
        },
        deleteMessage(id)
        {
            console.log("Izbrisi poruku sa id: " + id);
        },
        toggleMenu(){
            this.menu = !this.menu;
        },
        setRows(value)
        {
            if(value != this.rowSize)
            {
                this.rowSize = value;
                console.log("Pozovi api sa parametrom: " + value);
            }
            this.menu = !this.menu;
        },
        changePage(page){
            console.log("Pozovi api sa parametrom: " + page);
        },
        async create(){
            try{
                const res = await axios.get("./json.txt");
                this.messagesData = res.data.content;
                this.pagesSize = res.data.totalPages;
            }
            catch(err){
                alert(err);
            }
        },
    }
}
</script>

<style>

      *{
            box-sizing: border-box;
            margin: 0px;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
        }

        *:focus{
            outline: none;
        }

        #menu{
            height: 120px;
            width: 105px;
            position: absolute;
            float: left;
            bottom: 70%;
        }

        .text-xs-center{
            width: 400px;
            float: right;
            position: relative;
            right: 50%;
            transform: translateX(50%);
        }

        .menu-article{
            height: 33.333%;
            border: 1px solid white;
            width: 100%;
            display: flex;
            background-color: rgb(192, 188, 188);
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            z-index: 99;
        }

        .menu-article:hover{
            cursor: pointer;
            background-color: lightgray;
        }

        #messages{
          padding: 20px;
          padding-bottom: 0px;
          height: 100vh;
        }

        #list{
          height: 80%;
        }

        html, body{
            height: 100%;
            overflow: hidden;
        }

        #btn{
            position: absolute;
            bottom: 100px;
            right: 50px;
        }

        ul{
            width: 100%;
            height: 100%;
            padding: 0px;
        }

        #title-li{
            border-radius: 3px 3px 0px 0px;
            background-color: #F1F1F1;
        }

        #title-li .material-icons{
            display: block;
        }

        li{
            display: flex;
            height: 48px;
            width: 100%;
            background-color: white;
            border: 0.5px solid lightgray;
            border-bottom: 0px;
            overflow: hidden;
        }

        li:last-child{
            border-bottom: 0.5px solid lightgray;
        }

        li p{
            font-size: 13px;
        }

        .column{
            margin-left: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px;
            font-weight: 300;
        }

        #title-li .column h5{
            font-size: 14px;
        }

        #title-li .column{
            margin-left: 20px;
            color: black;
        }

        li p{
          margin: 0px;
          color: rgb(70, 67, 67);
        }

        .column1{
            width: 13%;
        }

        .column2{
            width: 35%;
        }

        .column3{
            width: 7%;
            margin-left: 30px;
        }

        .column4{
            width: 45%;
        }

        .column4 p{
            margin-left: 20px;
        }

        .column4{
            justify-content: flex-end;
            padding-right: 20px;
        }

        li:hover{
            background-color: #F1F1F1;
        }

        .linear1{
            background-image: linear-gradient(90deg, rgba(236, 236, 236, 0) 0%, white 100%);
            width: 60px;
            height: 40px;
            margin-top: 5px;
            position: absolute;
            left: 16%;
        }

        .linear2{
            background-image: linear-gradient(90deg, rgba(236, 236, 236, 0) 0%, white 100%);
            width: 60px;
            height: 40px;
            margin-top: 5px;
            z-index: 5;
            position: absolute;
            left: 48%;
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

#footer ul{
    border: 0px;
}

#footer ul li{
    display: block;
    border: 0px;
}

#footer li i{
    margin: 0px;
}

#footer ul li:hover{
    background-color: white;
}

#footer ul li button{
    border: 0px;
    height: 100%;
}

#footer ul li button i{
    border: 0px;
}

#footer li .material-icons{
    display: block;
}

.theme--light.v-pagination .v-pagination__item--active{
    color: lightgray;
}

.v-pagination__item{
    -webkit-box-shadow: none;
    box-shadow: none;
}

.v-pagination__navigation{
    -webkit-box-shadow: none;
    box-shadow: none;
}

</style>

<style scoped>
  
</style>