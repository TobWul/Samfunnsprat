<template>
  <div id="nav">
    <router-link to="/">Home</router-link>|
  </div>
</template>

<script>
export default {
  name: 'TheNavigation'
};
</script>

<style lang="scss" scoped>
#nav {
  a {
    color: var(--primary-800);
  }
}
</style>>