<template>
  <router-link :to="'/'" :style="{'color': color}">
    <Icon :name="'back'" />Tilbake
  </router-link>
</template>

<script>
import Icon from './Icon';
export default {
  name: 'Back',
  props: {
    color: {
      type: String,
      default: '#fff'
    }
  },
  components: {
    Icon
  }
};
</script>

<style lang="scss" scoped>
a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;

  svg {
    margin-right: 1rem;
    fill: currentColor;
    stroke: currentColor;
  }
}
</style>