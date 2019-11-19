<template>
  <!-- Subscribe to email -->
  <transition name="slide">
    <div class="subscribe" @click="email(!user.subscribed)" v-if="user && !user.subscribed">
      <span>Jeg vil bli oppdatert på nye saker på mail</span>
      <Icon :size="18" :name="user.subscribed ? 'checkbox_check' : 'checkbox_uncheck'" />
    </div>
  </transition>
  <!-- / -->
</template>

<script>
import Icon from './Icon';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Subscribe',
  components: {
    Icon
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['signUpEmail', 'signOffEmail']),
    email: function(signUp) {
      if (signUp) this.signUpEmail();
      else this.signOffEmail();
    }
  }
};
</script>

<style lang="scss" scoped>
.subscribe {
  background: var(--primary-500);
  color: color(gray, 100);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem 3rem;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;
  svg {
    .rect {
      fill: white !important;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 200ms ease-in-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}
</style>