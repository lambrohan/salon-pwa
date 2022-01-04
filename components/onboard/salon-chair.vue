<template>
  <div id="salon-chair" class="relative">
    <h4 class="text-xl text-center font-semibold py-2 bg-primary">
      Manage Chairs
    </h4>
    <div class="chairs flex p-3">
      <div
        class="w-full p-3 bg-primary rounded relative text-lg"
        v-for="(chair, i) in chairs"
        :key="chair.id"
      >
        <p>Chair {{ i + 1 }}</p>
        <p class="text-sm mt-2">
          Stylist - {{ chair.stylist ? chair.stylist.display_name : '' }}
        </p>
        <p
          class="text-xs mt-1"
          v-if="chair.stylist && chair.stylist.user_id == user.id"
        >
          Self Assigned
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
              >Create Chair</UButton
            >

            <h3
              class="text-center mt-4 text-blue-500 cursor-pointer"
              @click="$emit('next')"
            >
              Save & Continue
            </h3>
          </div>
          <div class="content" v-else>
            <h4 class="text-center my-5 font-semibold text-lg">
              Assign Stylist
            </h4>
            <p class="text-center text-sm mt-8">
              Scan this QR Code from stylist's phone to assign.
            </p>
            <div
              class="qr border w-80 h-80 m-auto mt-4 bg-contain bg-center flex items-center justify-center"
              :style="`background-image: url(${qrURL})`"
            ></div>
            <UButton
              class="w-7/12 mt-12"
              light
              @click.native="stylistModal = true"
              ref="selfAssignBtn"
              >Assign to myself</UButton
            >
            <UButton
              class="w-7/12 mt-8 bg-accent"
              @click.native="
                () => {
                  validateChair()
                  sheetState = false
                }
              "
              >Done</UButton
            >
          </div>
        </transition>
      </BottomSheet>
    </div>
    <Modal v-model="stylistModal">
      <h4 class="text-center py-2 text-lg font-semibold">Stylist Profile</h4>
      <div class="p-4">
        <validation-observer ref="stylistForm">
          <p class="text-sm mb-1 text-gray-500">Display Name</p>
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
          This is information will be public and shown to users when they book
          an appointment.
        </p>

        <UButton
          class="mt-12 w-9/12 bg-accent"
          @click.native="selfAssign"
          :loading="assignBtnLoading"
          >Save</UButton
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import BottomSheet from '../U/BottomSheet.vue'
import Modal from '../U/Modal.vue'
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
    }
  },
  mounted() {
    this.fetchChairs()
  },
  components: { BottomSheet, Modal },
  methods: {
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
        this.$Toast.warning('QR not found please try again.')
        return
      }
      try {
        this.assignBtnLoading = true
        await this.$stylistRepository.create({ name: this.stylistName })
        await this.$stylistRepository.verifyQR({ token: this.qrToken })
        this.$Toast.success('Chair Assigned')
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

    async fetchChairs() {
      try {
        this.chairs = await this.$chairRepository.getWithSalonId(
          this.$route.params.salonId
        )
      } catch (error) {}
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
