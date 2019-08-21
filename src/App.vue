<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      rowSizesValue: [5, 10, 20]
    };
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0px;
}

*:focus {
  outline: none;
}

html,
body {
  height: 100%;
  /*background-color: #F1F1F1;*/
  background-color: white;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#footer {
  background-color: white;
  z-index: 2;
  border-top: 2px solid grey;
  bottom: 0px;
}
</style>