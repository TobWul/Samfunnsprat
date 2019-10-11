<template>
  <the-container id="issue-detail">
    <h1>{{ issue.title }}</h1>
    <h3>Hva</h3>
    <p>{{ issue.hva }}</p>
    <br />
    <h3>Hvorfor</h3>
    <p>{{ issue.hvorfor }}</p>
    <br />
    <h3>Hvordan</h3>
    <p>{{ issue.hvordan }}</p>
    <Tweet id="1182584398459355138"></Tweet>
  </the-container>
</template>

<script>
import TheContainer from "../components/TheContainer";
import { Tweet } from "vue-tweet-embed";
export default {
  name: "issuedetail",
  components: {
    TheContainer,
    Tweet
  },
  data: function() {
    return {
      issue: {}
    };
  },
  created: function() {
    const issueId = parseInt(this.$route.params.issue_id);
    const issue = this.$store.getters.getIssueById(issueId);
    this.issue = issue;
  }
};
</script>

<style>
</style>