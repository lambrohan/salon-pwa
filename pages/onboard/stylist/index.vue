<template>
  <div id="onboard-stylist">
    <Spinner
      class="w-12 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      v-if="loading"
    />
    <UTabs :activeIndex="activeIndex" v-else>
      <UTab> <StylistProfile /> </UTab>
      <UTab>
        <div class="">
          <QrScanner @onScan="verifyToken" />
        </div>
      </UTab>
    </UTabs>
  </div>
</template>

<script>
import StylistProfile from '~/components/onboard/stylist-profile.vue'
import Spinner from '~/components/U/Spinner.vue'
import QrScanner from '~/components/onboard/qr-scanner.vue'
export default {
  name: 'OnboardStylist',
  layout: 'onboard',
  data() {
    return {
      activeIndex: 0,
      loading: false,
      stylist: null,
    }
  },
  mounted() {
    if (this.user) {
      this.fetchStylist()
    }
  },
  methods: {
    async verifyToken(token) {
      try {
        this.loading = true
        await this.$stylistRepository.verifyQR({ token })
        window.location.href = '/settings'
      } catch (error) {
        this.loading = false
      }
    },
    async fetchStylist() {
      this.loading = true
      try {
        this.stylist = await this.$stylistRepository.get()
        this.activeIndex = 1
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
  watch: {
    user() {
      this.fetchStylist()
    },
  },
  components: { StylistProfile, Spinner, QrScanner },
}
</script>

<style></style>
