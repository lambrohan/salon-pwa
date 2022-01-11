<template>
  <div
    id="settings-layout"
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
let visibilityChange

export default {
  name: 'SettingsLayout',
  middleware: ['auth', 'ownerOrStylist'],
  components: { BottomNav },
  data() {
    return {
      hidden: '',
    }
  },
  mounted() {
    window.addEventListener('resize', this.onWindowResize)
    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      this.hidden = 'hidden'
      visibilityChange = 'visibilitychange'
    } else if (typeof document.msHidden !== 'undefined') {
      this.hidden = 'msHidden'
      visibilityChange = 'msvisibilitychange'
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hidden = 'webkitHidden'
      visibilityChange = 'webkitvisibilitychange'
    }

    document.addEventListener(
      visibilityChange,
      this.handleVisibilityChange,
      false
    )
  },

  methods: {
    handleVisibilityChange() {
      if (document[this.hidden]) {
        this.$store.commit('SET_VISIBILITY', false)
      } else {
        this.$store.commit('SET_VISIBILITY', true)
      }
    },
    onWindowResize() {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      )
    },
  },
  beforeDestroy() {
    removeEventListener('resize', this.onWindowResize)
    removeEventListener(visibilityChange, this.handleVisibilityChange)
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

#settings-layout {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
</style>
