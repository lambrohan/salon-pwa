<template>
  <div id="login-page">
    <div class="flex flex-col items-center w-full px-8 py-8">
      <UbuLogo class="w-32" />
      <h1 class="text-2xl font-medium text-gray-600">Login to continue</h1>
      <input
        type="number"
        class="
          w-full
          mt-8
          text-center
          shadow-lg
          h-14
          rounded-3xl
          border border-black-50
          bg-gray-50
          font-bold
          tracking-widest
          text-2xl
        "
        placeholder="mobile"
      />
      <UButton :loading="otpLoading" class="font-semibold tracking-widest h-14"
        >Send OTP</UButton
      >
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import UbuLogo from '~/components/UbuLogo.vue'
import Button from '~/components/U/Button.vue'
export default Vue.extend({
  layout: 'auth',
  components: { UbuLogo, Button },
  data() {
    return {
      otpLoading: false,
    }
  },
})
</script>
<style scoped></style>
