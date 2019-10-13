<template>
  <the-container class="home">
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
import Card from "../components/Card";
import TheContainer from "../components/TheContainer";

import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Card,
    TheContainer
  },
  computed: {
    ...mapGetters(["issues"])
  }
};
</script>
