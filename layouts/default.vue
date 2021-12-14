<template>
  <div
    id="default-layout"
    class="w-full h-screen relative flex flex-col overflow-hidden"
  >
    <div class="flex-grow max-h-full overflow-y-scroll">
      <Nuxt class="" />
    </div>
    <UBottomNav />
  </div>
</template>

<script>
import BottomNav from '~/components/U/BottomNav.vue'
export default {
  name: 'DefaultLayout',
  middleware: 'auth',
  components: { BottomNav },
  mounted() {},
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: 0.15s ease all;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
