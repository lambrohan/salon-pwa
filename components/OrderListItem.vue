<template>
  <div id="order-d">
    <div class="w-full flex p-4">
      <div class="w-full flex-grow">
        <h4 class="font-semibold">{{ appointment.user.phone_number }}</h4>
        <div class="flex flex-wrap items-center">
          <span
            v-for="s in services"
            :key="s"
            class="bg-primary px-2 py-1 text-xs rounded-full mr-2 mt-2"
            >{{ s }}</span
          >
        </div>
      </div>
      <div class="">
        <Money>{{
          appointment.payment_receipt != null
            ? appointment.payment_receipt.grand_total
            : appointment.order.order_total
        }}</Money>
      </div>
    </div>
    <div
      class="status text-sm flex items-center justify-between border-t mt-1 px-4 py-2"
    >
      <h4>
        Stylist:
        <span class="font-semibold">{{
          appointment.chair.stylist.display_name
        }}</span>
      </h4>
      <h4>
        Status:
        <span
          :class="
            appointment.status == 'finished' ? 'text-success' : 'text-red-500'
          "
          >{{ appointment.status }}</span
        >
      </h4>
    </div>
  </div>
</template>

<script>
import Money from './U/Money.vue'
export default {
  name: 'OrderListItem',
  props: {
    appointment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    services() {
      return this.appointment.order.order_items
        .map((oi) => oi.salon_service_entity.base_salon_service.name)
        .concat(
          this.appointment.addon_services.map(
            (as) => as.salon_service_entity.base_salon_service.name
          )
        )
    },
  },
  components: { Money },
}
</script>

<style></style>
