<template>
  <div id="date-range-picker" class="flex items-center justify-between">
    <div class="">
      <p class="text-sm mt-2 text-gray-500">{{ $t('from') }}</p>
      <input
        type="date"
        class="border px-2 py-1"
        v-model="range.from"
        @input="$emit('input', range)"
      />
    </div>
    <div class="">
      <p class="text-sm mt-2 text-gray-500">{{ $t('to') }}</p>
      <input
        type="date"
        class="border px-2 py-1"
        v-model="range.to"
        @input="$emit('input', range)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DateRangePicker',
  data() {
    return {
      range: {
        from: '',
        to: '',
      },
    }
  },
}
</script>

<style></style>
