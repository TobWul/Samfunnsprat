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
    <iframe
      src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FStudenttinget%2Fposts%2F10162370772740607&width=500"
      width="500"
      height="626"
      style="border:none;overflow:hidden"
      scrolling="no"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
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