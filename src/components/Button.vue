<template>
  <button @click="onClick" class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
};
</script>

<style>
</style>