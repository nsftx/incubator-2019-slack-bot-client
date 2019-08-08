<template>
    <div id="Dashboard">

     <div id="nav-bar">
       <navigation />
    </div>

    <div id="dashboard">
        <div id="table">
          <router-view></router-view>
        </div>
    </div>

    </div>
</template>

<script>
import navigation from "./navigation.vue"

export default {
  name: 'Dashboard',
  components: {
    navigation,
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style scoped>

*{
  box-sizing: border-box;
  margin: 0px;
}

html, body{
  height: 100%;
  background-color: #F1F1F1;
}

#app {font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#nav-bar{
  height: 100%;
  width: 6%;
  float: left;
}

#dashboard{
  width: 94%;
  height: 100%;
  float: left;
}

#table{
  height: 90vh;
}

#footer{
  background-color: white;
  z-index: 2;
  border-top: 2px solid grey;
  bottom: 0px;
}
</style>