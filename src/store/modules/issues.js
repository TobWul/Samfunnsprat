import db from '../../firebase';
import firebase from 'firebase';

const issuesRef = db.collection('issues');
const voteRef = db.collection('votes');

const isPublisher = roles => {
  return roles.includes('publisher');
};

const isEditor = roles => {
  return roles.inclues('editor');
};

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
    issuesRef
      .orderBy('date', 'desc')
      .get()
      .then(querySnapshot => {
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
    commit('setCurrentIssue', {});
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
  newIssue: ({ commit, state }, issue) => {
    if (state.getters.isPublisher) {
      const newIssue = {
        title: issue.title,
        what: issue.what,
        why: issue.why,
        how: issue.how,
        date: issue.date,
        approved: issue.approved,
        pending: issue.pending
      };
      issuesRef
        .doc(issue.title)
        .set(newIssue)
        .then(() => {
          commit('setIssues', [...state.issues, newIssue]);
        });
    } else {
      console.error('No permission');
    }
  },
  vote: ({ commit, getters }, payload) => {
    const userId = firebase.auth().currentUser.uid;
    voteRef
      .where('user', '==', userId)
      .where('issue', '==', payload.id)
      .get()
      .then(querySnapshot => {
        const newVote = {
          upvote: payload.upvote,
          user: userId,
          issue: payload.id
        };
        if (querySnapshot.docs.length === 0) {
          voteRef
            .doc()
            .set(newVote)
            .then(() => {
              let issue = getters.currentIssue;
              issue.votes.push(newVote);
              commit('setCurrentIssue', issue);
            });
        } else if (querySnapshot.docs[0].data().upvote !== payload.upvote) {
          const voteId = querySnapshot.docs[0].id;
          voteRef
            .doc(voteId)
            .update({ upvote: payload.upvote })
            .then(() => {
              let issue = getters.currentIssue;
              issue.votes = issue.votes.map(vote => {
                if (vote.user === newVote.user) return newVote;
                else return vote;
              });
              commit('setCurrentIssue', issue);
            });
        }
      });
  },
  sendFeedback: ({ commit }, payload) => {
    db.collection('issues')
      .doc(payload.issueId)
      .update({
        feedback: firebase.firestore.FieldValue.arrayUnion(payload.feedback)
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
