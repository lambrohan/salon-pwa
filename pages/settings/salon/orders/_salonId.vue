<template>
  <div id="order-page" class="pb-12">
    <div class="flex items-center bg-primary">
      <img
        src="/icons/arrow-back.svg"
        alt="back"
        class="w-12 h-12 p-2"
        @click="$router.go(-1)"
      />
      <h4>Orders</h4>
    </div>
    <div class="contaner px-4 pt-1">
      <!-- <DateRanePicker v-model="range" /> -->
      <date-range-picker
        v-model="dateRange"
        :timePicker="false"
        :localeData="localeData"
        autoApply
      >
      </date-range-picker>
      <button
        class="w-6/12 text-white bg-success mt-2 py-2 rounded"
        @click="fetchOrders(true)"
      >
        Submit
      </button>
      <div class="list mt-4 bg-gray-100 pb-1">
        <h4 class="py-3 pl-2">
          Order List <span class="ml-2 text-sm">({{ totalCount }})</span>
        </h4>

        <OrderListItem
          class="m-1 bg-white"
          v-for="a in appointments"
          @click.native="$router.push(`/settings/salon/orders/show/${a.id}`)"
          :key="a.id"
          :appointment="a"
        />
      </div>
      <UButton
        class="bg-accent w-1/3 mt-4"
        v-if="totalCount - appointments.length"
        @click.native="fetchOrders"
        >Fetch More ({{ totalCount - appointments.length }})</UButton
      >
    </div>
  </div>
</template>

<script>
import DateRanePicker from '~/components/DateRanePicker.vue'
import pgQ from '@/apollo/queries/order-paginate.gql'
import Appointment from '~/components/U/Appointment.vue'
import OrderListItem from '~/components/OrderListItem.vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  name: 'SalonOrders',
  components: {
    DateRanePicker,
    Appointment,
    OrderListItem,
    DateRangePicker,
    DateRangePicker,
  },
  data() {
    return {
      range: {
        from: new Date(),
        to: new Date(),
      },
      dateRange: {
        startDate: '2020-12-26',
        endDate: '2049-12-28',
      },
      paginating: false,
      perPage: 10,
      start: 0,
      hideShowMore: false,
      appointments: [],
      totalCount: 0,
      localeData: {
        direction: 'ltr',
        format: 'dd/mm/yyyy',
        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthNames: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    }
  },
  mounted() {
    this.fetchOrders()
  },
  methods: {
    async fetchOrders(reset) {
      if (reset) {
        this.start = 0
        this.totalCount = 0
        this.appointments = []
      }
      const from = this.$dayjs(this.range.from).hour(0).minute(1).toISOString()
      const to = this.$dayjs(this.range.to).hour(23).minute(59).toISOString()

      const { data } = await this.$apollo.query({
        query: pgQ,
        variables: {
          where: {
            created_at: {
              _gt: from,
              _lte: to,
            },
            status: {
              _in: ['finished', 'canceled'],
            },
          },
          start: this.start,
          limit: this.perPage,
        },
        fetchPolicy: 'no-cache',
      })

      if (data?.appointment_aggregate?.aggregate?.totalCount) {
        this.totalCount = data.appointment_aggregate.aggregate.totalCount
      }

      if (data.appointments) {
        this.start += this.perPage
        this.appointments.push(...data.appointments)
      }
    },
  },
}
</script>

<style></style>
