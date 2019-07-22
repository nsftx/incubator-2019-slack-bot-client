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

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
  {path: "/", component: messages, redirect: "/messages"},
  {
    path: "/messages", 
    //name: "messages",
    component: messages, 
    children: 
    [ 
      {
        path: "newMessage",
        component: formaM 
      },
      {
        path: "newTrigger",
        component: formaT
      },
      {
        path: "newSchedule",
        component: formaS
      }
    ] 
  },
  {path: "/schedules", component: schedules},
  {path: "/triggers", component: triggers},
  {path: "/formaS", component: formaS},
  {path: "/formaT", component: formaT},
  ],
  mode: "history"
});

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
