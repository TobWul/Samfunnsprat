import db from '../../firebase';
import firebase from 'firebase';

const issuesRef = db.collection('issues');
const voteRef = db.collection('votes');

const state = {
  issues: [],
  currentIssue: {}
};
const getters = {
  issues: state => {
    return state.issues;
  },
  currentIssue: state => {
    return state.currentIssue;
  }
};
const mutations = {
  setIssues: (state, payload) => {
    state.issues = payload;
  },
  setCurrentIssue: (state, payload) => {
    state.currentIssue = payload;
  }
};
const actions = {
  getIssues: ({ commit }) => {
    issuesRef.get().then(querySnapshot => {
      commit(
        'setIssues',
        querySnapshot.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          };
        })
      );
    });
  },
  getIssueById: ({ state, commit }, id) => {
    issuesRef
      .doc(id)
      .get()
      .then(document => {
        if (document.id !== state.currentIssue.id) {
          voteRef
            .where('issue', '==', document.id)
            .get()
            .then(querySnapshot => {
              const issues = querySnapshot.docs.map(doc => doc.data());
              commit('setCurrentIssue', {
                ...document.data(),
                id: document.id,
                votes: issues
              });
            });
        }
      });
  },
  vote: ({ getters }, payload) => {
    voteRef
      .where('user', '==', getters.user.uid)
      .where('issue', '==', payload.id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length === 0) {
          voteRef.doc().set({
            upvote: payload.upvote,
            user: getters.user.uid,
            issue: payload.id
          });
        }
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
