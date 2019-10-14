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
    <form name="ask-question" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
      <input type="hidden" name="form-name" value="ask-question" />
      <div class="input-field">
        <label>
          Hvordan ville du gitt tilbakemelding?
          <textarea type="text" name="tilbakemelding"></textarea>
        </label>
      </div>
      <p>
        <label>
          Hva ville du lest mer om?
          <textarea type="text" name="mer"></textarea>
        </label>
      </p>
      <p>
        <Button class="button" :type="'submit'">Send inn</Button>
      </p>
    </form>
  </the-container>
</template>

<script>
import TheContainer from "../components/TheContainer";
import Button from "../components/Button";

export default {
  name: "issuedetail",
  components: {
    TheContainer,
    Button
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