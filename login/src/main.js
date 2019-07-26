import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import EvoMene from "./components/EvoMene.vue"
import login from "./components/login.vue"
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.vue";
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {path: "/", component: login},
    {path: "/login", component: login},
    {path: "/profile", component: EvoMene},
    {path: "/oauth2/redirect", component: OAuth2RedirectHandler},
  ],
  mode:"history"
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
