<template>
  <div id="app">
    <router-view />
    <Subscribe />
  </div>
</template>

<script>
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import Subscribe from './components/Subscribe';
import setCustomColor from './methods/customColor';

export default {
  name: 'App',
  components: {
    Subscribe
  },
  mounted() {
    setCustomColor(null);
  }
};
</script>

<style lang="scss">
@import '../src/scss/css-reset', '../src/scss/_typography', '../src/scss/global',
  '../src/scss/input', '../src/scss/button';

body {
  background-color: $background-color;
  transition: background 200ms ease-in-out;
}
</style>