<template>
  <div id="login-page">
    <div class="flex flex-col items-center w-full px-8 py-8">
      <UbuLogo class="w-32" />
      <h1 class="text-2xl font-medium text-gray-600">
        {{ $t('login.title') }}
      </h1>
      <div class="phone-view" v-if="!otpModal">
        <input
          type="number"
          class="w-full mt-8 text-center shadow-lg h-14 rounded-3xl border border-black-50 bg-gray-50 font-bold tracking-widest text-2xl"
          v-model="phoneNumber"
          @input="
            phoneNumber.length > 10
              ? (phoneNumber = phoneNumber.substring(0, 10))
              : ''
          "
          placeholder="mobile"
        />

        <UButton
          :loading="otpLoading"
          class="font-semibold tracking-widest h-14 bg-accent mt-8 w-full"
          @click.native="getOTP"
          >{{ $t('login.send_otp') }}
        </UButton>
        <div id="placeholder"></div>
      </div>
      <div class="otp-view box-border" v-else>
        <UOtpInput
          :num-inputs="6"
          :should-auto-focus="true"
          :is-input-num="true"
          class="mt-8 w-full"
          @on-complete="otpComplete"
          separator=""
          input-classes="w-12 h-12 text-center font-semibold text-xl text-gray-700 mx-1.5 border rounded shadow-lg box-border"
        />
        <UButton
          :loading="confirmLoading"
          class="font-semibold tracking-widest h-14 bg-accent f-full mt-8 w-full"
          @click.native="confirmOtp"
          >{{ $t('confirm') }}
        </UButton>
      </div>
      <div class="hidden">
        <nuxt-link
          v-for="locale in $i18n.locales"
          :ref="locale.code"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
        ></nuxt-link>
      </div>
      <div class="w-full flex flex-col items-center mt-12">
        <h4 class="text-sm text-gray-500 mb-1">{{ $t('select_lang') }}</h4>
        <select
          @input="
            (e) => {
              $refs[e.target.value][0].$el.click()
            }
          "
          class="bg-white w-6/12 py-2 border rounded-full langselect text-center"
        >
          <option
            :value="locale.code"
            v-for="locale in $i18n.locales"
            :key="locale.code"
            :selected="$i18n.locale == locale.code"
          >
            {{ locale.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from '@firebase/auth'
import OtpInput from '~/components/U/OtpInput.vue'
export default {
  name: 'LoginPage',
  layout: 'auth',
  data() {
    return {
      otpLoading: false,
      phoneNumber: '',
      confirmationResult: false,
      otpModal: false,
      confirmLoading: false,
      otp: '',
    }
  },

  mounted() {},
  methods: {
    async getOTP() {
      this.otpLoading = true
      try {
        window.reCaptchaVerifier = new RecaptchaVerifier(
          'placeholder',
          {
            size: 'invisible',
            callback: (res) => {
              this.signInWithPhone()
            },
            'expired-callback': () => {
              console.log('error')
            },
          },
          getAuth()
        )
        await window.reCaptchaVerifier.verify()
      } catch (error) {
        throw error
      }
    },
    async signInWithPhone() {
      try {
        const confirmationResult = await signInWithPhoneNumber(
          getAuth(),
          `+91${this.phoneNumber}`,
          window.reCaptchaVerifier
        )
        this.confirmationResult = confirmationResult
        this.otpLoading = false
        window.reCaptchaVerifier.clear()
        this.$Toast.success(
          `Otp sent to mobile ending with ${this.phoneNumber.substring(
            this.phoneNumber.length - 4
          )}`
        )
        this.otpModal = true
      } catch (error) {
        this.$Toast.danger(error.message || 'Something went wrong')
        this.otpLoading = false
        window.reCaptchaVerifier.clear()
      }
    },

    otpComplete(val) {
      this.otp = val
    },

    async clearAll() {
      this.otpLoading = false
      this.phoneNumber = ''
      this.confirmationResult = false
      this.otpModal = false
      this.confirmLoading = false
      this.otp = ''
      window.reCaptchaVerifier ? window.reCaptchaVerifier.clear() : ''
    },

    async confirmOtp() {
      if (!this.confirmationResult) {
        this.$Toast.danger('Please try again!')
        this.clearAll()
      }
      this.confirmLoading = true
      try {
        const { user } = await this.confirmationResult.confirm(this.otp)
        this.$nuxt.$loading.start()
        const idToken = await user.getIdToken()
        this.$axios.setToken(idToken, 'bearer')
        window.localStorage.setItem('jwt', idToken)
        await this.$userRepository.findOrCreate()
        try {
          const profile = await this.$store.dispatch('getPartnerProfile')
          window.localStorage.setItem('salon_role', profile.role)
        } catch (error) {}

        this.$Toast.success('Login Successful')
        location.reload()
      } catch (error) {
        this.clearAll()
        this.$Toast.danger(error.message)
        this.$nuxt.$loading.stop()
      }
    },
  },
  components: { OtpInput },
}
</script>
<style scoped></style>
