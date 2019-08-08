<template>
    <div id="settings2">
       <router-view></router-view>
       <!--<img src="../assets/settings.png" id="pic" class="img-circle" width="50" height="50"/> -->
        <h1 id="naslov"> Settings</h1>
         <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <div id="usersdata" v-on="on">
              <i id="ikona" class="material-icons">arrow_drop_down</i>
              <button id="slika">
                <img id="pic" class="img-circle" width="80" height="70" />
              </button>
              <div id="credentials">
                <h3 id="ime"></h3>
                <br />
                <p id="email"></p>
              </div>
            </div>
          </template>
          <ul id="settings">
            <li class="listaopcijauser" v-for="(item, index) in items" :key="index" @click="prikazi1(index)">
              <p id="opcijauser">  {{ item.title }} </p>            </li>
          </ul>
        </v-menu>
              <div class="data" id="profile">
                
        <br>
        <br>
                <p id="theme"> <strong> Theme: </strong> </p>
          <div id="select">
               <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <button id="color" v-on="on" v-on:input="bgc.backgroundColor = $event.target.value">
             Select color
              </button>
          </template>
          <ul id="settings">
            <li class="listaopcijauser" v-for="(item, index) in items2" :key="index" @click="prikazi(index)">
              <p id="opcijauser">  {{ item.title }} </p>            </li>
          </ul>
        </v-menu>
      </div>
      <br>
      <p id="languageparagraph"> <strong> Language: </strong> </p>
       <div id="select">
               <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <button id="language" v-on="on" v-on:input="bgc.backgroundColor = $event.target.value">
             Select Language
              </button>
          </template>
          <ul id="settings">
            <li class="listaopcijauser" v-for="(item, index) in items3" :key="index" @click="prikazi2(index)">
              <p id="opcijauser">  {{ item.title }} </p>            </li>
          </ul>
        </v-menu>
      </div>
      <input type="button" value="Save" @click="Save()" id="submit"/>         </div>
 
        </div>
       
</template>
<script>
import axios from "axios";
import {User_Email, THEME, SETTTINGS, COLOR, LANGUAGE, THEMEPARAGRAPH, LANGUAGEPARAGRAPH, User_Language} from "../constants/index.js";
import {ACCESS_TOKEN} from "../constants/index.js";
import navigation from "./navigation.vue"
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
} 

