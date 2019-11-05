import firebase from 'firebase';
import db from '../../firebase';

const state = {
  user: {}
};

const getters = {
  user: state => {
    return state.user;
  },
  isPublisher: state => {
    return state.user.role ? state.user.role.includes('publisher') : false;
  }
};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  },
  updateUserSubscription: (state, subscribed) => {
    state.user.subscribed = subscribed;
  }
};

const actions = {
  updateUserInfo: ({ commit }) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const usersRef = db.collection('users').doc(user.uid);
      usersRef.get().then(docSnapshot => {
        if (!docSnapshot.exists) {
          usersRef.set({
            name: user.displayName,
            email: user.email,
            uid: user.uid
          }); // create the document
        }
        commit('setUser', docSnapshot.data());
      });
    } else {
      commit('setUser', null);
    }
  },
  signUpEmail: ({ commit }) => {
    const user = firebase.auth().currentUser;
    const usersRef = db.collection('users').doc(user.uid);
    usersRef.update({ subscribed: true }).then(() => {
      commit('updateUserSubscription', true);
    });
  },
  signOffEmail: ({ commit }) => {
    const user = firebase.auth().currentUser;
    const usersRef = db.collection('users').doc(user.uid);
    usersRef.update({ subscribed: false }).then(() => {
      commit('updateUserSubscription', false);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
