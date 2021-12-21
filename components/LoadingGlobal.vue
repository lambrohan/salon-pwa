<template>
  <div
    v-if="loading"
    class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center"
    id="gloader"
  >
    <Spinner class="w-12" />
  </div>
</template>
<script>
import Spinner from './U/Spinner.vue'
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    stop() {
      this.loading = false
    },

    finish() {
      this.loading = false
    },
  },
  components: { Spinner },
}
</script>
<style lang="scss" scoped>
#gloader {
  background: rgba(255, 255, 255, 0.856) !important;
  z-index: 1000;
}
</style>
