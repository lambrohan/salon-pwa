<template>
  <nuxt-link id="n-icon" :to="localePath(route)">
    <img :src="path" class="w-8" />
  </nuxt-link>
</template>
<script>
export default {
  props: ['path', 'route'],
  name: 'NavIcon',
}
</script>
<style lang="scss" scoped>
.nuxt-link-active {
  position: relative;
  &::after {
    content: '';
    width: 24px;
    height: 4px;
    background: #b7bba2;
    position: absolute;
    border-radius: 16px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
