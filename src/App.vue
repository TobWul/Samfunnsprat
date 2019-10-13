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

Vue.use(VueAnalytics, {
  id: "UA-147736726-1"
});

export default {
  name: "App",
  components: {
    TheNavigation
  }
};
</script>

<style lang="scss">
@import "../src/scss/css-reset", "../src/scss/_typography", "../src/scss/global";
body {
  background-color: color(primary, 100);
}
</style>