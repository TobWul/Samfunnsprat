import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwMoVOyEL4Fi_PbtB6-1q2IcZrgKupRlU",
  authDomain: "folketinget-a44e5.firebaseapp.com",
  databaseURL: "https://folketinget-a44e5.firebaseio.com",
  projectId: "folketinget-a44e5",
  storageBucket: "folketinget-a44e5.appspot.com",
  messagingSenderId: "689399851882",
  appId: "1:689399851882:web:9d79ef59b8aba69e005313",
  measurementId: "G-J87F8B3WEY"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;