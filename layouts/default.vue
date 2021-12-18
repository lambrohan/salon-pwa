<template>
  <div
    id="default-layout"
    class="w-full relative flex flex-col overflow-hidden"
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
  middleware: ['auth', 'ownerOrStylist'],
  components: { BottomNav },
  mounted() {
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight * 0.01}px`
    )
  },
}
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: 0.15s ease all;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}

#default-layout {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
</style>
