<template>
  <div>
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
      <div class="voting" v-if="currentIssue.pending">
        <button
          :class="{selected: hasVoted && isUpvote}"
          @click="vote({upvote: true, 'id': currentIssue.id})"
        >
          <Icon :name="'upvote'" :size="24" />
        </button>
        <button
          :class="{selected: hasVoted && !isUpvote}"
          @click="vote({upvote: false, 'id': currentIssue.id})"
        >
          <Icon :name="'downvote'" :size="24" />
        </button>
      </div>
      <div class="voting" v-else>
        <p class="caption">Flertallet er</p>
        <span
          v-if="(currentIssue.approved && upvotes > downvotes) || (!currentIssue.approved && upvotes < downvotes)"
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
    </the-container>
  </div>
</template>

<script>
import TheContainer from '../components/TheContainer';
import Button from '../components/Button';
import Back from '../components/Back';
import Icon from '../components/Icon';
import { mapGetters, mapActions } from 'vuex';
import firebase from 'firebase';

export default {
  name: 'issuedetail',
  components: {
    TheContainer,
    Button,
    Back,
    Icon
  },
  data: function() {
    return {
      issue: {},
      isUpvote: false
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
        this.isUpvote = votes[0].upvote;
        return votes.length === 1;
      }
    }
  },
  methods: {
    ...mapActions(['getIssueById', 'vote']),
    getDate: issueDate => {
      issueDate = issueDate.toDate();
      return `${issueDate.getDate()}.${('0' + (issueDate.getMonth() + 1)).slice(
        -2
      )}.${issueDate.getFullYear()}`;
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
  background: color(primary, 500);
  color: white;

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
    color: color(primary, 700);
    display: inline-block;
    margin-right: 1.5rem;
    span {
      font-weight: bold;
    }
  }
}

.votes {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
  background: color(gray, 200);
  padding: 5% 5% 2rem;

  .voting {
    button {
      background-color: color(primary, 400);
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
        background: color(primary, 800);
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