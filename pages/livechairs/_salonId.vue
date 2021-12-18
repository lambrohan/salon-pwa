<template>
  <div id="live-page" class="pt-10 relative flex flex-col h-full">
    <h4 class="font-semibold text-xl ml-6 mb-4">Current Bookings</h4>
    <div class="flex items-center p-3 m-h-full pl-6">
      <p
        class="mr-4 border px-2 rounded-full py-1"
        v-for="chair in chairs"
        :key="chair.stylist.id"
        @click="activeChairId = chair.id"
        :class="chair.id == activeChairId ? 'font-semibold bg-primary' : ''"
      >
        {{ chair.stylist.display_name }}
      </p>
    </div>
    <div class="live flex-grow max-h-full">
      <LiveChairView
        :chairId="activeChairId"
        v-if="activeChairId"
        @onSelect="onAppointmentSelect"
        ref="liveChairView"
      />
    </div>
    <div
      class="bottom flex items-center w-full bottom-0 p-4 justify-center relative"
    >
      <AppointmentControls
        v-if="selectedAppointment"
        class="m-auto"
        @notify="showNotifyModal"
        @cancel="
          () => {
            cancelModal = true
          }
        "
      />
      <UButton
        v-else
        class="bg-accent w-7/12"
        @click.native="walkinSheet = true"
        >Add Walkin</UButton
      >
    </div>
    <BottomSheet :minHeight="0" v-model="walkinSheet">
      <AddWalkin :salonId="$route.params.salonId" @onConfirm="createWalkin" />
    </BottomSheet>
    <Modal v-model="notifyModal" autodismiss>
      <Notify @onConfirm="notifyConfirm" />
    </Modal>
    <Modal v-model="cancelModal" autodismiss>
      <Cancellation @onConfirm="onCancelConfirm" />
    </Modal>
  </div>
</template>

<script>
import liteChairQ from '@/apollo/subs/all-chairs-lite.gql'
import LiveChairView from '~/components/LiveChairView.vue'
import BottomSheet from '~/components/U/BottomSheet.vue'
import AddWalkin from '~/components/AddWalkin.vue'
import AppointmentControls from '~/components/AppointmentControls.vue'
import Modal from '~/components/U/Modal.vue'
import Notify from '~/components/Notify.vue'
import Cancellation from '~/components/Cancellation.vue'
import { AppointmentTypes } from '~/utils/enums'
export default {
  name: 'LiveChairPage',
  middleware: ['inject-salon-id'],
  apollo: {
    $subscribe: {
      litechairs: {
        query: liteChairQ,
        variables() {
          return {
            salonId: this.$route.params.salonId,
          }
        },
        result({ data }) {
          this.selectedAppointment = null
          if (data.chair) {
            this.chairs = data.chair
            this.activeChairId = this.chairs[0].id
            this.skipLiteSub = true
          }
        },
        error(e) {
          console.error(e)
          this.skipLiteSub = true
        },
        skip() {
          return this.skipLiteSub
        },
      },
    },
  },
  data() {
    return {
      activeSalonIndex: 0,
      chairs: [],
      skipLiteSub: false,
      activeChairId: false,
      walkinSheet: false,
      selectedAppointment: '',
      notifyModal: false,
      cancelModal: false,
    }
  },
  mounted() {},
  methods: {
    async createWalkin({ services, mobile }) {
      try {
        await this.$appointmentRepo.createWalkin(
          this.$route.params.salonId,
          this.activeChairId,
          services,
          mobile
        )
        this.walkinSheet = false
      } catch (error) {
        this.$Toast.danger(error.response.data.message)
      }
    },

    async onAppointmentSelect(a) {
      this.selectedAppointment = a
    },
    showNotifyModal() {
      if (this.selectedAppointment.type === AppointmentTypes.WALKIN) {
        this.$Toast.danger('cannot notfiy walkin user')
        return
      }
      this.notifyModal = true
    },
    async notifyConfirm(message) {
      this.notifyModal = false
      this.$refs.liveChairView.clearSelection()
      try {
        await this.$appointmentRepo.notify(
          this.selectedAppointment.id,
          `Message From Stylist`,
          message
        )
        this.$Toast.success('Notified')
      } catch (error) {
        const msg = error?.response?.data?.message
        this.$Toast.danger(msg instanceof Array ? msg[0] : msg)
      }
    },
    async onCancelConfirm(reason) {
      this.$refs.liveChairView.clearSelection()
      this.cancelModal = false
      try {
        await this.$appointmentRepo.cancel(this.selectedAppointment.id, reason)
      } catch (error) {}
    },
  },
  computed: {
    salons() {
      return this.$store.getters['salon/getLiteSalons']
    },
  },
  beforeDestroy() {
    this.skipLiteSub = true
  },
  components: {
    LiveChairView,
    BottomSheet,
    AddWalkin,
    AppointmentControls,
    Modal,
    Notify,
    Cancellation,
  },
}
</script>

<style lang="scss" scoped></style>
