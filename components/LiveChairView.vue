<template>
  <div id="chair-live-v">
    <div class="">
      <div class="mb-2" v-if="breakData">
        <p class="text-sm mb-1">{{ $t('active_break') }}</p>
        <StylistBreak
          :breakData="breakData"
          @click.native="stopBreak"
          :key="`break${isAppOpen}`"
        />
      </div>

      <div class="relative" :class="[breakData ? 'dis' : '']">
        <p class="text-sm">{{ $t('current_customer') }} :</p>

        <CurrentAppointment
          v-if="appointments.length"
          :appointment="topAppointment"
          :key="
            topAppointment.id +
            topAppointment.status +
            `${isAppOpen ? 'yes' : 'no'}`
          "
          @onSelect="toggle(topAppointment)"
          class="shadow-lg"
        />

        <p class="text-sm mt-5 mb-2">{{ $t('next_customers') }} :</p>
        <Appointment
          v-for="(a, i) in appointments"
          :key="a.id"
          :appointment="a"
          @click.native="toggle(a)"
          :class="selected.id === a.id ? 'bg-primary' : ''"
          v-show="i > 0"
        />
      </div>
    </div>
    <div class="empty w-full text-gray-500 text-lg" v-if="!appointments.length">
      {{ $t('no_bookings_found') }}
    </div>
  </div>
</template>

<script>
import ChairAppointmentsQ from '@/apollo/subs/chair-appointments.gql'
import Appointment from './U/Appointment.vue'
import CurrentAppointment from './CurrentAppointment.vue'
import AppointmentControlsV2 from './AppointmentControlsV2.vue'
import BottomSheet from './U/BottomSheet.vue'
import StylistBreak from './StylistBreak.vue'
export default {
  name: 'ChairLiveView',
  props: {
    chairId: {
      type: String,
    },
  },
  apollo: {
    $subscribe: {
      chair: {
        query: ChairAppointmentsQ,
        variables() {
          return {
            chairId: this.chairId,
            date: this.$dayjs().format('YYYY-MM-DD'),
          }
        },
        result({ data }) {
          this.appointments = []
          this.breakData = false
          if (!data.chair) return
          if (!data.chair.length) return
          this.appointments = data.chair[0].appointments.map((a) => {
            a.services = a.order.order_items
              .map((oi) => oi.salon_service_entity.base_salon_service.name)
              .concat(
                a.addon_services.map(
                  ({ salon_service_entity }) =>
                    salon_service_entity.base_salon_service.name
                )
              )
            return a
          })
          if (!data.chair[0].stylist_breaks) {
            this.breakData = null
            return
          }
          if (!data.chair[0].stylist_breaks.length) {
            this.breakData = null
            return
          }
          this.breakData = data.chair[0].stylist_breaks[0]
        },
        error(err) {
          console.error(err)
          this.skipSub = true
        },
        skip() {
          return this.skipSub
        },
      },
    },
  },
  data() {
    return {
      appointments: [],
      skipSub: false,
      selected: '',
      optionsSheet: false,
      breakData: false,
    }
  },
  methods: {
    async stopBreak() {
      const dialog = this.$Dialog.show({
        message: this.$t('alerts.end_break'),
        positiveText: this.$t('confirm'),
        negativeText: this.$t('cancel'),
      })

      dialog.positiveHandler = async () => {
        await this.$stylistRepository.finishBreak()
        dialog.dismiss()
      }
    },
    toggle(a) {
      this.selected && this.selected.id == a.id
        ? (this.selected = '')
        : (this.selected = a)
      this.$emit('onSelect', this.selected)
    },
    clearSelection() {
      this.selected = ''
    },
  },
  computed: {
    topAppointment() {
      return this.appointments.length ? this.appointments[0] : false
    },
    isAppOpen() {
      return this.$store.getters.isOpen
    },
  },
  watch: {
    isAppOpen(data) {
      if (data) {
        this.$apollo.subscriptions.chair.refresh()
      } else {
        this.$apollo.subscriptions.chair.stop()
      }
    },
  },
  beforeDestroy() {
    this.skipSub = true
  },
  components: {
    Appointment,
    CurrentAppointment,
    AppointmentControlsV2,
    BottomSheet,
    StylistBreak,
  },
}
</script>

<style lang="scss" scoped>
.dis {
  &:after {
    position: absolute;
    width: 100%;
    height: 100%;
    content: '';
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.534);
  }
}
</style>
