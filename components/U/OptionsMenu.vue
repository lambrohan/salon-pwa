<template>
  <div id="opt-menu" class="relative flex flex-col items-end">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      v-if="expanded"
      @click="expanded = !expanded"
      class="h-6 w-6 border"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      v-else
      @click="expanded = !expanded"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      />
    </svg>

    <transition name="fade">
      <div
        class="options text-right absolute border top-full shadow-lg transform translate-y-1"
        v-if="expanded"
        @click="expanded = false"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'OptionsMenu',

  data() {
    return {
      expanded: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
