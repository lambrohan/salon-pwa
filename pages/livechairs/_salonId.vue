<template>
  <div id="live-page" class="pt-10 relative flex flex-col h-full">
    <div class="flex items-center justify-between px-6 mb-4">
      <h4 class="font-semibold text-xl">{{ $t('current_bookings') }}</h4>
      <OptionsMenu class="flex-grow">
        <div class="p-1 px-3 flex items-center" @click="breakModal = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          {{ $t('take_a_break') }}
        </div>
      </OptionsMenu>
    </div>
    <div class="br"></div>
    <div class="flex items-center p-3 m-h-full pl-6">
      <p
        class="mr-4 border px-2 rounded py-1"
        v-for="chair in chairs"
        :key="chair.stylist.id"
        @click="activeChairId = chair.id"
        :class="[
          chair.id == activeChairId ? 'font-semibold bg-primary' : '',
          chair.disabled ? 'border-red-500' : '',
        ]"
      >
        {{ chair.stylist.display_name }}
      </p>
    </div>
    <div class="live flex-grow max-h-full">
      <LiveChairView
        :chairId="activeChairId"
        v-if="activeChairId"
        class="px-2"
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
        @click.native="openWalkinSheet"
        >{{ $t('add_walkin') }}</UButton
      >
    </div>
    <BottomSheet :minHeight="0" v-model="walkinSheet">
      <AddWalkin
        ref="walkinsheet"
        :salonId="$route.params.salonId"
        @onConfirm="createWalkin"
      />
    </BottomSheet>
    <Modal v-model="notifyModal" autodismiss>
      <Notify @onConfirm="notifyConfirm" />
    </Modal>
    <Modal v-model="cancelModal" autodismiss>
      <Cancellation @onConfirm="onCancelConfirm" />
    </Modal>
    <Modal v-model="breakModal" autodismiss>
      <AdjustDuration
        :heading="$t('alerts.set_break_duration')"
        @onDurationConfirm="startBreak"
      />
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
import OptionsMenu from '~/components/U/OptionsMenu.vue'
import AdjustDuration from '~/components/AdjustDuration.vue'
export default {
  name: 'LiveChairPage',
  middleware: ['inject-salon-id'],
  layout: 'bottomnav',
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

            this.skipLiteSub = true
          }
          if (!this.$route.query.chairId) {
            this.activeChairId = this.chairs[0].id
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
      breakModal: false,
    }
  },
  mounted() {
    if (this.$route.query.chairId) {
      this.activeChairId = this.$route.query.chairId
    }
  },
  methods: {
    openWalkinSheet() {
      this.$refs.walkinsheet.clear()
      this.walkinSheet = true
    },
    async startBreak(duration) {
      if (duration <= 0) return
      this.breakModal = false
      try {
        await this.$stylistRepository.createBreak(duration)
        this.$Toast.success(this.$t('break_started'))
      } catch (error) {
        this.$Toast.danger(error.response.data.message)
      }
    },
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
        if (error.response.data.message instanceof Array) {
          this.$Toast.danger(error.response.data.message[0])
          return
        }
        this.$Toast.danger(error.response.data.message)
      }
    },

    async onAppointmentSelect(a) {
      this.selectedAppointment = a
    },
    showNotifyModal() {
      if (this.selectedAppointment.type === AppointmentTypes.WALKIN) {
        this.$Toast.danger(this.$t('alerts.cannot_notify_walkin_user'))
        return
      }
      this.notifyModal = true
    },
    async notifyConfirm(message) {
      this.notifyModal = false
      try {
        await this.$appointmentRepo.notify(
          this.selectedAppointment.id,
          `Message From Stylist`,
          message
        )
        this.selectedAppointment = false
        this.$Toast.success('Notified')
      } catch (error) {
        const msg = error?.response?.data?.message
        this.$Toast.danger(msg instanceof Array ? msg[0] : msg)
      }
    },
    async onCancelConfirm(reason) {
      this.cancelModal = false
      try {
        await this.$appointmentRepo.cancel(this.selectedAppointment.id, reason)
        this.selectedAppointment = false
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
    OptionsMenu,
    AdjustDuration,
  },
}
</script>

<style lang="scss" scoped></style>
