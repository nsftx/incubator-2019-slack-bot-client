
<template>
    <div id="login">
        <div id="right">        
            <div id="right-content">
<a id="btn btn-block social-btn google" href="">
                <i class="fab fa-google"></i>
  </a>
                <h1  id="loginTekst">Log in</h1>
               
            
                
            </div>
        </div>
    <div id="left">
        <div id="logo"></div>
        <h1>Nsoft <br>
        Welcome bot</h1>
    </div>
  </div>
</template>

<script>
import {GOOGLE_AUTH_URL} from  "../constants/index.js";
export default {
    name: "login",
    methods: {
    
  },
  mounted(){
      document.getElementById("btn btn-block social-btn google").href=GOOGLE_AUTH_URL;

  }
}
</script>


<style scoped>

#login{
    height: 100vh;
}

#right{
    height: 100%;
    background-color: rgb(70, 142, 235);
    z-index: -1;
    clip-path: polygon(50% 0%, 100% 0, 100% 100%, 89% 100%, 10% 0, 29% 0);
    width: 100%;
    color: white;
}

#right-content{
    position: absolute;
    font-size: 100px;
    right: 15%;
    top: 20%;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
}

#right-content h1{
    font-size: 65px;
    margin-top: 20px;
    transition: 0.3s;
    border: 1px solid white;
    padding: 5px 30px;
    border-radius: 5px;
}

#right-content h1:hover{
    cursor: pointer;
    color: rgb(233, 224, 224);
    font-size: 70px;
    background-color: white;
    color: rgb(70, 142, 235);
}

a{
    color: unset;
    text-decoration: none;
}

i{
    transition: 0.3s;
}

i:hover{
    cursor: pointer;
    color: rgb(233, 224, 224);
    font-size: 120px
}

#left{
    clip-path: polygon(0 0, 0 100%, 100% 100%, 89% 100%, 10% 0);
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    background-color: white;
}

#left h1{
    position: absolute;
    font-size: 50px;
    top: 65%;
    left: 10%;
    color: rgb(70, 142, 235);
}

#logo{
    background-image: url("../assets/logo.png");
    background-position: center;
    background-size: cover;
    height: 120px;
    width: 120px;
    top: 50%;
    left: 10%;
    position: absolute;
}

@media only screen and (max-width: 600px)
{
    #login{
       display:block; 
    }

    #right{
        clip-path: none;
        width: 100%;
        height: 60%;
        display: flex;
        align-items: center;
        text-align: center;
        background-color: white;
        color: rgb(48, 125, 226);
        position: absolute;
        top: 30%;
        z-index: 1;
    }

    #right-content{
        width: 100%;
        position: unset;
        width: 100%;
        text-align: center;
    }

    i{
        font-size: 90px;
    }

    #right-content h1{
        font-size: 60px;
        margin-top: 20px;
        transition: 0.3s;
        border: 2px solid rgb(48, 125, 226);
    }

    #right-content h1:hover{
        background-color: rgb(48, 125, 226);
        color: white;
    }

    #right-content i:hover{
        color: rgb(116, 167, 233);
    }

    #left{
        float:none;
        box-sizing:border-box;
        width:100%;
        display:flex;
        height: 40%;
        clip-path: none;
        text-align: center;
        align-items: flex-end;
        padding-bottom: 20px;
        background-color: rgb(48, 125, 226);
        color: white;
        z-index: 1;
    }

    #left h1{
        color:white;
        align-items: bottom;
        text-align: center;
        position: unset;
        width: 100%;
    }

    #logo{
        position: absolute;
        height: 70px;
        width: 70px;
        top: 10%;
        left: 50%;
        transform: translatex(-50%);
    }
}

</style>
