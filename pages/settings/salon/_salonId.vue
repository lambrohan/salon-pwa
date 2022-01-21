<template>
  <div id="salon-settings" class="pt-2 px-2 pb-32">
    <div
      class="avatar-box flex flex-col items-center"
      v-if="salon && salon.profile"
    >
      <img
        :src="
          salon.profile.display_picture
            ? salon.profile.display_picture.url
            : '/icon.png'
        "
        class="w-24 h-24 border rounded-full mt-4"
      />
      <h4 class="text-xl font-medium mt-3">{{ salon.profile.name }}</h4>
      <p class="mt-1">{{ user.phone_number }}</p>

      <div class="flex flex-wrap items-center mt-4">
        <Tag v-if="!salon.is_published" type="error">NOT PUBLISHED</Tag>
        <Tag v-if="salon.disabled" type="error">DISABLED</Tag>
      </div>
    </div>

    <div class="mt-3 p-4">
      <p class="py-1 px-4 text-gray-500 bg-primary text-sm">Salon Management</p>
      <div
        @click="$router.push(`/settings/salon/photos/${$route.params.salonId}`)"
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p class="font-semibold text-lg">Manage Photos</p>
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
        @click="
          $router.push(`/settings/salon/services/${$route.params.salonId}`)
        "
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
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <p class="font-semibold text-lg">Manage Services</p>
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
        @click="$router.push(`/settings/salon/chairs/${$route.params.salonId}`)"
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p class="font-semibold text-lg">Manage Chairs</p>
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
        class="bg-white flex-row flex py-3 px-4 items-center relative"
        @click="$router.push(`/settings/salon/orders/${$route.params.salonId}`)"
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
        <p class="font-semibold text-lg">Orders</p>
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

      <nuxt-link
        :to="`/settings/salon/kyc/${$route.params.salonId}`"
        class="bg-white flex-row flex py-3 px-4 pr-1 items-center relative"
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
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
          />
        </svg>
        <p class="font-semibold text-lg">KYC & Verification</p>
        <div class="flex items-center flex-grow justify-end">
          <span
            class="text-xs"
            :class="salon.kyc ? 'text-green-500' : 'text-red-500'"
            >{{ kycRemarks }}</span
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
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
    </div>
  </div>
</template>

<script>
import { getAuth } from '@firebase/auth'
import Button from '~/components/U/Button.vue'
import Tag from '~/components/U/Tag.vue'
export default {
  name: 'SettingsPage',
  components: { Button, Tag },
  middleware: 'owneronly',
  layout: 'bottomnav',

  data() {
    return {
      salon: false,
      kycRemarks: '',
    }
  },
  mounted() {
    this.fetchSalon()
  },
  methods: {
    async logout() {
      await getAuth().signOut()
      location.reload()
    },

    async fetchSalon() {
      if (!this.user) return
      this.salon = await this.$salonRepository.getById(
        this.$route.params.salonId
      )

      if (!this.salon.published) {
        const kyc = await this.$salonRepository.getKyc(
          this.$route.params.salonId
        )

        this.kycRemarks = kyc ? kyc.remarks : 'Incomplete'
      }
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
  watch: {
    user() {
      this.fetchSalon()
    },
  },
}
</script>

<style lang="scss" scoped></style>
