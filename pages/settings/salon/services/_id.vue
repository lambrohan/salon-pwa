<template>
  <div id="manage-salon-service">
    <div class="flex items-center bg-primary py-2">
      <img
        src="/icons/arrow-back.svg"
        alt="back-arrow"
        class="w-12 h-12 p-2"
        @click="$router.go(-1)"
      />
      <h4>Manage Services</h4>

      <UButton
        class="w-4/12 transform scale-75 bg-accent absolute right-0"
        v-if="isUpdated"
        >Save</UButton
      >
    </div>
    <div class="p-4">
      <p class="text-sm text-gray-500 mb-3 text-center">
        You have currently added following services
      </p>
      <ServiceList :services="services" @priceInput="onPriceInput" />
    </div>
    <Fab @click.native="sheetState = true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </Fab>
    <BottomSheet v-model="sheetState" :minHeight="-10">
      <AddServices
        :currentServices="services"
        @next="onConfirm"
        ref="addservices"
      />
    </BottomSheet>
  </div>
</template>

<script>
import ServiceList from '~/components/U/ServiceList.vue'
import ServiceQuery from '@/apollo/queries/all-services.gql'
import Fab from '~/components/U/Fab.vue'
import BottomSheet from '~/components/U/BottomSheet.vue'
import AddServices from '~/components/onboard/add-services.vue'
export default {
  name: 'ManageServices',
  layout: 'onboard',
  components: { ServiceList, Fab, BottomSheet, AddServices },
  data() {
    return {
      services: [],
      skipSub: false,
      sheetState: false,
      updatedPrices: {},
      isUpdated: false,
    }
  },

  apollo: {
    $subscribe: {
      services: {
        query: ServiceQuery,
        variables() {
          return {
            salonId: this.$route.params.id,
          }
        },
        result({ data }) {
          if (data.salon_service_entity) {
            this.services = data.salon_service_entity.map((s) => {
              s.effective_price = s.effective_price[0].price
              return s
            })
          }
        },
        skip() {
          return this.skipSub
        },
      },
    },
  },
  methods: {
    async onConfirm(services) {
      try {
        this.$refs.addservices.$refs.priceTab.loading = true
        await this.$axios.$post('salon-service', {
          services,
          salon: this.$route.params.id,
        })
        this.clearBottomSheet()
        this.$Toast.success('Services Added')
      } catch (error) {
        console.log(error)
        this.$refs.addservices.$refs.priceTab.loading = false
        if (error.response?.data) {
          this.$Toast.danger(error.response.data.message)
        }
      }
    },

    onPriceInput(payload) {
      if (
        payload.price &&
        payload.price != payload.currentPrice &&
        parseInt(payload.price) > 0
      ) {
        this.updatedPrices[payload.id] = parseInt(payload.price)
      } else {
        delete this.updatedPrices[payload.id]
      }

      this.isUpdated =
        Object.keys(this.updatedPrices).length === 0 ? false : true
    },

    clearBottomSheet() {
      this.sheetState = false
    },
  },
  computed: {},
}
</script>

<style></style>
