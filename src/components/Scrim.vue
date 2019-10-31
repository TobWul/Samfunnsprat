<template>
  <transition name="fade">
    <div @click="$emit('close', true)" class="scrim" v-if="show"></div>
  </transition>
</template>

<script>
export default {
  name: 'Scrim',
  props: ['show']
};
</script>

<style lang="scss" scoped>
.scrim {
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(14, 66, 66);
  opacity: 0.5;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>