<template>
  <div
    id="stylist-break"
    class="py-2 px-4 border-2 border-yellow-100 rounded-lg relative overflow-hidden z-2"
  >
    <div
      class="progress absolute h-full w-full left-0 top-0 bg-yellow-100"
      :style="`transform:translateX(${
        progressPercent < 100 ? progressPercent - 100 : 0
      }%)`"
    ></div>
    <div class="z-2 relative">
      <p class="text-xs text-gray-500">{{ $t('reason') }}</p>
      <h4 class="font-semibold text-xl">{{ breakData.reason }}</h4>
      <p class="text-right font-semibold absolute bottom-0 right-0">
        {{ $dayjs.duration(secs, 's').format('mm:ss') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StylistBreakView',
  props: ['breakData'],
  data() {
    return {
      secs: 0,
      progressPercent: 0,
    }
  },
  mounted() {
    if (window.breakTimer) {
      clearInterval(window.breakTimer)
    }
    if (this.finished_at == null) {
      window.breakTimer = setInterval(this.calcElapsedTime, 1000)
    }
  },
  methods: {
    calcElapsedTime() {
      this.secs =
        this.$dayjs(this.breakData.started_at).diff(this.$dayjs(), 'second') *
        -1
      this.progressPercent = parseInt(
        (this.secs * 100) / (this.breakData.approx_duration * 60)
      )
    },
  },

  beforeDestroy() {
    if (window.breakTimer) {
      clearInterval(window.breakTimer)
    }
  },
}
</script>

<style lang="scss" scoped>
.progress {
  background-size: 400% 400%;
  transform: translateX(-100%);
  transition: 0.3s ease all;
  z-index: 0;
}
</style>
