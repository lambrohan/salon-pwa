<template>
  <div
    id="u-tag"
    class="border py-1 px-2 text-xs rounded-full mx-2"
    :class="classes"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: '',
      default: '',
    },
  },
  computed: {
    classes() {
      switch (this.type) {
        case 'warning':
          return 'border-yellow-500 text-yellow-500'
        case 'error':
          return 'border-red-500 text-red-500'
        case 'success':
          return 'border-green-500 text-green-500'
        default:
          return 'border text-black'
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
