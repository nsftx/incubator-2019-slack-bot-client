<template>
    <div id="app">
     <dashboard />
    </div>
</template>

<script>
import dashboard from './components/dashboard.vue'

export default {
  name: 'app',
  components: {
    dashboard
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
}

#app {font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>

