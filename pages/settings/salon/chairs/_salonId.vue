<template>
  <div id="manage-chairs">
    <div class="tlbr bg-primary flex items-center">
      <img
        src="/icons/arrow-back.svg"
        class="w-12 p-2"
        @click="$router.go(-1)"
      />
      <h4>Manage Chairs</h4>
    </div>
    <div class="chairs flex p-3 flex-col">
      <div
        class="w-full p-3 bg-primary rounded relative text-lg mb-3"
        v-for="(chair, i) in chairs"
        :key="chair.id"
        @click="$router.push(`/settings/salon/chairs/manage/${chair.id}`)"
      >
        <p>Chair {{ i + 1 }}</p>
        <p class="text-sm mt-2">
          Stylist - {{ chair.stylist ? chair.stylist.display_name : '' }}
        </p>
        <p
          class="text-xs mt-1"
          v-if="
            chair.stylist &&
            chair.stylist.user &&
            chair.stylist.user.id == user.id
          "
        >
          Self Assigned
        </p>
        <p class="absolute text-sm right-3 top-3">
          <span v-if="chair.disabled" class="text-red-500">DISABLED</span>
          <span v-else class="text-green-500">ACTIVE</span>
        </p>
      </div>
    </div>
    <div class="p-4 w-full">
      <BottomSheet
        v-model="sheetState"
        :indicator="false"
        :minHeight="80"
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
import BottomSheet from '~/components/U/BottomSheet.vue'
import Modal from '~/components/U/Modal.vue'
import ChairQuery from '@/apollo/subs/all-chairs.gql'
export default {
  name: 'ManageChair',
  layout: 'default',
  components: { BottomSheet, Modal },
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
      skipSub: false,
    }
  },
  apollo: {
    $subscribe: {
      allchairs: {
        query: ChairQuery,
        variables() {
          return {
            salonId: this.$route.params.salonId,
          }
        },

        result({ data }) {
          if (data.chair) {
            this.chairs = data.chair
          }
        },

        skip() {
          return this.skipSub
        },
      },
    },
  },

  mounted() {
    // this.$apollo.$subscribe({
    //   query: ChairQuery,
    //   variables:{
    //     salonId: this.$route.params.salonId,
    //   },
    // })
  },
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

      // TODO: assign someone or assign self

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
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
  beforeDestroy() {
    this.skipSub = true
  },
}
</script>

<style></style>
