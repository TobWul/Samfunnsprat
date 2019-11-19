<template>
  <the-container class="home">
    <div id="logo">
      <img
        :src="'images/kommuner/' + kommuner[currentKommuneIndex].img"
        alt="levanger"
        id="kommune-emblem"
        @click="nextKommune"
      />
      <h1>{{kommuner[currentKommuneIndex].name}}</h1>
    </div>
    <router-link v-if="isPublisher" :to="'/ny-sak'" class="icon-link">
      <Icon :name="'new_issue'" />Ny sak
    </router-link>
    <br />
    <router-link v-if="!user" :to="'/login'" class="login">Logg inn</router-link>
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
import ColorThief from 'colorthief';

import { mapGetters, mapActions } from 'vuex';
import setCustomColor from '../methods/customColor';
import { db_kommuner } from '../db';

export default {
  name: 'Home',
  components: {
    Card,
    TheContainer,
    Icon
  },
  data() {
    return {
      kommuner: db_kommuner,
      currentKommuneIndex: 0
    };
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
    },
    nextKommune: function() {
      this.currentKommuneIndex < this.kommuner.length - 1
        ? this.currentKommuneIndex++
        : (this.currentKommuneIndex = 0);
      const img = document.getElementById('kommune-emblem');
      setCustomColor(img);
    }
  },
  created() {
    this.getIssues();
  },
  mounted() {
    const img = document.getElementById('kommune-emblem');
    setCustomColor(img);
  }
};
</script>

<style lang="scss" scoped>
#logo {
  display: flex;
  align-items: center;
  text-align: left;
  margin-bottom: 5rem;
  h1 {
    color: var(--primary-600);
    display: inline;
    font-size: 3.2rem;
  }
  #kommune-emblem {
    width: 50px;
    margin-right: 1rem;
  }
}
.login {
  position: absolute;
  top: 5%;
  right: 5%;
  color: var(--primary-600);
}
.color-preview {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  display: inline-block;
  background: black;
  margin-right: 2px;
  box-shadow: $shadow;
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
