<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'card'
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  padding: 2rem;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(14, 66, 66, 0.1);
  text-decoration: none;
  color: color(primary, 600);
  width: 100%;
  display: block;
  margin-bottom: 2rem;
}
</style>