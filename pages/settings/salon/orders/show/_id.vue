<template>
  <div id="single-order">
    <div class="bg-primary flex items-center">
      <img
        src="/icons/arrow-back.svg"
        alt="arrow"
        class="w-12 h-12 p-2"
        @click="$router.go(-1)"
      />
      <h4>{{ $t('go_back') }}</h4>
    </div>
    <div class="py-4" v-if="a">
      <div class="user px-4">
        <span class="text-xs">{{ $t('user_details') }}</span>

        <h4 class="text-lg font-semibold">
          {{ a.user.user_profile ? a.user.user_profile.full_name : '' }}
        </h4>
        <p class="text-sm text-gray-500">{{ a.user.phone_number }}</p>
        <hr class="my-2" />
        <div class="flex items-center justify-between">
          <span class="text-sm">{{ $t('order_status') }}</span>
          <span
            class="font-semibold uppercase"
            :class="a.status == 'finished' ? 'text-success' : ''"
            >{{ a.status }}</span
          >
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="text-sm">{{ $t('order_status') }}</span>
          <span>{{ a.chair.stylist.display_name }}</span>
        </div>
        <hr class="my-2" />
      </div>
      <div class="d">
        <h4 class="text-center mb-2 mt-4">{{ $t('order_details') }}</h4>
        <div class="px-4">
          <table class="w-full table-fixed border-collapse">
            <tr class="">
              <th class="w-2/3 text-left text-gray-500 font-normal">
                {{ $t('service') }}
              </th>
              <th class="w-1/3 text-right text-gray-500 font-normal">
                {{ $t('price') }}
              </th>
            </tr>
            <tr v-for="oi in a.order.order_items" :key="oi.id">
              <td class="w-2/3 text-left border-b py-2">
                {{ oi.salon_service_entity.base_salon_service.name }}
              </td>
              <td class="text-right w-1/3 border-b py-2">
                <Money class="text-right">{{ a.order.sub_total }}</Money>
              </td>
            </tr>
            <tr>
              <td class="w-2/3 text-left border-b py-2">
                {{ $t('discount') }}
              </td>
              <td class="text-right w-1/3 border-b py-2 text-success">
                {{ a.order.discount }}
              </td>
            </tr>

            <tr>
              <td class="w-2/3 text-left border-b py-2 font-semibold">
                {{ $t('total') }}
              </td>
              <td class="text-right w-1/3 border-b py-2 font-semibold">
                <Money class="text-right">{{ a.order.order_total }}</Money>
              </td>
            </tr>
          </table>
        </div>
        <h4 class="text-center mt-4">{{ $t('booking_details') }}</h4>
        <div class="p-4">
          <p class="text-sm text-gray-500">Type</p>
          <p class="text-sm font-semibold uppercase text-success">
            {{ a.type }}
          </p>
          <p class="text-sm text-gray-500 mt-4">{{ $t('date') }}</p>
          <p class="text-sm font-semibold">
            {{ $dayjs(a.date).format('MMM DD, YYYY') }}
          </p>

          <div class="flex" v-if="a.status !== 'canceled'">
            <div class="">
              <p class="text-sm text-gray-500 mt-4">{{ $t('started_at') }}</p>
              <p class="text-sm font-semibold">
                {{ $dayjs(a.started_at).format('hh:mm a') }}
              </p>
            </div>
            <div class="ml-6">
              <p class="text-sm text-gray-500 mt-4">{{ $t('finished_at') }}</p>
              <p class="text-sm font-semibold">
                {{ $dayjs(a.finished_at).format('hh:mm a') }}
              </p>
            </div>
          </div>
        </div>
        <div class="refund p-4" v-if="a.appointment_cancellation">
          <h4 class="text-center mb-4">{{ $t('refund_details') }}</h4>
          <p class="text-sm text-gray-500">{{ $t('order_cancelled_by') }}</p>
          <p class="text-sm font-semibold uppercase">
            {{
              a.appointment_cancellation.cancelled_by_user ? 'User' : 'Salon'
            }}
          </p>

          <p class="text-sm text-gray-500 mt-4">{{ $t('reason') }}</p>
          <p class="text-sm font-semibold uppercase">
            {{ a.appointment_cancellation.reason }}
          </p>

          <div class="" v-if="a.appointment_cancellation.order_refund">
            <p class="text-sm text-gray-500 mt-4">{{ $t('refund_amt') }}</p>
            <p class="text-sm font-semibold uppercase">
              ₹{{ a.appointment_cancellation.order_refund.refund_amt }}
            </p>

            <p class="text-sm text-gray-500 mt-4">{{ $t('status') }}</p>
            <p class="text-sm font-semibold uppercase">
              {{
                a.appointment_cancellation.order_refund.processed
                  ? 'Processed'
                  : 'Processing'
              }}
            </p>
          </div>
          <div v-else>{{ $t('not_eligible_refund') }}</div>
        </div>
      </div>
      <UButton class="w-3/4 bg-success mb-4 mt-4" @click.native="$Tawk.popup">
        {{ $t('contact_support') }}
      </UButton>
    </div>
  </div>
</template>

<script>
import appointmentById from '@/apollo/queries/appointmentById.gql'
import Money from '~/components/U/Money.vue'
import Modal from '~/components/U/Modal.vue'
export default {
  name: 'SingleOrderPage',
  layout: 'default',
  data() {
    return {
      a: false,
    }
  },
  apollo: {
    appointment: {
      query: appointmentById,
      variables() {
        return {
          id: this.$route.params.id,
        }
      },
      fetchPolicy: 'cache-and-network',
      result: function ({ data }) {
        if (data.appointment.length) {
          this.a = data.appointment[0]
        }
      },
    },
  },
  components: { Money, Modal },
}
</script>

<style></style>
