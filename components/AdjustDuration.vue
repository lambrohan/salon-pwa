<template>
  <div id="adjust-duration" class="bg-primary p-4">
    <h4 class="text-center">{{ heading }}</h4>
    <div class="flex justify-center my-4 font-semibold">
      <input
        type="number"
        class="bg-transparent text-4xl text-center w-20"
        v-model="duration"
      />
      <p class="self-end">min</p>
    </div>
    <div class="btns flex items-center justify-center">
      <button
        v-for="modifier in modifiers"
        :key="modifier"
        class="bg-white w-12 h-12 rounded-full mx-2 text-sm font-semibold"
        :class="modifier < 0 ? 'text-red-500' : ''"
        @click="recalc(modifier)"
      >
        {{ modifier }}
      </button>
    </div>
    <UButton class="bg-black w-2/4 mt-6" @click.native="onConfirm">{{
      $t('confirm')
    }}</UButton>
  </div>
</template>

<script>
export default {
  name: 'AdjustDuration',
  props: {
    initialValue: {
      type: Number,
      default: 0,
    },
    heading: {
      type: String,
      default: function () {
        return this.$t('adjust_duration')
      },
    },
  },
  data() {
    return {
      duration: 0,
      modifiers: [-30, -15, 15, 30],
    }
  },
  mounted() {
    this.duration = this.initialValue
  },
  methods: {
    recalc(modifier) {
      const result = (this.duration += modifier)
      this.duration = result < 0 ? 0 : result
    },
    onConfirm() {
      if (this.duration <= 0) {
        this.$Toast.danger(this.$t('alerts.duration_not_valid'))
        return
      }
      this.$emit('onDurationConfirm', this.duration)
    },
  },
}
</script>

<style></style>
