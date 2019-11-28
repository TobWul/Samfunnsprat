import firebase from 'firebase/app';
import 'firebase/firestore';

import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.enablePersistence().catch(function(err) {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});
// Subsequent queries will use persistence, if it was enabled successfully

export default db;
