<template>
  <div
    id="token-auth"
    class="flex items-center justify-center h-screen flex-col"
  >
    <img src="/icon.png" alt="logo" class="w-1/2" />
    <div class="flex flex-col items-center" v-if="loading">
      <Spinner class="w-12" />
      <p class="m-4">{{ $t('logging_in') }}</p>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithCustomToken } from '@firebase/auth'
import Spinner from '~/components/U/Spinner.vue'
export default {
  name: 'TokenAuth',
  layout: 'public',
  data() {
    return {
      loading: false,
    }
  },
  async mounted() {
    this.doAuth()
  },

  methods: {
    async doAuth() {
      try {
        this.loading = true
        if (getAuth().currentUser) {
          await getAuth().signOut()
        }
        await signInWithCustomToken(getAuth(), this.$route.params.token)
        setTimeout(() => {
          window.location.href = '/' + this.$route.query.redirect || ''
        }, 3000)
      } catch (error) {
        this.$Toast.danger('Auto Login Failed')
        this.$router.push(this.localePath('/auth/login'))
        this.loading = false
      }
    },
  },
  components: { Spinner },
}
</script>

<style></style>
