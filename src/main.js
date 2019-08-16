import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from "vue-router"
import App from './App.vue'
import messages from "./components/Messages.vue"
import schedules from "./components/Schedules.vue"
import triggers from "./components/Triggers.vue"
import formaM from "./components/FormMessage.vue"
import formaS from "./components/FormSchedule.vue"
import formaT from "./components/FormTrigger.vue"
import formaU from "./components/FormUser.vue"
import user from "./components/Users.vue"
import login from "./components/Login.vue"
import Dashboard from "./components/Dashboard.vue"
import Profil from "./components/Profile.vue"
import settings from "./components/Settings.vue"
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.vue"
import Error from "./components/Error.vue"

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
  {
    path: "/",
    component: login,
    redirect: "/login"
  },
  {
      path: "/login",
      component: login
  },
  {
  path: "/oauth2/redirect",
  component: OAuth2RedirectHandler
  },
  {
    path: "/error",
    component: Error
    
  },
  {
    path: "/dashboard",
    component: Dashboard,
    children:
    [
      {
        path: "messages", 
        component: messages,
        children:
        [
          {
            path: "newMessage",
            component: formaM 
          },
          {
            path: "newMessage/:id",
            component: formaM
          },
          {
            path: "newTrigger/:id",
            component: formaT
          },
          {
            path: "newSchedule/:id",
            component: formaS
          },
          {
            path: "updateMessage/:id",
            component: formaM
          }
        ]
      },
      {
        path: "schedules",
        component: schedules,
        children:
        [
          {
            path: "newSchedule",
            component: formaS
          },
          {
            path: "updateSchedule/:id",
            component: formaS
          }
        ]
      },
      {
        path: "triggers",
        component: triggers,
        children:
        [
          {
            path: "newTrigger",
            component: formaT
          },
          {
            path: "updateTrigger/:id",
            component: formaT
          }
        ]
      },
      {
        path: "user",
        component: user,
        children:
        [
          {
            path:"newUser",
            component: formaU
          },
          {
            path: "updateUser/:id",
            component: formaU
          }
        ]
      },
      {
        path:"/settings",
        component: settings
      },
      {path: "/profile",
      component: Profil
    },
    ]
  },
  ],
  mode: "history"
});

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
