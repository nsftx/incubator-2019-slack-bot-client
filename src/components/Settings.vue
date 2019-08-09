<template>
    <div id="settings2">
       <router-view></router-view>
        <h1 id="naslov"> Settings</h1>
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
            <li class="options" v-for="(item, index) in items2" :key="index" @click="showThemeSettings(index)">
              <p class="option">  {{ item.title }} </p>            </li>
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
            <li class="options" v-for="(item, index) in items3" :key="index" @click="showLanguageSettings(index)">
              <p class="option">  {{ item.title }} </p>            </li>
          </ul>
        </v-menu>
      </div>
      <input type="button" value="Save" @click="Save()" id="submit"/>         </div>
 
        </div>
       
</template>
<script>
import axios from "axios";
import {USER_EMAIL, THEME, SETTTINGS, COLOR, LANGUAGE, THEMEPARAGRAPH, LANGUAGEPARAGRAPH, USER_LANGUAGE} from "../constants/index.js";
import {ACCESS_TOKEN} from "../constants/index.js";
import {SAVE} from "../constants/index.js";
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
if(localStorage.getItem(THEME)=="light"){
document.getElementById("settings2").style.backgroundColor="white";
 document.getElementById("settings2").style.color="black";

}else if(localStorage.getItem(THEME)=="dark") {
 document.getElementById("settings2").style.backgroundColor="black";
           document.getElementById("color").style.backgroundColor="black";
             document.getElementById("color").style.color="white";
          document.getElementById("language").style.backgroundColor="black";
          document.getElementById("language").style.color="white";
          document.getElementById("languageparagraph").style.color="black";
          document.getElementById("theme").style.color="black";
}

axios.get('http://localhost:8080/user/translation', {
    params: {
        language: localStorage.getItem(USER_LANGUAGE)
    },
    headers: headers
}).then((response) => {
  localStorage.setItem(SETTTINGS,response.data.title);
   localStorage.setItem(COLOR,response.data.theme);
  localStorage.setItem(LANGUAGE,response.data.language);
  localStorage.setItem(THEMEPARAGRAPH,response.data.selectColor);
  localStorage.setItem(LANGUAGEPARAGRAPH,response.data.selectLanguage);
  document.getElementById("color").innerHTML=localStorage.getItem(COLOR);
  document.getElementById("language").innerHTML=localStorage.getItem(LANGUAGE);
  document.getElementById("theme").innerHTML=localStorage.getItem(THEMEPARAGRAPH);
  document.getElementById("languageparagraph").innerHTML=localStorage.getItem(LANGUAGEPARAGRAPH);
  document.getElementById("naslov").innerHTML=localStorage.getItem(SETTTINGS);
  document.getElementById("submit").value=localStorage.getItem(SAVE);
  console.log(response);
}, (error) => {
  console.log(error);
});
    //this.create();
  },
    methods: {
        showThemeSettings(index) {
           this.items2Value=this.items2[index].title;
        if(index==0){
 document.getElementById("settings2").style.backgroundColor="black";
          document.getElementById("settings2").style.color="white";
          document.getElementById("color").style.backgroundColor="black";
          document.getElementById("language").style.backgroundColor="black";
        }
        else if(index==1){
         document.getElementById("settings2").style.backgroundColor="white";
          document.getElementById("settings2").style.color="black";
           document.getElementById("color").style.backgroundColor="white";
          document.getElementById("language").style.backgroundColor="white";
        
        }  
    },
    showLanguageSettings(index) {
      this.items3Value=this.items3[index].value;
      console.log(this.items3Value);
        if(index==0){
          axios.get('http://localhost:8080/user/translation', {
    params: {
        language: "en"
    },
    headers: headers
}).then((response) => {
  localStorage.setItem(SETTTINGS,response.data.title);
   localStorage.setItem(COLOR,response.data.theme);
  localStorage.setItem(LANGUAGE,response.data.language);
  localStorage.setItem(THEMEPARAGRAPH,response.data.selectColor);
  localStorage.setItem(LANGUAGEPARAGRAPH,response.data.selectLanguage);
   localStorage.setItem(SAVE,response.data.save);
  document.getElementById("color").innerHTML=localStorage.getItem(COLOR);
  document.getElementById("language").innerHTML=localStorage.getItem(LANGUAGE);
  document.getElementById("theme").innerHTML=localStorage.getItem(THEMEPARAGRAPH);
  document.getElementById("languageparagraph").innerHTML=localStorage.getItem(LANGUAGEPARAGRAPH);
  document.getElementById("naslov").innerHTML=localStorage.getItem(SETTTINGS);
  document.getElementById("submit").value=localStorage.getItem(SAVE);
  console.log(response);
}, (error) => {
  console.log(error);
});

        }
        else if(index==1){
         axios.get('http://localhost:8080/user/translation', {
    params: {
        language: "fr"
    },
    headers: headers
}).then((response) => {
  localStorage.setItem(SETTTINGS,response.data.title);
   localStorage.setItem(COLOR,response.data.theme);
  localStorage.setItem(LANGUAGE,response.data.language);
  localStorage.setItem(THEMEPARAGRAPH,response.data.selectColor);
  localStorage.setItem(LANGUAGEPARAGRAPH,response.data.selectLanguage);
  localStorage.setItem(SAVE,response.data.save);
  document.getElementById("color").innerHTML=localStorage.getItem(COLOR);
  document.getElementById("language").innerHTML=localStorage.getItem(LANGUAGE);
  document.getElementById("theme").innerHTML=localStorage.getItem(THEMEPARAGRAPH);
  document.getElementById("languageparagraph").innerHTML=localStorage.getItem(LANGUAGEPARAGRAPH);
  document.getElementById("naslov").innerHTML=localStorage.getItem(SETTTINGS);
   document.getElementById("submit").value=localStorage.getItem(SAVE);
  
  console.log(response);
}, (error) => {
  console.log(error);
});

console.log(localStorage.getItem(SETTTINGS));
        }
       
    },
    Save(){
      axios.post(
            'http://localhost:8080/user/userSettings',
  { theme: this.items2Value,language:this.items3Value}, {
  headers: headers
}).then((response) => {
  localStorage.setItem(THEME,response.data.theme);
  localStorage.setItem(USER_LANGUAGE,response.data.language);
  console.log(response);
}, (error) => {
  console.log(error);
});
    }
  }
}

</script>
<style scoped>
#option{
  width:100%;
}
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