<template>
  <div id="img-preview" class="w-full h-screen fixed top-0 left-0 p-3">
    <img :src="url" alt="preview" class="object-contain w-full rounded" />
    <div class="w-full p-4 fixed bottom-0 left-0 z-20">
      <slot></slot>
    </div>
    <div class="fixed top-3 right-3 w-12 h-12 p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-full w-full bg-white rounded-full"
        viewBox="0 0 20 20"
        @click="$emit('dismiss')"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: ['url'],
}
</script>

<style lang="scss" scoped>
#img-preview {
  background: rgba(0, 0, 0, 0.877);
  z-index: 1;
}
</style>
