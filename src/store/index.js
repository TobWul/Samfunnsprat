import Vue from 'vue';
import Vuex from 'vuex';

import issues from './modules/issues';
import users from './modules/users';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    issues,
    users
  }
});

export default store;
