<template>
  <div id="app">
    <the-navigation />
    <router-view />
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation";

import Vue from "vue";
import VueAnalytics from "vue-analytics";

export default {
  name: "App",
  components: {
    TheNavigation
  }
};
</script>

<style lang="scss">
@import "../src/scss/css-reset", "../src/scss/_typography", "../src/scss/global",
  "../src/scss/input";
body {
  background-color: color(primary, 100);
}
</style>