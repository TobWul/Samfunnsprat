<template>
  <div>
    <Feedback :show="showFeedback" :issueId="currentIssue.id" @close="showFeedback=false" />
    <header>
      <back />
      <router-link v-if="user" :to="'/login'" class="login">
        <Icon :name="'user'" :size="18" />
        {{ user.displayName }}
      </router-link>
      <router-link v-if="!user" :to="'/login'" class="login">Logg inn</router-link>
      <h3>{{ currentIssue.title }}</h3>
      <p v-if="!currentIssue.pending">{{getDate(currentIssue.date)}}</p>
      <div v-if="currentIssue.pending">
        <Icon :name="'pending'" />Under behandling
      </div>
      <div v-else-if="currentIssue.approved" class="vedtatt">
        <Icon :name="'vedtatt'" />Vedtatt
      </div>
      <div v-else-if="!currentIssue.approved" class="nedstemt">
        <Icon :name="'close'" />Nedstemt
      </div>
    </header>
    <div class="votes">
      <div class="result">
        <p class="caption">Folkets mening</p>
        <div>
          For
          <strong>{{upvotes}}</strong>
        </div>
        <div>
          Mot
          <strong>{{downvotes}}</strong>
        </div>
      </div>
      <router-link
        :to="'/login'"
        class="voting button"
        v-if="currentIssue.pending && !user"
      >Logg inn for å stemme</router-link>
      <div class="voting" v-else-if="currentIssue.pending">
        <button
          :class="{selected: hasVoted && isUpvote}"
          @click="thumb({upvote: true, 'id': currentIssue.id})"
        >
          <Icon :name="'upvote'" :size="24" />
        </button>
        <button
          :class="{selected: hasVoted && !isUpvote}"
          @click="thumb({upvote: false, 'id': currentIssue.id})"
        >
          <Icon :name="'downvote'" :size="24" />
        </button>
      </div>
      <div class="voting" v-else>
        <p class="caption">Flertallet er</p>
        <span
          v-if="(currentIssue.approved && upvotes >= downvotes) || (!currentIssue.approved && upvotes < downvotes)"
        >Enig</span>
        <span class="disagree" v-else>Uenig</span>
      </div>
    </div>
    <the-container>
      <h3>Hva</h3>
      <p>{{ currentIssue.what }}</p>
      <br />
      <h3>Hvorfor</h3>
      <p>{{ currentIssue.why }}</p>
      <br />
      <h3>Hvordan</h3>
      <p>{{ currentIssue.how }}</p>
      <br />
      <br />
      <hr />Si din mening til ansvarlig i denne saken:
      <br />
      <br />
      <a
        :href="'mailto:oleanda@ntnu.no?subject=Sak fra svarig: ' + currentIssue.title"
        class="button"
        target="blank"
      >Send e-post til instituttleder</a>
    </the-container>
  </div>
</template>

<script>
import TheContainer from '../components/TheContainer';
import Button from '../components/Button';
import Back from '../components/Back';
import Icon from '../components/Icon';
import Feedback from '../components/Feedback';
import { mapGetters, mapActions } from 'vuex';
import firebase from 'firebase';

export default {
  name: 'issuedetail',
  components: {
    TheContainer,
    Button,
    Back,
    Icon,
    Feedback
  },
  data: function() {
    return {
      issue: {},
      isUpvote: false,
      showFeedback: false
    };
  },
  computed: {
    ...mapGetters(['currentIssue']),
    upvotes: function() {
      return this.currentIssue.votes.filter(vote => vote.upvote).length;
    },
    downvotes: function() {
      return this.currentIssue.votes.filter(vote => !vote.upvote).length;
    },
    user: () => {
      return firebase.auth().currentUser;
    },
    hasVoted: function() {
      if (this.user) {
        const votes = this.currentIssue.votes.filter(
          vote => this.user.uid === vote.user
        );
        this.isUpvote = votes.length > 0 ? votes[0].upvote : false;
        return votes.length === 1;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions(['getIssueById', 'vote']),
    getDate: issueDate => {
      issueDate = issueDate.toDate();
      return `${('0' + issueDate.getDate()).slice(-2)}.${(
        '0' +
        (issueDate.getMonth() + 1)
      ).slice(-2)}.${issueDate.getFullYear()}`;
    },
    thumb: function(payload) {
      this.vote(payload);
      this.showFeedback = true;
    }
  },
  created: function() {
    const issueId = this.$route.params.issue_id;
    this.getIssueById(issueId);
  }
};
</script>

<style lang="scss" scoped>
header {
  background: var(--primary-600);
  color: white;
  max-width: $max-width;
  margin: 0 auto;
  position: relative;

  a {
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.6rem;
  }

  div {
    margin-top: 1rem;
    display: flex;
    align-items: center;

    svg {
      margin-right: 1rem;
      stroke: color(warning, 300);
    }

    &.vedtatt svg {
      stroke: color(success, 300);
    }
    &.nedstemt svg {
      stroke: color(error, 300);
    }
  }
}

.login {
  display: flex;
  align-items: center;
  position: absolute;
  top: 2rem;
  right: 5%;
  color: white;

  svg {
    margin-right: 0.5rem;
  }
}

.result {
  div {
    text-transform: uppercase;
    color: var(--primary-700);
    display: inline-block;
    margin-right: 1.5rem;
    span {
      font-weight: bold;
    }
  }
}

.button {
  background: var(--primary-500);
  color: white;
  border-radius: 4px;
  max-width: 150px;
  padding: 1rem;
  text-align: center;
  line-height: 1.2em;
}

.votes {
  display: flex;
  justify-content: space-between;
  background: var(--primary-50);
  padding: 5% 5% 2rem;
  max-width: $max-width;
  margin: 0 auto;

  .voting {
    button {
      background-color: var(--primary-400);
      outline: 0;
      border: 0;
      border-radius: $border-radius;
      margin-left: 1rem;
      height: 48px;
      width: 48px;
      display: inline-flex;
      algin-items: center;
      justify-content: center;
      color: #fff;

      &.selected {
        background: var(--primary-800);
      }
    }
    span {
      font-weight: bold;
      font-size: 1.8rem;
      color: color(success, 500);

      &.disagree {
        color: color(error, 500);
      }
    }
  }
}

.container {
  padding-top: 4rem;
  background-color: white;
  p {
    max-width: 70ch;
  }

  form {
    margin-top: 4rem;
  }

  .button {
    margin-top: 2rem;
  }
}
</style>