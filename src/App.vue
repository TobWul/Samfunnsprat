<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import Vue from 'vue';
import VueAnalytics from 'vue-analytics';

export default {
  name: 'App',
  components: {
  }
};
</script>

<style lang="scss">
@import '../src/scss/css-reset', '../src/scss/_typography', '../src/scss/global',
  '../src/scss/input';
body {
  background-color: color(gray, 100);
}
</style>