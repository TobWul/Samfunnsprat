<template>
  <the-container id="new-tem">
    <Back :color="'#000'" />
    <div class="input-field">
      <label for="title">Tittel</label>
      <input type="text" id="title" required v-model="issue.title" />
    </div>
    <div class="input-field">
      <label for="what">Hva</label>
      <textarea type="text" id="what" required v-model="issue.what"></textarea>
    </div>
    <div class="input-field">
      <label for="why">Hvorfor</label>
      <textarea type="text" id="why" required v-model="issue.why"></textarea>
    </div>
    <div class="input-field">
      <label for="how">Hvordan</label>
      <textarea type="text" id="how" required v-model="issue.how"></textarea>
    </div>
    <div class="input-field">
      <label for="date">Dato</label>
      <input type="date" id="date" required v-model="issue.date" />
    </div>
    <br />
    <div class="input-field">
      <label for="pending">Under behandling</label>
      <input type="checkbox" id="pending" required v-model="issue.pending" />
    </div>
    <div v-if="!issue.pending" class="input-field">
      <label for="approved">Godkjent</label>
      <input
        name="approved"
        type="radio"
        id="approved"
        value="true"
        required
        v-model="issue.approved"
      />
    </div>
    <div v-if="!issue.pending" class="input-field">
      <label for="disapproved">Nedstemt</label>
      <input
        name="approved"
        type="radio"
        id="disapproved"
        value="false"
        required
        v-model="issue.approved"
      />
    </div>
    <br />
    <Button :onClick="createIssue" :type="'submit'">Opprett sak</Button>
  </the-container>
</template>

<script>
import TheContainer from '../components/TheContainer';
import Button from '../components/Button';
import Back from '../components/Back';
import { mapActions } from 'vuex';
export default {
  name: 'NewIssue',
  components: {
    TheContainer,
    Button,
    Back
  },
  data() {
    return {
      issue: {
        title: null,
        what: null,
        why: null,
        how: null,
        date: null,
        approved: null,
        pending: true
      }
    };
  },
  methods: {
    ...mapActions(['newIssue']),
    createIssue: function(e) {
      e.preventDefault;
      //   console.log(this.issue);
      this.issue.approved = this.issue.approved === 'true' ? true : false;
      this.issue.date = new Date(this.issue.date).toISOString();
      this.newIssue(this.issue).then(() => {
        this.$router.push('/');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background: white;
}
input,
textarea {
  background: color(gray, 100) !important;
}
</style>