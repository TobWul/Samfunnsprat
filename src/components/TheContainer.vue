<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 5% 5% 20%;
  position: relative;
  max-width: $max-width;
  margin: 0 auto;
}
</style>