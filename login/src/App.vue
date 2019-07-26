<template>
  <div id="app">
   
        <div class="app-top-box"></div>
          <!--<AppHeader authenticated={this.$data.authenticated} onLogout={this.handleLogout} />
        </div>
        <div class="app-body">
          <Switch>
            <Route exact path="/" component={Home}></Route>           
            <PrivateRoute path="/profile" authenticated={this.$data.authenticated} currentUser={this.$data.currentUser} component={Profile}></PrivateRoute>
            <Route path="/login" render={props => <Login authenticated={this.$data.authenticated} {...props} />}></Route>
            <Route path="/signup" render={props => <Signup authenticated={this.$data.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert stack={{
        limit: 3
      }} timeout={3000} position='top-right' effect='slide' offset={65} /> -->
     
    <!-- 
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
    <router-view></router-view>
  </div>

</template>

<script>
import login from "./components/login.vue";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.vue";

export default {
  name: 'app',
  components: {
    login,
    OAuth2RedirectHandler
  }
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0px;
}

body, html{
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

</style>