import Vue from "vue";
import Vuex from "vuex";

// pathify config
import pathify from "./pathify"; // <-- note the ./ denoting a local file!
import { make } from "vuex-pathify";
const state = {
  isLogged: false,
  facebook: {
    id: "",
    fullname: ""
  }
};

const actions = make.actions(state);
const getters = make.getters(state);
Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [pathify.plugin],
  state,
  actions,
  getters
});
