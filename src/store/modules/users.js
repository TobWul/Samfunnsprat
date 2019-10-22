import firebase from 'firebase';
import db from '../../firebase';

const state = {
  user: {}
};

const getters = {
  user: state => {
    return state.user;
  }
};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  }
};

const actions = {
  updateUserInfo: ({ commit }) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const usersRef = db.collection('users').doc(user.uid);
      commit('setUser', user);
      usersRef.get().then(docSnapshot => {
        if (docSnapshot.exists) {
          usersRef.onSnapshot(doc => {
            // do stuff with the data
          });
        } else {
          usersRef.set({
            name: user.displayName,
            email: user.email
          }); // create the document
        }
      });
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
