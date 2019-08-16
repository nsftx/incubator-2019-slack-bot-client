<template>
    <div id="profile">
        <div id="header">
        <h1> Profile </h1>
        </div>
        <br>
              <div class="data" id="profile">
              <img id="pic1" class="img-circle" width="100" height="100"/>
              <br>
              <br>
            <p> <strong> Name:  </strong> </p>
            <p id="name1"> </p>
                <br>
                <p> <strong> Email address: </strong> </p>
            <p id="email1"></p>
          <br>
          <p> <strong> Language: </strong> </p>
            <p id="language1"></p>
          <br>
          <p> <strong> Theme: </strong> </p>
            <p id="theme1"></p>
          <br>
           <p> <strong> Role: </strong> </p>
            <p id="role1"></p>
          <br>
<button @click="signOut()" id="submit"> Sign Out </button>
        </div>
        </div>
</template>
<script>
    

import {ACCESS_TOKEN, API_BASE_URL, USER_EMAIL, LANGUAGE,THEME,CURRENT_USER_ROLE} from "../constants/index.js";
export default {
    name: "profil",
    mounted:function(){
         var xhr = new XMLHttpRequest();
         xhr.open('GET', API_BASE_URL+'/user/me');
         
xhr.setRequestHeader('Content-Type', 'application/json');
if(localStorage.getItem(ACCESS_TOKEN)) {
xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
//console.log("dohvati ga");
}
xhr.send();
      xhr.onload = function() {
  console.log('Signed in as: ' + xhr.responseText);
 var obj=JSON.parse(xhr.responseText);
 console.log(localStorage.getItem(USER_EMAIL));
 document.getElementById("email1").innerHTML=localStorage.getItem(USER_EMAIL);
 document.getElementById("name1").innerHTML=obj.name;
 document.getElementById("pic1").src=obj.imageUrl;
 document.getElementById("language1").innerHTML=localStorage.getItem(LANGUAGE);
 document.getElementById("theme1").innerHTML=localStorage.getItem(THEME);
 document.getElementById("role1").innerHTML=localStorage.getItem(CURRENT_USER_ROLE);


};
 if(localStorage.getItem(THEME)=="light"){
document.getElementById("profile").style.backgroundColor="white";
document.getElementById("profile").style.color="black";
}else if(localStorage.getItem(THEME)=="dark") {
document.getElementById("profile").style.backgroundColor="black";
document.getElementById("profile").style.color="white";
}
},
methods:{
    signOut(){
         localStorage.setItem(ACCESS_TOKEN,"");
          alert("You're safely logged out!");
          this.$router.push("/login");
    }

}
   
    }


</script>

<style scoped>
.data p[data-v-47aa12d3] {
    margin-left: 20px;
    text-align: left;
    display: inline;
}

#profile .data {
    padding: 20px;
    padding-bottom: 0px;
    height: auto;
    background-color:#f1f1f1;
}
#profile{
  padding: 20px;
  padding-bottom: 0px;
  height:100%;
  background-color:white;
}
#table{
    height:0vh;
}
html, body {
    height: 100%;
    overflow: hidden;
    background-color: white;
}

h1{
    text-align:left;
    padding-left: 10px;
  margin-left:0px;
  color:#2c3e50;
  margin-top: 0px;
  width: 200px;
  float: left;
}

#header {
  
  display: block;
  width: 99%;
  float: right;
  background-color: white;
  height: 72px;
}
.data p{
    margin-left:20px;
    float:left;
    text-align:left;
   
}
.data{
    width:100%;
    margin-left:20px;
}
#email{
    float:left;
    width:30%;
    color:black;
}
#name{
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
    float:left;
}
button{
    float:left;
    padding-top:30px;
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
#submit{
  position: absolute;
    bottom: 420px;
    right: 100px;
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
#submit:hover{
    
	background:darkblue;
	-moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
	-webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
	box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}
.data{
  background-color:#f1f1f1;
  margin-top:20px;
    width:100%;
    margin-left:20px;
    margin-right:20px;
}
</style>