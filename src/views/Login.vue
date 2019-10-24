<template>
<the-container>
  <back />
  <div id="login">
    <template v-if="!user">
      <Button :onClick="loginGoogle">Logg inn med Google</Button>
      <br><br>
      <Button :onClick="loginFacebook">Logg inn med Facebook</Button>
    </template>
    <Button v-else :onClick="logout">Logg ut</Button>
  </div>
  </the-container>
</template>

<script>
import firebase from 'firebase';
import Button from '../components/Button';
import TheContainer from '../components/TheContainer';
import Back from '../components/Back';

export default {
  name: 'login',
  components: {
    Button,
    TheContainer,
    Back
  },
  computed: {
    user: () => {
      return firebase.auth().currentUser;
    }
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
          this.$router.replace('home');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
}
a {
  color: black;
  margin-bottom: 20%;
}
</style>