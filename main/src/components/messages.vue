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
          
        <li>
            <div class='linear2'></div>
         <div class='linear1'></div>
            <div class='column1 column'><p>The Emerald Buddha</p> </div> <div class='column2 column'> <p>Your cheap internet-based banner advertising will become one of the sought for ads there are. Today, the world of Internet advertising is rapidly evolving beyond banner ads and intrusive pop-ups. Bayles A common medium for advertising on the Internet is the use of banner ads. Since the dawn of the internet, Banner Ads have been one of the most reliable forms of web advertising.   These internet banners advertising may come cheap</p></div>
        <div class='column3 column'> <p>26 Sep 2018</p></div>
        <div class='column4 column'> <i class='material-icons' @click="showScheduleForm">assignment_turned_in</i> 
        <i class='material-icons' @click="showTriggerForm">assistant</i> </div>
        </li>

        <li>
        <div class='linear2'></div>
        <div class='linear1'></div>
            <div class='column1 column'><p>The Emerald Buddha</p> </div> <div class='column2 column'> <p>Your cheap internet-based banner advertising will become one of the sought for ads there are. Today, the world of Internet advertising is rapidly evolving beyond banner ads and intrusive pop-ups. Bayles A common medium for advertising on the Internet is the use of banner ads. Since the dawn of the internet, Banner Ads have been one of the most reliable forms of web advertising.   These internet banners advertising may come cheap</p></div>
        <div class='column3 column'> 
            <p>26 Sep 2018</p></div>
        <div class='column4 column'> 
            <i class='material-icons'>assignment_turned_in</i> 
            <i class='material-icons'>assistant</i> </div>
        </li>

        <li>
            <div class='linear2'></div>
            <div class='linear1'></div>
            <div class='column1 column'><p>The Emerald Buddha</p> </div> <div class='column2 column'> <p>Your cheap internet-based banner advertising will become one of the sought for ads there are. Today, the world of Internet advertising is rapidly evolving beyond banner ads and intrusive pop-ups. Bayles A common medium for advertising on the Internet is the use of banner ads. Since the dawn of the internet, Banner Ads have been one of the most reliable forms of web advertising.   These internet banners advertising may come cheap</p></div>
        <div class='column3 column'> <p>26 Sep 2018</p></div>
        <div class='column4 column'> <i class='material-icons'>assignment_turned_in</i> 
        <i class='material-icons'>assistant</i> </div>
        </li>
    
      </ul>

<button @click="showMessageForm" id="btn"> + </button>
</div>

</template>


<script>

export default {
    name: "messages",
    methods: {
        showMessageForm(){
            this.$router.push("/messages/newMessage");
        },
        showTriggerForm(){
            this.$router.push("/messages/newTrigger");
        },
        showScheduleForm(){
            this.$router.push("/messages/newSchedule");
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
            height: 50px;
            width: 100%;
            background-color: white;
            border: 0.5px solid lightgray;
            overflow: hidden;
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
        }

        .column1{
            width: 13%;
        }

        .column2{
            width: 35%;
        }

        .column3{
            width: 7%;
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
            width: 40px;
            height: 50px;
            position: absolute;
            left: 18%;
        }

        .linear2{
            background-image: linear-gradient(90deg, rgba(236, 236, 236, 0) 0%, white 100%);
            width: 40px;
            height: 50px;
            z-index: 5;
            position: absolute;
            left: 49.5%;
        }

#btn {
    float:right;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    font-size: 30px;
    position: absolute;
    bottom: 60px;
    right: 60px;
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

<style scoped>
  
</style>