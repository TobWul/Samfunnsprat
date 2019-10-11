import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as db from "./db.js";
export default new Vuex.Store({
  state: {
    issues: db.issues
  },
  getters: {
    issues: state => {
      return state.issues;
    },
    getIssueById: state => id => {
      return state.issues.find(issue => issue.id === id);
    }
  },
  mutations: {},
  actions: {}
});
