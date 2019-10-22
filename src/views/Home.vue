<template>
  <the-container class="home">
    {{ user && user.displayName }}
    <router-link
      v-for="(issue, index) in issues"
      :to="{ name: 'issue', params: { issue_id: issue.id }}"
      :key="index"
    >
      <card>
        <h3>{{issue.title}}</h3>
      </card>
    </router-link>
  </the-container>
</template>

<script>
// @ is an alias to /src
import Card from '../components/Card';
import TheContainer from '../components/TheContainer';
import firebase from 'firebase';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Card,
    TheContainer
  },
  data: function() {
    return {
      user: firebase.auth().currentUser
    };
  },
  computed: {
    ...mapGetters(['issues'])
  },
  methods: {
    ...mapActions(['getIssues'])
  },
  created() {
    this.getIssues();
  }
};
</script>
