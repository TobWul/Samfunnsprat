<template>
  <the-container class="home">
    {{ user && user.displayName }}
    <h1>svarig</h1>
    <br />
    <router-link
      v-for="(issue, index) in issues"
      :to="{ name: 'issue', params: { issue_id: issue.id }}"
      :key="index"
    >
      <card>
        <h4>{{issue.title}}</h4>
        <p>{{ getDate(issue.date) }}</p>
        <Icon :name="'vedtatt'" :class="{ vedtatt: issue.approved }"/>
      </card>
    </router-link>
  </the-container>
</template>

<script>
// @ is an alias to /src
import Card from '../components/Card';
import TheContainer from '../components/TheContainer';
import Icon from '../components/Icon';
import firebase from 'firebase';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Card,
    TheContainer,
    Icon
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
    ...mapActions(['getIssues']),
    getDate: issueDate => {
      issueDate = issueDate.toDate();
      return `${issueDate.getDate()}.${('0' + (issueDate.getMonth() + 1)).slice(
        -2
      )}.${issueDate.getFullYear()}`;
    }
  },
  created() {
    this.getIssues();
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  color: color(primary, 600);
}
.card {
  padding-right: 6rem;
  svg {
    stroke: color(warning, 400);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2rem;

    &.vedtatt {
      stroke: color(success, 400);
    }
  }

}
</style>
