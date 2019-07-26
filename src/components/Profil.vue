<template>
    <div>
        <h1> Hello World </h1>
              <div class="data" id="profile">
              <img id="pic" class="img-circle" width="100" height="100"/>
              <br>
              <br>
            <p> <strong> Ime:  </strong> </p>
            <br>
            <p id="ime">
                <br>
                <p> <strong> Email address: </strong> </p>
                <br>
            <p id="email" class="alert alert-danger"> </p>
          <br>
<button @click="signOut()" class=" btn btn-danger"> Sign Out </button>
        </div>
        </div>
</template>
<script>
     /*const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};*/

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
//xhr.responseType = 'json';
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
   // document.getElementById("profile").style.display="block";
  //document.getElementById("email").innerHTML=currentUser;
  //document.getElementById("ime").innerHTML=profile.getName();
  //document.getElementById("pic").src=profile.getImageUrl();
    }


</script>

<style scoped>
.data p{
    text-align:left;
   
}
.data{
    margin-left:20px;
}
#profile{
    display:block;
}
</style>