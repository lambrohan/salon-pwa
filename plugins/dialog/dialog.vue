<template>
  <div
    id="alert-dialog"
    class="w-full fixed top-0 left-0 h-screen p-4"
    @click.self="dismiss"
    ref="dialog"
  >
    <transition name="topentry">
      <div class="w-full bg-white rounded-lg overflow-hidden" v-if="dialog">
        <div class="p-3 bg-primary w-full text-center">
          <h4>{{ title }}</h4>
        </div>
        <div class="p-4">
          <p class="text-center">{{ message }}</p>
        </div>
        <div class="flex p-4">
          <UButton
            light
            class="text-sm border-none text-gray-500 shadow-none"
            @click.native="dismiss"
            >{{ negativeText }}</UButton
          >
          <UButton
            class="bg-accent"
            :loading="positiveLoading"
            @click.native="positiveHandler && positiveHandler()"
            >{{ positiveText }}</UButton
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AlertDialog',
  data() {
    return {
      title: 'Alert',
      message: 'Are you sure want to proceed with the action?',
      positiveText: 'Confirm',
      negativeText: 'Cancel',
      dialog: false,
      positiveLoading: false,
      positiveHandler: () => ({}),
    }
  },
  mounted() {
    setTimeout(() => {
      this.dialog = true
    }, 100)
  },
  methods: {
    init(options) {
      options.title ? (this.title = options.title) : ''
      options.positiveText ? (this.positiveText = options.positiveText) : ''
      options.message ? (this.message = options.message) : ''
      options.positiveHandler
        ? (this.positiveHandler = options.positiveHandler)
        : ''
    },
    dismiss() {
      this.dialog = false
      this.$destroy()
    },
  },
  beforeDestroy() {
    this.$root.$el.parentNode.removeChild(this.$root.$el)
  },
}
</script>

<style lang="scss">
#alert-dialog {
  background: rgba(12, 12, 12, 0.692);
}
</style>
