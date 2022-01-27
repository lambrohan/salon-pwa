<template>
  <div id="salon-chair" class="relative">
    <h4 class="text-xl text-center font-semibold py-2 bg-primary">
      {{ $t('manage_chairs') }}
    </h4>
    <div class="flex flex-col items-center pt-12 px-4" v-if="!chairs.length">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 text-gray-200"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        />
      </svg>

      <h4 class="text-center text-gray-500 w-3/4 mt-2 text-sm">
        {{ $t('alerts.nothing_add_chair') }}
      </h4>
    </div>
    <div class="chairs flex p-3 flex-col" v-else>
      <div
        class="w-full p-3 bg-primary rounded relative text-lg mb-2"
        v-for="(chair, i) in chairs"
        :key="chair.id"
      >
        <p>{{ $t('chair') }} {{ i + 1 }}</p>
        <p class="text-sm mt-2">
          {{ $t('stylist') }} -
          {{ chair.stylist ? chair.stylist.display_name : '' }}
        </p>
        <p
          class="text-xs mt-1"
          v-if="chair.stylist && chair.stylist.user_id == user.id"
        >
          {{ $t('self_assigned') }}
        </p>
      </div>
    </div>
    <div class="p-4 w-full">
      <BottomSheet
        v-model="sheetState"
        :indicator="false"
        :minHeight="120"
        @collapse="validateChair"
      >
        <transition name="fade1s">
          <div class="" v-if="!sheetState">
            <UButton
              class="bg-accent m-auto mt-4 w-7/12"
              @click.native="initChair"
              :loading="createLoading"
              >{{ $t('create_chair') }}</UButton
            >

            <h3
              class="text-center mt-4 text-blue-500 cursor-pointer"
              @click="$emit('next')"
            >
              {{ $t('save_n_continue') }}
            </h3>
          </div>
          <div class="content" v-else>
            <h4 class="text-center my-5 font-semibold text-lg">
              {{ $t('assign_stylist') }}
            </h4>
            <p class="text-center text-sm mt-8">
              {{ $t('scan_from_stylist') }}
            </p>
            <div
              class="qr border w-80 h-80 m-auto mt-4 bg-contain bg-center flex items-center justify-center"
              :style="`background-image: url(${qrURL})`"
            ></div>
            <UButton
              class="w-7/12 mt-12 bg-accent"
              @click.native="stylistModal = true"
              ref="selfAssignBtn"
              >{{ $t('assign_myself') }}</UButton
            >
            <UButton
              class="w-7/12 mt-8"
              light
              @click.native="
                () => {
                  validateChair()
                  sheetState = false
                }
              "
              >Close</UButton
            >
          </div>
        </transition>
      </BottomSheet>
    </div>
    <Modal v-model="stylistModal">
      <h4 class="text-center py-2 text-lg font-semibold">
        {{ $t('stylist_profile') }}
      </h4>
      <div class="p-4">
        <validation-observer ref="stylistForm">
          <p class="text-sm mb-1 text-gray-500">{{ $t('display_name') }}</p>
          <form>
            <validation-provider
              v-slot="{ errors, classes }"
              rules="required|alpha_spaces"
            >
              <input
                :class="classes"
                name="name"
                class="border p-2 w-full rounded"
                placeholder="enter your name"
                v-model="stylistName"
              />
              <span class="text-sm text-red-500">{{ errors[0] }}</span>
            </validation-provider>
          </form>
        </validation-observer>
        <p class="text-xs text-center mt-4 text-gray-500">
          {{ $t('alerts.info_public_disc') }}
        </p>

        <UButton
          class="mt-12 w-9/12 bg-accent"
          @click.native="selfAssign"
          :loading="assignBtnLoading"
          >{{ $t('save') }}</UButton
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import BottomSheet from '../U/BottomSheet.vue'
import Modal from '../U/Modal.vue'
import ChairQuery from '@/apollo/subs/all-chairs.gql'

export default {
  name: 'OnboardChair',
  components: { BottomSheet },

  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sheetState: false,
      tempChair: false,
      createLoading: false,
      qrURL: '/loading-dark.svg',
      qrToken: false,
      assignBtnLoading: false,
      chairs: [],
      stylistModal: false,
      stylistName: '',
      obs: false,
    }
  },
  mounted() {
    // this.fetchChairs()
    this.initSub()
  },
  components: { BottomSheet, Modal },
  methods: {
    async initSub() {
      this.obs = this.$apollo.subscribe({
        query: ChairQuery,
        variables: {
          salonId: this.$route.params.salonId,
        },
      })

      this.obs.subscribe({
        next: ({ data }) => {
          if (data.chair) {
            console.log(data.chair)
            this.chairs = data.chair
            if (
              this.sheetState &&
              this.tempChair &&
              this.chairs.find((c) => c.id == this.tempChair.id).stylist
            ) {
              this.sheetState = false
              this.$Toast.success(this.$t('stylist_assigned'))
            }
          }
        },
        error: (err) => {
          console.log(err)
        },
      })
    },
    async initChair() {
      if (this.sheetState) {
        this.sheetState = false
        return
      }
      this.sheetState = true
      this.createLoading = true
      this.tempChair = await this.$chairRepository.create({
        salon: this.$route.params.salonId,
      })
      this.createLoading = false

      this.qrToken = await this.$chairRepository.getQRToken(this.tempChair.id)
      this.qrURL = `https://chart.googleapis.com/chart?cht=qr&choe=UTF-8&chs=350x350&chl=${this.qrToken}`

      // TODO: close sheet after assign
    },

    async selfAssign() {
      if (!this.qrToken) {
        this.$Toast.warning(this.$t('qr_not_found'))
        return
      }
      try {
        this.assignBtnLoading = true
        await this.$stylistRepository.create({ name: this.stylistName })
        await this.$stylistRepository.verifyQR({ token: this.qrToken })
        this.$Toast.success(this.$t('stylist_assigned'))
        this.assignBtnLoading = false
        this.clearBottomsheet()
        await this.fetchChairs()
        window.location.href = `/settings/salon/kyc/${this.$route.params.salonId}`
      } catch (error) {
        this.$Toast.danger(error.response.data.message)
        await this.validateChair()
        this.clearBottomsheet()
      }
    },

    async validateChair() {
      if (!this.tempChair) return
      return await this.$chairRepository.validateChair(this.tempChair.id)
    },

    clearBottomsheet() {
      this.tempChair = false
      this.qrToken = false
      this.sheetState = false
      this.stylistModal = false
      this.stylistName = ''
      this.fetchChairs()
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
}
</script>

<style></style>
