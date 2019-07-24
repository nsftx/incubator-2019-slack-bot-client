<template>
    <div class="tab">
        <div id="logo" class="tablinks"></div>

        <button class="active" @click="goToMessages">
            <v-icon color="white" style="margin-bottom: 10px">local_post_office</v-icon> <br>
            Messages
        </button>

        <button @click="goToSchedules">
            <v-icon color="white" style="margin-bottom: 10px">assignment_turned_in</v-icon> <br>
            Schedules
        </button>

        <button @click="goToTriggers">
            <v-icon color="white" style="margin-bottom: 10px">assistant</v-icon> <br>
            Triggers
        </button>
</div>
</template>

<script>

function changeAcitve(index){
  var activeClass = document.getElementsByTagName("button");
  activeClass[index].classList.add("active");
  
  for(var i = 0; i<activeClass.length; i++)
  {
    if(i != index)
      activeClass[i].classList.remove("active");
  }
}

export default {
    name: "navigation",
    methods: {
      goToMessages(){
        this.$router.push("/messages");
        changeAcitve(0);
      },
      goToSchedules(){
        this.$router.push("/schedules");
        changeAcitve(1);
      },
      goToTriggers(){
        this.$router.push("/triggers");
        changeAcitve(2);
      }
    }
}
</script>

<style>

#logo{
  margin-top: 10px;
  height: 50px;
  background-image: url("../assets/logo.png");
  background-position: center;
  margin-bottom: 10px;
}

.tab {
  text-align:center;
  float: left;
  background-color: #006BF5;
  width: 100%;
  height: 100vh;
}

.tab button {
  display: block;
  color: #fff;
  width: 100%;
  border: none;
  outline: none;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;
  height: 80px;
}

/* Change background color of buttons on hover */
.tab button:hover{
  background-color: rgb(45, 146, 247);
}

/* Create an active/current "tab button" class */
.active {
  background-color: rgb(45, 146, 247);
}

/* Style the tab content */
.tabcontent {
  float: left;
  width: 94%;
  border-left: none;
  height: 100%;
  padding: 13px;
}

li i{
          margin-left: 25px;
        }

        li .material-icons{
          font-size: 18px;
          color: gray;
          display: none;
        }

        li:hover .material-icons{
          display: inline;
          display: block;
        }

        .material-icons:hover{
          color: black;
          cursor: pointer;
        }

</style>
