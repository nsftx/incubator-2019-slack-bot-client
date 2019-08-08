<template>
    <div id="profil">
        <h1> Profile </h1>
        <br>
              <div class="data" id="profile">
              <img id="pic" class="img-circle" width="100" height="100"/>
              <br>
              <br>
            <p> <strong> Ime:  </strong> </p>
            <p id="ime"> </p>
                <br>
                <p> <strong> Email address: </strong> </p>
            <p id="email" class="alert alert-danger"> </p>
          <br>
<button @click="signOut()" class="btn btn-danger"> Sign Out </button>
        </div>
        </div>
</template>
<script>
    

import {ACCESS_TOKEN} from "../constants/index.js";
export default {
    name: "profil",
    mounted:function(){
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
 document.getElementById("ime").innerHTML=obj.name;
 document.getElementById("pic").src=obj.imageUrl;

};

},
methods:{
    signOut(){
         localStorage.removeItem(ACCESS_TOKEN);
          alert("You're safely logged out!");
          this.$router.push("/login");
    }

}
   
    }


</script>

<style scoped>
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
</style>