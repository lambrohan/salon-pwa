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
        v-model="phoneNumber"
        placeholder="mobile"
      />
      <UButton
        :loading="otpLoading"
        class="font-semibold tracking-widest h-14"
        @click.native="getOTP"
        >Send OTP
      </UButton>
      <div id="placeholder"></div>
    </div>
  </div>
</template>
<script>
import { RecaptchaVerifier, signInWithPhoneNumber } from '@firebase/auth'
import { auth } from '~/plugins/firebase'
export default {
  layout: 'auth',
  data() {
    return {
      otpLoading: false,
      phoneNumber: '',
      confirmationResult: false,
      otpModal: false,
    }
  },
  methods: {
    async getOTP() {
      this.otpLoading = true

      try {
        window.reCaptchaVerifier = new RecaptchaVerifier(
          'placeholder',
          {
            size: 'invisible',
            callback: (res) => {
              console.log('done')
              this.signInWithPhone()
            },
            'expired-callback': () => {
              console.log('error')
            },
          },
          auth
        )
        await window.reCaptchaVerifier.verify()
      } catch (error) {
        throw error
      }
    },

    async signInWithPhone() {
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          `+91${this.phoneNumber}`,
          window.reCaptchaVerifier
        )
        this.confirmationResult = confirmationResult
        this.otpLoading = false
        window.reCaptchaVerifier.clear()
        this.$Toast.success('OTP has been sent')
        this.otpModal = true
      } catch (error) {
        this.$Toast.danger(error.message || 'Something went wrong')
        this.otpLoading = false
        window.reCaptchaVerifier.clear()
      }
    },
  },
}
</script>
<style scoped></style>
