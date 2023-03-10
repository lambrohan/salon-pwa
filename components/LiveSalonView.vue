<template>
  <div id="live-salon">
    <div class="p-4" v-if="salon">
      <h4 class="font-semibold text-2xl text-primarydarkx">
        {{ salon.salon_profile.name }}
      </h4>
      <p class="text-gray-500 text-sm mt-4">{{ $t('salon_status') }} :</p>
      <SalonToggle
        v-model="salon.salon_profile.service_status"
        @update="toggleStatus"
      />
    </div>
    <div class="chairs px-4">
      <table class="w-full">
        <tr class="">
          <th class="font-normal text-sm text-left text-gray-500 px-4">
            {{ $t('stylist') }}
          </th>
          <th class="text-gray-500 font-normal text-sm text-right px-4">
            {{ $t('todays_bookings') }}
          </th>
        </tr>
        <tr
          v-for="chair in salon.chairs"
          :key="chair.id"
          class=""
          @click="
            $router.push(
              localePath({
                name: 'livechairs-salonId',
                params: {
                  salonId: salon.id,
                },
                query: {
                  chairId: chair.id,
                },
              })
            )
          "
        >
          <td
            class="p-3 px-4 bg-gray-50 rounded-tl-lg rounded-bl-lg border-b flex items-center"
          >
            <div
              class="icon w-12 h-12 mr-4 p-2 border rounded"
              :class="[chair.disabled ? 'border-red-500' : 'border-success']"
              @click.stop="toggleChair(chair)"
            >
              <img src="/icons/chair.svg" alt="chair" class="w-full h-full" />
            </div>
            {{
              chair.stylist
                ? chair.stylist.display_name
                : 'stylist not assigned to this chair'
            }}
          </td>
          <td
            class="bg-gray-50 p-3 rounded-tr-lg rounded-br-lg text-right w-4/12 px-4 border-b"
          >
            {{ chair.appointment_count }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import salonQ from '@/apollo/subs/salon.gql'
import SalonToggle from './SalonToggle.vue'
export default {
  name: 'LiveSalon',
  props: {
    lite_salon: {
      type: Object,
      default: () => ({}),
    },
  },
  apollo: {
    $subscribe: {
      salon: {
        query: salonQ,
        variables() {
          return {
            salonId: this.lite_salon.id,
            date: this.$dayjs().format('YYYY-MM-DD'),
          }
        },
        result({ data }) {
          if (data.salon) {
            this.salon = data.salon[0]
            this.salon.chairs = data.salon[0].chairs.map((c) => {
              c.appointment_count = c.appointments_aggregate.aggregate.count
              return c
            })
          }
        },
        skip() {
          return this.skipSub
        },
      },
    },
  },
  data() {
    return {
      salon: false,
      skipSub: false,
    }
  },
  methods: {
    async toggleStatus(status) {
      console.log(status)
      const dialog = this.$Dialog.show({
        message: `${this.$t('are_you_sure_salon')} - ${status}`,
        positiveText: this.$t('confirm'),
        negativeText: this.$t('cancel'),
        positiveHandler: async () => {
          try {
            dialog.positiveLoading = true

            await this.$salonRepository.toggleStatus(this.salon.id)
            dialog.dismiss()
          } catch (error) {
            this.$Toast.danger(error.response.data.message)
            this.salon.salon_profile.service_status = status
            dialog.positiveLoading = false
          }
        },
      })
    },
    async toggleChair(chair) {
      const dialog = this.$Dialog.show({
        message: chair.disabled
          ? this.$t('alerts.chair_enable')
          : this.$t('alerts.chair_disable'),

        positiveText: this.$t('confirm'),
        negativeText: this.$t('cancel'),

        positiveHandler: async () => {
          try {
            dialog.positiveLoading = true
            this.chair = await this.$chairRepository.toggle(chair.id)
            dialog.dismiss()
          } catch (error) {
            this.$Toast.danger(error.response.data.message)
            dialog.positiveLoading = false
          }
        },
      })
    },
  },
  computed: {
    isAppOpen() {
      return this.$store.getters.isOpen
    },
  },
  watch: {
    isAppOpen(data) {
      if (data) {
        this.$apollo.subscriptions.salon.start()
      } else {
        this.$apollo.subscriptions.salon.stop()
      }
    },
  },
  beforeDestroy() {
    this.skipSub = true
  },
  components: { SalonToggle },
}
</script>

<style></style>