export default {
  name: "settings2",
    data () {
      return {
        items3Value:"",
        items2Value:"",
         items: [
        { title: "Profile" },
        { title: "Settings" },
        { title: "Terms and Conditions" },
        { title: "Log Out" }
      ],
      items2: [
        { title: "dark" },
        { title: "light" }
      ],
      items3: [
        { title: "English", value: "en"},
        { title: "Bosnian", value: "fr"}
      ],
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
 localStorage.setItem(User_Language,obj.userSettings.language);
};
if(localStorage.getItem(THEME)=="light"){
document.getElementById("settings2").style.backgroundColor="white";
 document.getElementById("settings2").style.color="black";

}else if(localStorage.getItem(THEME)=="dark") {
 document.getElementById("settings2").style.backgroundColor="black";
          //document.getElementById("settings2").style.color="white";
           document.getElementById("color").style.backgroundColor="black";
             document.getElementById("color").style.color="white";
          document.getElementById("language").style.backgroundColor="black";
          document.getElementById("language").style.color="white";
          document.getElementById("languageparagraph").style.color="black";
          document.getElementById("theme").style.color="black";
}

/*axios.get('http://localhost:8080/api/v1/f/', {
    params: {
        language: f + 1
    },
    headers: config
}).then((response) => {
  localStorage.setItem(THEME,response.data.theme);
  console.log(response);
}, (error) => {
  console.log(error);
});*/
    //onload funkcija
axios.get('http://localhost:8080/auth/get-greeting', {
    params: {
        language: localStorage.getItem(User_Language)
    },
    headers: headers
}).then((response) => {
  localStorage.setItem(SETTTINGS,response.data[0]);
   localStorage.setItem(COLOR,response.data[2]);
  localStorage.setItem(LANGUAGE,response.data[3]);
  localStorage.setItem(THEMEPARAGRAPH,response.data[1]);
  localStorage.setItem(LANGUAGEPARAGRAPH,response.data[4]);
  document.getElementById("color").innerHTML=localStorage.getItem(COLOR);
  document.getElementById("language").innerHTML=localStorage.getItem(LANGUAGE);
  document.getElementById("theme").innerHTML=localStorage.getItem(THEMEPARAGRAPH);
  document.getElementById("languageparagraph").innerHTML=localStorage.getItem(LANGUAGEPARAGRAPH);
  document.getElementById("naslov").innerHTML=localStorage.getItem(SETTTINGS);
  console.log(response);
}, (error) => {
  console.log(error);
});
    this.create();
  },
    methods: {
         prikazi(index) {
           this.items2Value=this.items2[index].title;
        if(index==0){
 document.getElementById("settings2").style.backgroundColor="black";
          document.getElementById("settings2").style.color="white";
          document.getElementById("color").style.backgroundColor="black";
          document.getElementById("language").style.backgroundColor="black";
           //document.getElementById("languageparagraph").style.color="black";
         /* axios.post(
         /* axios.post(
            'http://localhost:8080/user/color',
  { theme: this.items[0].title }, {
  headers: headers
}).then((response) => {
  localStorage.setItem(THEME,response.data.theme);
  console.log(response);
}, (error) => {
  console.log(error);
});*/
        }
        else if(index==1){
         document.getElementById("settings2").style.backgroundColor="white";
          document.getElementById("settings2").style.color="black";
           document.getElementById("color").style.backgroundColor="white";
             //document.getElementById("color").style.color="white";
          document.getElementById("language").style.backgroundColor="white";
          //document.getElementById("language").style.color="white";
          //document.getElementById("languageparagraph").style.color="black";
          //document.getElementById("theme").style.color="black";
          /*axios.post(
            'http://localhost:8080/user/color',
  { theme: this.items[1].title }, {
  headers: headers
}).then((response) => {
  localStorage.setItem(THEME,response.data.theme);
  console.log(response);
}, (error) => {
  console.log(error);
}); */
        
        }  
    },
    prikazi1(index) {
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
    prikazi2(index) {
      this.items3Value=this.items3[index].value;
      console.log(this.items3Value);
        if(index==0){
          axios.get('http://localhost:8080/auth/get-greeting', {
    params: {
        language: "en"
    },
    headers: headers
}).then((response) => {
  localStorage.setItem(SETTTINGS,response.data[0]);
   localStorage.setItem(COLOR,response.data[2]);
  localStorage.setItem(LANGUAGE,response.data[3]);
  localStorage.setItem(THEMEPARAGRAPH,response.data[1]);
  localStorage.setItem(LANGUAGEPARAGRAPH,response.data[4]);
  document.getElementById("color").innerHTML=localStorage.getItem(COLOR);
  document.getElementById("language").innerHTML=localStorage.getItem(LANGUAGE);
  document.getElementById("theme").innerHTML=localStorage.getItem(THEMEPARAGRAPH);
  document.getElementById("languageparagraph").innerHTML=localStorage.getItem(LANGUAGEPARAGRAPH);
  document.getElementById("naslov").innerHTML=localStorage.getItem(SETTTINGS);
  console.log(response);
}, (error) => {
  console.log(error);
});

        }
        else if(index==1){
         axios.get('http://localhost:8080/auth/get-greeting', {
    params: {
        language: "fr"
    },
    headers: headers
}).then((response) => {
  localStorage.setItem(SETTTINGS,response.data[0]);
  localStorage.setItem(COLOR,response.data[2]);
  localStorage.setItem(LANGUAGE,response.data[3]);
  localStorage.setItem(THEMEPARAGRAPH,response.data[1]);
  localStorage.setItem(LANGUAGEPARAGRAPH,response.data[4]);
  document.getElementById("color").innerHTML=localStorage.getItem(COLOR);
  document.getElementById("language").innerHTML=localStorage.getItem(LANGUAGE);
  document.getElementById("theme").innerHTML=localStorage.getItem(THEMEPARAGRAPH);
  document.getElementById("languageparagraph").innerHTML=localStorage.getItem(LANGUAGEPARAGRAPH);
   document.getElementById("naslov").innerHTML=localStorage.getItem(SETTTINGS);
  
  console.log(response);
}, (error) => {
  console.log(error);
});

console.log(localStorage.getItem(SETTTINGS));
        }
       
    },
    Save(){
      axios.post(
            'http://localhost:8080/user/color',
  { theme: this.items2Value,language:this.items3Value}, {
  headers: headers
}).then((response) => {
  localStorage.setItem(THEME,response.data.theme);
  localStorage.setItem(User_Language,response.data.language);
  console.log(response);
}, (error) => {
  console.log(error);
});
    }
  }
}

</script>
<style scoped>
#settings2 input[type="button"]{
    margin-right:15px;
    float:right;
    padding: 8px 8px 8px 8px;
	border-radius: 5px;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	color:#4D4D4D;
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
	font: normal 30px 'Bitter', serif;
	-moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
	-webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
	box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
	border: 1px solid #257C9E;
	font-size: 15px;
    border:none;
    background:#fff;
    margin-top:30px;
    margin-left:20px;
}

#settings2 #submit{
    float:right;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  	width:18%;
  	overflow: hidden;
    background: #0080ff;
	padding: 8px 20px 8px 20px;
	border-radius: 5px;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	color: #fff;
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
	font: normal 30px 'Bitter', serif;
	border: 1px solid #0080ff;;
	font-size: 15px;
} 

#settings2 #submit:hover{
    
	background:darkblue;
	-moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
	-webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
	box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}
#usersdata {
  float: right;
  height: 72px;
  margin-top: 0px;
}
#usersdata:hover {
  background-color: #f1f1f1;
}
h1{
  float:left;
  margin-bottom:15px;
}
#settings2{
    width:100%;
    height:100%;
    background-color:white;
}
.data p{
    margin-left:20px;
    float:left;
    text-align:left;
    display:inline;
   
}
.data{
  background-color:#f1f1f1;
  margin-top:20px;
    width:100%;
    margin-left:20px;
    margin-right:20px;
}
#email{
    float:left;
    width:30%;
}
#ime{
    float:left;
    width:30%;
}
#profile{
    display:flex;
    flex-direction: column;
    height:500px;
    text-align:left;
    
}
#pic{
  margin-top:10px;
  margin-left:10px;
    float:left;
}
button{
    float:left;
}
#select{
  display:inline;
  width:100px;
  background-color:white;
  margin-top:0px;
  margin-left:30px;
    float:left;
}

</style>