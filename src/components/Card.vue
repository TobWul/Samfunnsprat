<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "card"
};
</script>

<style lang="scss" scoped>
.card {
  text-decoration: none;
  color: $text-color;
  box-shadow: $shadow;
  background: #fff;
  padding: 1rem 2rem;
  margin-bottom: 1rem;
}
</style>