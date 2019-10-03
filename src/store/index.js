import Vue from "vue";
import Vuex from "vuex";

// pathify config
import pathify from "./pathify"; // <-- note the ./ denoting a local file!
import { make } from "vuex-pathify";
const state = {
  isLogged: false,
  facebook: false
};

const actions = make.actions(state);
const mutations = make.mutations(state);
const getters = make.getters(state);
Vue.use(Vuex);
const store = new Vuex.Store({
  plugins: [pathify.plugin],
  state,
  mutations,
  actions,
  getters
});
export default store;
window.store = store;
