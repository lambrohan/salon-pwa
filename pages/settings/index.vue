<template>
  <div id="profile-page" class="pt-2 px-2 pb-32">
    <div class="avatar-box flex flex-col items-center">
      <img src="/icon.png" class="w-24 h-24 border rounded-full mt-4" />
      <h4 class="text-xl font-medium mt-3">Account Info</h4>
      <p class="mt-1">{{ user.phone_number }}</p>
    </div>

    <div class="mt-6 p-4">
      <p class="py-1 px-4 text-gray-500 bg-primary text-sm">My Salons</p>
      <nuxt-link
        v-for="salon in salons"
        :key="salon.id"
        :to="`/settings/salon/${salon.id}`"
        class="bg-white flex-row flex py-3 px-4 items-center relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
        <p
          class="font-semibold text-lg"
          :class="salon.disabled ? 'text-gray-500' : ''"
        >
          {{ salon.profile.name }}
        </p>
        <p class="text-xs text-yellow-500 ml-3" v-if="!salon.kyc">
          KYC incomplete
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 absolute right-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </nuxt-link>
      <p class="py-1 px-4 text-gray-500 bg-primary text-sm">Account</p>
      <div
        class="bg-white flex-row flex py-3 px-4 items-center relative"
        @click="$router.push('/settings/stylist')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
          />
        </svg>
        <p class="font-semibold text-lg">Stylist Profile</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 absolute right-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <div
        class="bg-white flex-row flex py-3 pt-1 px-4 items-center relative"
        @click="$Tawk.popup"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="font-semibold text-lg">Support</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 absolute right-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <div
        class="bg-white flex-row flex px-5 py-1 items-center relative"
        @click="logout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="font-semibold text-lg text-red-600">Logout</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 absolute right-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '~/components/U/Button.vue'
import { SalonRoles } from '~/utils'
import { getAuth } from '@firebase/auth'
export default {
  name: 'SettingsPage',
  layout: 'bottomnav',
  data() {
    return {
      salons: [],
    }
  },
  mounted() {
    if (this.user) {
      this.fetchSalons()
    }
  },
  methods: {
    async logout() {
      await getAuth().signOut()
      location.reload()
    },

    async fetchSalons() {
      if (this.partner.role == SalonRoles.STYLIST) {
        const s = await this.$salonRepository.getById(this.partner.salon)
        this.salons = [s]
        return
      }
      this.salons = await this.$salonRepository.getOwned()
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    partner() {
      return this.$store.getters.getPartner
    },
  },
  watch: {
    user() {
      this.fetchSalons()
    },
  },
  components: { Button },
}
</script>

<style></style>
