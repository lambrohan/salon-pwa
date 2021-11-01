<template>
  <div
    id="u-button"
    class="
      text-center
      shadow-lg
      h-12
      rounded-3xl
      border border-black-50
      text-gray-50
      flex
      items-center
      justify-center
      flex-row
      duration-300
    "
    :class="loading ? 'bg-gray-900' : ''"
  >
    <transition name="up">
      <USpinner v-if="loading" class="absolute" />
      <div v-else class="data absolute">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Spinner from './Spinner.vue'
export default Vue.extend({
  name: 'UButton',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: { Spinner },
})
</script>
<style lang="scss">
#u-button {
  .up-enter-active,
  .up-leave-active {
    transition: all 0.5s;
  }
  .up-enter, .up-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-100%);
  }
}
</style>
