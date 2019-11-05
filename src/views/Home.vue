<template>
  <the-container class="home">
    <router-link v-if="isPublisher" :to="'/ny-sak'" class="icon-link"><Icon :name="'new_issue'"/>Ny sak</router-link>
    <router-link
      v-if="!user"
      :to="'/login'"
      style="text-align: right; display: block; color: #000"
    >Logg inn</router-link>
    <h1>borgersak</h1>
    <br />
    <p>Under behandling</p>
    <router-link
      v-for="(issue, index) in pendingIssues"
      :to="{ name: 'issue', params: { issue_id: issue.id }}"
      :key="index"
    >
      <card>
        <h4>{{issue.title}}</h4>
        <Icon v-if="issue.pending" :name="'pending'" :class="{ pending: issue.pending }" />
        <Icon v-else-if="issue.approved" :name="'vedtatt'" :class="{ vedtatt: issue.approved }" />
        <Icon v-else-if="!issue.approved" :name="'close'" />
      </card>
    </router-link>
    <p>Ferdigbehandlede saker</p>
    <router-link
      v-for="(issue, index) in completedIssues"
      :to="{ name: 'issue', params: { issue_id: issue.id }}"
      :key="index + pendingIssues.length"
    >
      <card>
        <h4>{{issue.title}}</h4>
        <p>{{ getDate(issue.date) }}</p>
        <Icon v-if="issue.pending" :name="'pending'" :class="{ pending: issue.pending }" />
        <Icon v-else-if="issue.approved" :name="'vedtatt'" :class="{ vedtatt: issue.approved }" />
        <Icon v-else-if="!issue.approved" :name="'close'" />
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
  computed: {
    ...mapGetters(['issues', 'user', 'isPublisher']),
    pendingIssues: function() {
      return this.issues.filter(issue => issue.pending);
    },
    completedIssues: function() {
      return this.issues.filter(issue => !issue.pending);
    }
  },
  methods: {
    ...mapActions(['getIssues', 'signUpEmail', 'signOffEmail']),
    getDate: issueDate => {
      issueDate = issueDate.toDate();
      return `${('0' + issueDate.getDate()).slice(-2)}.${(
        '0' +
        (issueDate.getMonth() + 1)
      ).slice(-2)}.${issueDate.getFullYear()}`;
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
  font-size: 3.2rem;
}
.card {
  padding-right: 6rem;
  svg {
    stroke: color(error, 400);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2rem;

    &.pending {
      stroke: color(warning, 400);
    }

    &.vedtatt {
      stroke: color(success, 400);
    }
  }
}
</style>
