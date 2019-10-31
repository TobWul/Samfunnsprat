<template>
  <div>
    <Scrim :show="show" @close="close()" />
    <transition name="slide">
      <div id="feedback" v-if="show">
        <p>Tommel opp eller ned gir en god indikator på hva flertallet ønsker, men det er argumentene som vinner saken.</p>
        <form @submit.prevent="submitFeedback()">
          <div class="input-field">
            <label for="text">Hva mener du om saken?</label>
            <textarea type="text" id="text" v-model="text"></textarea>
          </div>
          <button class="button" :type="'submit'">Send inn</button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import Scrim from './Scrim';
import Button from './Button';
import { mapActions } from 'vuex';
export default {
  name: 'Feedback',
  components: {
    Scrim,
    Button
  },
  props: ['show', 'issueId'],
  data() {
    return {
      text: ''
    };
  },
  methods: {
    ...mapActions(['sendFeedback']),
    submitFeedback: function() {
      console.log(this.text, this.issueId);
      this.sendFeedback({ issueId: this.issueId, feedback: this.text }).then(
        () => {
          this.close();
        }
      );
    },
    close: function() {
      this.$emit('close', true);
    }
  }
};
</script>

<style lang="scss" scoped>
#feedback {
  position: fixed;
  top: 2rem;
  left: 2rem;
  width: calc(100vw - 4rem);
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border-radius: $border-radius;
  padding: 2rem;
  z-index: 12;

  .input-field {
    margin-top: 4rem;
  }
  textarea {
    min-height: 10rem;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
  transform: translateY(-4rem);
  opacity: 0;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(0);
  opacity: 1;
}
</style>