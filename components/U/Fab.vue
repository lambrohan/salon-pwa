<template>
  <div id="fab" class="fixed bottom-8 right-6">
    <div
      class="w-12 h-12 bg-accent rounded-full text-white flex items-center justify-center w"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fab',
}
</script>

<style lang="scss" scoped>
#fab {
  transition: 0.3s ease all;
  transform-origin: center;

  .w {
    box-shadow: 1px 12px 12px rgba(0, 0, 0, 0.274);
    transition: 0.3s ease all;
  }

  &:active {
    transform: translateY(2px);

    .w {
      box-shadow: none;
    }
  }
}
</style>
