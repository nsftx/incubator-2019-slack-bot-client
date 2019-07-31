<template>
    <div class="tab">

      <div id="logo" class="tablinks"></div>

      <router-link to="/messages" class="router-link">
        <button class="active">
          <v-icon color="white" style="margin-bottom: 10px">local_post_office</v-icon> <br> Messages
        </button>
      </router-link>

      <router-link to="/schedules" class="router-link">
        <button>
          <v-icon color="white" style="margin-bottom: 10px">assignment_turned_in</v-icon> <br> Schedules
        </button>
      </router-link>

      <router-link to="/triggers" class="router-link">
        <button>
          <v-icon color="white" style="margin-bottom: 10px">assistant</v-icon> <br> Triggers
        </button>
      </router-link>

      <router-link to="/user" class="router-link">
        <button>
          <v-icon color="white" size="32" style="margin-bottom: 10px">person</v-icon> <br> User
        </button>
      </router-link>

    </div>
</template>

<script>

export default {
    name: "navigation",
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
a.router-link.router-link-exact-active.router-link-active button{
  background-color: rgb(45, 146, 247);
}

.router-link.router-link-active button{
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

.router-link{
  text-decoration: none;
}

@media only screen and ( max-width: 1300px )
{
  .tab{
    background-color: red;
    height: 10vh;
    display: flex;
    align-items: center;
  }

  #logo{
    width: 50px;
  }
}

</style>
