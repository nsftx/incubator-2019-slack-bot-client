import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from "vue-router"
import App from './App.vue'
import messages from "./components/Messages.vue"
import schedules from "./components/Schedules.vue"
import triggers from "./components/Triggers.vue"
import FormMessage from "./components/FormMessage.vue"
import formaS from "./components/FormSchedule.vue"
import FormTrigger from "./components/FormTrigger.vue"
import FormUser from "./components/FormUser.vue"
import user from "./components/Users.vue"
import login from "./components/Login.vue"
import Dashboard from "./components/Dashboard.vue"
import Profil from "./components/Profile.vue"
import settings from "./components/Settings.vue"
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.vue"
import Error from "./components/Error.vue"
import poll from "./components/poll.vue"
import FormPoll from "./components/FormPoll.vue"
import Activity from "./components/Activity.vue"
import viewPoll from "./components/viewPoll.vue"

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
            path: "poll",
            component: poll,
            children:
              [
                {
                  path: "newPoll",
                  component: FormPoll
                },
                {
                  path: "viewPoll/:id",
                  component: viewPoll
                }
              ]
          },
          {
            path: "messages",
            component: messages,
            children:
              [
                {
                  path: "newMessage",
                  component: FormMessage
                },
                {
                  path: "newMessage/:id",
                  component: FormMessage
                },
                {
                  path: "newTrigger/:id",
                  component: FormTrigger
                },
                {
                  path: "newSchedule/:id",
                  component: formaS
                },
                {
                  path: "updateMessage/:id",
                  component: FormMessage
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
                  component: FormTrigger
                },
                {
                  path: "updateTrigger/:id",
                  component: FormTrigger
                }
              ]
          },
          {
            path: "user",
            component: user,
            children:
              [
                {
                  path: "newUser",
                  component: FormUser
                }
              ]
          },
          {
            path: "activity",
            component: Activity,
          },
          {
            path: "/settings",
            component: settings
          },
          {
            path: "/profile",
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
