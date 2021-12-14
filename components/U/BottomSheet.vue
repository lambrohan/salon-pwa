<template>
  <client-only>
    <div
      id="bottom-sheet"
      class="fixed left-0 bg-white w-full h-full rounded-xl transition-all duration-500 z-10"
      :style="`top:${value ? 0 : screenHeight - minHeight}px`"
    >
      <img
        src="/icons/arrow-up.svg"
        class="w-8 h-8 m-auto opacity-20 mt-2 transition-transform"
        :style="`transform: ${value ? 'rotate(180deg)' : 'rotate(0deg)'}`"
        v-if="indicator"
        @click="$emit('input', !value)"
        alt="arrow up icon"
      />
      <transition name="fade1s">
        <img
          v-if="value"
          src="/icons/close.svg"
          alt="close icon"
          class="w-12 h-12 absolute right-0 top-0 p-3"
          @click="onClose"
        />
      </transition>
      <slot v-if="screenHeight > 0"></slot>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'BottomSheet',
  props: {
    minHeight: {
      type: Number,
      default: 100,
    },
    value: {
      type: Boolean,
      default: false,
    },
    indicator: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {},
  data() {
    return {
      screenHeight: 0,
    }
  },

  mounted() {
    this.screenHeight = window.innerHeight
  },
  methods: {
    onSwipe(e) {
      console.log('swipe', e)
    },

    onClose() {
      this.$emit('collapse')
      this.$emit('input', false)
    },
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
#bottom-sheet {
  box-shadow: 0.1px 2px 32px rgba(20, 20, 20, 0.274);
}
</style>
