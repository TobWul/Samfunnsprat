<template>
  <div>
    <h1>404</h1>
    <p>
      Gå tilbake:
      <router-link :to="'/'">Hjem</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound'
};
</script>

<style>
</style>