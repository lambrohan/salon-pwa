<template>
  <client-only>
    <div
      id="bottom-sheet"
      class="
        fixed
        left-0
        bg-white
        w-full
        h-full
        rounded-xl
        transition-all
        duration-500
      "
      :class="expanded ? 'top-0' : 'top-3/4'"
    >
      <img
        src="/icons/arrow-up.svg"
        class="w-8 h-8 m-auto opacity-20 mt-2 transition-transform"
        :style="`transform: ${expanded ? 'rotate(180deg)' : 'rotate(0deg)'}`"
        @click="expanded = !expanded"
      />
      <slot></slot>
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
  },
  data() {
    return {
      expanded: false,
    }
  },

  mounted() {},
  methods: {
    onSwipe(e) {
      console.log('swipe', e)
    },
  },
}
</script>

<style>
#bottom-sheet {
  box-shadow: 0.1px 2px 32px rgba(20, 20, 20, 0.274);
}
</style>
