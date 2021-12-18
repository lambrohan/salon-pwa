<template>
  <div id="chair-live-v" class="px-6">
    <div class="" v-if="appointments.length">
      <p class="text-sm">Current Customer :</p>

      <CurrentAppointment
        :appointment="topAppointment"
        :key="topAppointment.id + 'hell'"
        @onSelect="toggle(topAppointment)"
        class="shadow-lg"
      />

      <p class="text-sm mt-5 mb-2">Next Customers :</p>
      <Appointment
        v-for="(a, i) in appointments"
        :key="a.id"
        :appointment="a"
        @click.native="toggle(a)"
        :class="selected.id === a.id ? 'bg-primary' : ''"
        v-show="i > 0"
      />
    </div>
    <div class="empty w-full" v-else>No Appointments Found</div>
  </div>
</template>

<script>
import ChairAppointmentsQ from '@/apollo/subs/chair-appointments.gql'
import Appointment from './U/Appointment.vue'
import CurrentAppointment from './CurrentAppointment.vue'
import AppointmentControlsV2 from './AppointmentControlsV2.vue'
import BottomSheet from './U/BottomSheet.vue'
export default {
  name: 'ChairLiveView',
  props: {
    chairId: {
      type: String,
    },
  },
  apollo: {
    $subscribe: {
      appointments: {
        query: ChairAppointmentsQ,
        variables() {
          return {
            chairId: this.chairId,
            date: this.$dayjs().format('YYYY-MM-DD'),
          }
        },
        result({ data }) {
          console.log(data)
          this.appointments = data.appointment.map((a) => {
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
    }
  },
  methods: {
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
      return this.appointments[0]
    },
  },
  watch: {},
  beforeDestroy() {
    this.skipSub = true
  },
  components: {
    Appointment,
    CurrentAppointment,
    AppointmentControlsV2,
    BottomSheet,
  },
}
</script>

<style></style>
