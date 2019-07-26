<template>
    <div id="app">

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
import navigation from "./components/navigation.vue"

export default {
  name: 'app',
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

<style>

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
  width: 92%;
  height: 7vh;
  background-color: white;
  float: left;
  z-index: 2;
  position: absolute;
  border-top: 2px solid grey;
  margin: 0px 20px;
  bottom: 0px;
}

</style>

