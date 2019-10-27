<template>
  <the-container>
    <back />
    <div id="login">
      <template v-if="!user">
        <Button :onClick="loginGoogle">Logg inn med Google</Button>
        <br />
        <br />
        <!-- <Button :onClick="loginFacebook">Logg inn med Facebook</Button> -->
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
}
a {
  color: black;
  margin-bottom: 20%;
}
</style>