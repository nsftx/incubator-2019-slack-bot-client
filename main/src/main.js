import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from "vue-router"
import App from './App.vue'
import messages from "./components/messages.vue"
import schedules from "./components/schedules.vue"
import triggers from "./components/triggers.vue"
import formaM from "./components/formaM.vue"
import formaS from "./components/formaS.vue"
import formaT from "./components/formaT.vue"
import user from "./components/user.vue"

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
  {path: "/", component: messages, redirect: "/messages"},

  {
    path: "/messages", 
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
    path: "/schedules", 
    component: schedules,

    children: 
    [
      {
        path: "newSchedule",
        component: formaS
      }
    ]
  },

  {
    path: "/triggers", 
    component: triggers,
    children: 
    [
      {
        path: "newTrigger",
        component: formaT
      }
    ]
  },

  {
    path: "/user",
    component: user
  }
  ],
  mode: "history"
});

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
