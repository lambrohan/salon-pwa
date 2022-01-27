<template>
  <div id="salon-toggle" class="flex items-center justify-center my-4">
    <div
      class="wrapper p-2 mx-4 inline-flex items-center"
      id="live-wrp"
      style="width: 77px"
      @click="emitToggle"
    >
      <transition name="fade">
        <h4
          class="text-green-500 text-sm font-semibold absolute -left-4 transform -translate-x-full"
          v-show="open"
        >
          {{ $t('open') }}
        </h4>
      </transition>
      <div
        class="w-6 h-6 circle rounded-full"
        id="crkl"
        :class="open ? 'open' : 'closed'"
        :style="`transform:translateX(${
          open
            ? '0px'
            : containerWidth - buttonDiameter - containerPadding + 'px'
        })`"
      ></div>

      <transition name="fade">
        <h4
          class="text-red-500 text-sm font-semibold absolute -right-4 transform translate-x-full"
          v-show="!open"
        >
          {{ $t('closed') }}
        </h4>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: 'OFF',
    },
  },
  data() {
    return {
      containerWidth: 0,
      buttonDiameter: 0,
      containerPadding: 0,
    }
  },
  mounted() {
    const container = document.getElementById('live-wrp')
    this.containerWidth = container.clientWidth
    this.containerPadding =
      parseInt(
        window.getComputedStyle(container, null).paddingLeft.split('px')[0]
      ) +
      parseInt(
        window.getComputedStyle(container, null).paddingRight.split('px')[0]
      )
    this.buttonDiameter = document.getElementById('crkl').clientWidth
  },
  methods: {
    emitToggle() {
      if (this.isStylist) return
      this.$emit('update', this.value == 'ON' ? 'OFF' : 'ON')
    },
  },
  computed: {
    open() {
      return this.value === 'ON'
    },
    isStylist() {
      return this.$store.getters.userIsStylist
    },
  },
}
</script>

<style lang="scss" scoped>
#salon-toggle {
  position: relative;
  .wrapper {
    border: 0.5px solid #b3b3b3;
    border-radius: 26px;
    position: relative;
    height: 40px;
    transition: 0.3s ease all;

    .circle {
      display: flex;
      align-items: center;
      transition: 0.3s ease all;
      transform-origin: center;
    }

    .closed {
      background: red;
    }
    .open {
      background: green;
    }
  }
}
</style>
