<template>
  <div id="cancellation" class="p-4">
    <h4 class="text-center">Booking Cancellation</h4>
    <p class="text-sm text-center text-gray-500 mt-4">
      Please select the reason for the cancellation
    </p>
    <select
      v-model="reason"
      class="w-3/4 p-2 py-3 rounded bg-gray-100 block m-auto mt-4 text-sm"
    >
      <option disabled>Select Reason</option>
      <option v-for="r in reasons" :key="r" :value="r">{{ r }}</option>
    </select>
    <UButton
      class="bg-accent w-3/4 mt-6 mb-2"
      @click.native="$emit('onConfirm', reason)"
      >Confirm</UButton
    >
  </div>
</template>

<script>
import { CANCELLATION_REASONS } from '~/utils'

export default {
  name: 'Cancellation',
  data() {
    return {
      reason: 'Select Reason',
    }
  },
  computed: {
    reasons() {
      return CANCELLATION_REASONS
    },
  },
}
</script>

<style></style>
