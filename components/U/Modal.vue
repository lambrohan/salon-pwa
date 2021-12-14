<template>
  <transition name="fade">
    <div
      id="modal"
      class="fixed w-screen h-screen top-0 left-0 p-3 z-10"
      v-if="value"
      @click.self="autodismiss ? $emit('input', false) : ''"
    >
      <transition name="topentry">
        <div
          class="bg-white w-full content rounded overflow-hidden"
          v-if="modal"
        >
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'UModal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    autodismiss: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modal: false,
      timer: false,
    }
  },
  mounted() {
    this.value ? (this.modal = true) : ''
  },
  watch: {
    value() {
      if (this.value) {
        this.timer = setTimeout(() => {
          this.modal = true
        }, 200)

        return
      }

      this.modal = false
    },
  },
}
</script>

<style lang="scss" scoped>
#modal {
  background: rgba(24, 24, 24, 0.685);

  .content {
    min-height: 200px;
  }
}
</style>
