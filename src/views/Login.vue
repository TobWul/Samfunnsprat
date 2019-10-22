<template>
  <div id="login">
    <Button :onClick="loginGoogle">Logg inn med Google</Button>
    <Button :onClick="loginFacebook">Logg inn med Facebook</Button>
    <Button :onClick="logout">Logg ut</Button>
  </div>
</template>

<script>
import firebase from 'firebase';
import Button from '../components/Button';
export default {
  name: 'login',
  components: {
    Button
  },
  methods: {
    loginSuccess: result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      this.$router.replace('home');
    },
    loginError: error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    },
    loginGoogle: () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(loginSuccess(result))
        .catch(loginError(error));
    },
    loginFacebook: () => {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(loginSuccess(result))
        .catch(loginError(error));
    },
    logout: () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login');
        });
    }
  }
};
</script>

<style>
</style>