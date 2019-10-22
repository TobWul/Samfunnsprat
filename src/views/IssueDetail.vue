<template>
  <the-container id="issue-detail">
    <div class="votes">
      <div>{{currentIssue.votes.filter((vote) => vote.upvote).length}}</div>
      <div>{{currentIssue.votes.filter((vote) => !vote.upvote).length}}</div>
    </div>
    <h1>{{ currentIssue.title }}</h1>
    <h3>Hva</h3>
    <p>{{ currentIssue.what }}</p>
    <br />
    <h3>Hvorfor</h3>
    <p>{{ currentIssue.why }}</p>
    <br />
    <h3>Hvordan</h3>
    <p>{{ currentIssue.how }}</p>
    <button @click="vote({upvote: true, 'id': currentIssue.id})">👍</button>
    <button @click="vote({upvote: false, 'id': currentIssue.id})">👎</button>
  </the-container>
</template>

<script>
import TheContainer from '../components/TheContainer';
import Button from '../components/Button';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'issuedetail',
  components: {
    TheContainer,
    Button
  },
  data: function() {
    return {
      issue: {}
    };
  },
  computed: {
    ...mapGetters(['currentIssue'])
  },
  methods: {
    ...mapActions(['getIssueById', 'vote'])
  },
  created: function() {
    const issueId = this.$route.params.issue_id;
    this.getIssueById(issueId);
  }
};
</script>

<style>
</style>