import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbvue/build/css/mdb.css";
import Vue from "vue";
import App from "./App";
import axios from "axios";
import VueAxios from "vue-axios";

import Notify from "mdbvue/src/components/pro/Advanced/Notify.js";
import VueRouter from "vue-router";
import DashboardPlugin from "./material-dashboard";
import VueSession from "vue-session";

// Plugins

import Chartist from "chartist";

// router setup
import routes from "./routes/routes";
import store from "./store";
import firebase from "firebase/app";
import "firebase/auth";
// plugin setup
Vue.use(Notify);
Vue.use(VueRouter);
Vue.use(DashboardPlugin);
Vue.use(VueSession);
Vue.use(VueAxios, axios);

window.store = store;
const config = {
  apiKey: "AIzaSyCOHFA-dbwVN-aSZ85JCH5UOhXB1WCwISg",
  authDomain: "laostar-d11d9.firebaseapp.com",
  databaseURL: "https://laostar-d11d9.firebaseio.com",
  projectId: "laostar-d11d9",
  storageBucket: "",
  messagingSenderId: "746003081637",
  appId: "1:746003081637:web:b3744cc1b35048c050e04c"
};
firebase.initializeApp(config);
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  linkExactActiveClass: "nav-item active"
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //console.log(store.state.isLogged);
    if (store.state.isLogged || Vue.prototype.$session.get("isLogged")) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});
// global library setup
Object.defineProperty(Vue.prototype, "$Chartist", {
  get() {
    return this.$root.Chartist;
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
});
