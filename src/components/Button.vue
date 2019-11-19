<template>
  <button @click="onClick" class="button" :type="buttonType">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    onClick: {
      type: Function
    },
    buttonType: {
      type: String,
      required: false,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  border: 0;
  -webkit-appearance: none;
  appearance: none;
  border-radius: $border-radius;
  background: var(--primary-500);
  padding: 1rem 2rem;
  font-size: 1.8rem;
  // text-transform: uppercase;
  letter-spacing: 0.02%;
  outline: 0;
  cursor: pointer;
  transition: background 200ms ease-in-out;
  will-change: background;
  color: white;
  letter-spacing: 0.05em;

  &:hover {
    background: var(--primary-600);
  }
}
</style>