<template>
  <button @click="onClick" class="button" :type="buttonType">
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
    },
    buttonType: {
      type: String,
      required: false,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  padding: 1rem 2rem;
  background: color(primary, 600);
  color: white;
  border: none;
  -webkit-appearance: none;
  border-radius: $border-radius;
  font-size: 1.6rem;
  cursor: pointer;
}
</style>