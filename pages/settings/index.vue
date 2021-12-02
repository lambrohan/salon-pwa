<template>
  <div id="profile-page" class="pt-2 px-2 pb-32">
    <div class="avatar-box flex flex-col items-center">
      <img src="/icon.png" class="w-24 h-24 border rounded-full mt-4" />
      <h4 class="text-xl font-medium mt-3">Personal Profile</h4>
      <p class="mt-1">{{ user.phone_number }}</p>
      <UButton class="bg-accent w-5/12 mt-3"> Edit Profile </UButton>
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
import { auth } from '~/plugins/firebase'
import Button from '~/components/U/Button.vue'
export default {
  name: 'SettingsPage',
  data() {
    return {
      salons: [],
    }
  },
  mounted() {
    this.fetchSalons()
  },
  methods: {
    async logout() {
      await auth.signOut()
      location.reload()
    },

    async fetchSalons() {
      this.salons = await this.$salonRepository.getOwned()
    },
  },
  computed: {
    authUser() {
      return this.$store.getters.authUser
    },
    user() {
      return this.$store.getters.getUser
    },
  },
  components: { Button },
}
</script>

<style></style>
