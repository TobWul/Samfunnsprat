<template>
  <the-container>
    <back :color="'var(--primary-600)'"/>
    <div id="login">
      <template v-if="!user">
        <button class="login-button" @click="loginGoogle"><Icon :name="'social-google'" />Logg inn med Google</Button>
        <br />
        <button class="login-button" @click="loginFacebook"><Icon :name="'social-facebook'" />Logg inn med Facebook</Button>
        <br />
        <button class="login-button" @click="loginTwitter"><Icon :name="'social-twitter'" />Logg inn med Twitter</Button>
        <br />
        <button class="login-button" @click="loginEmail"><Icon :name="'email'" />Logg inn med e-post</button>
      </template>
      <button class="login-button" v-else @click="logout">Logg ut</Button>
    </div>
  </the-container>
</template>

<script>
import firebase from 'firebase';
import Button from '../components/Button';
import TheContainer from '../components/TheContainer';
import Back from '../components/Back';
import Icon from '../components/Icon';

export default {
  name: 'login',
  components: {
    Button,
    TheContainer,
    Back,
    Icon
  },
  computed: {
    user: () => {
      return firebase.auth().currentUser;
    }
  },
  methods: {
    loginGoogle: function() {
      const self = this;
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(() => {
          self.$router.push('/');
        })
        .catch(error => console.log(error));
    },
    loginFacebook: function() {
      const self = this;
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(() => {
          self.$router.push('/');
        })
        .catch(error => console.log(error));
    },
    loginTwitter: function() {
      console.log('Twitter login');
    },
    loginEmail: function() {
      console.log('Epost');
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  background: var(--primary-50);
}
.login-button {
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  margin: 0 auto;
  border: 1px solid var(--primary-300);
  border-radius: $border-radius;
  cursor: pointer;
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
  width: 80%;
  max-width: 400px;
  -webkit-appearance: none;
  background-color: white;

  svg {
    color: var(--primary-400);
    margin-right: 2rem;
  }
}
a {
  color: black;
  margin-bottom: 20%;
}
</style>