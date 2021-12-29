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
        @click.native="saveUpdatedPrices"
        :loading="updateBtnLoading"
        >Save</UButton
      >
    </div>
    <div class="p-4">
      <p class="text-sm text-gray-500 mb-3 text-center">
        You have currently added following services
      </p>
      <ServiceList
        :services="services"
        @priceInput="onPriceInput"
        @onSelect="onServiceSelect"
      />
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
    <Modal v-model="serviceSheet" autodismiss>
      <div class="p-4">
        <h4 class="text-center">Manage Service</h4>
        <p class="text-xs text-gray-500 text-center mb-1 mt-4">
          Approx Duration (mins)
        </p>
        <div class="border rounded-full p-2 flex items-center justify-between">
          <input
            type="text"
            v-model="selectedService.avg_duration"
            placeholder="time in mins"
            class="flex-grow pl-4"
          />
          <UButton
            class="bg-success py-2"
            @click.native="updateTime"
            :loading="updateTimeLoading"
            >Save</UButton
          >
        </div>
        <p class="text-xs text-gray-500 text-center mt-4">
          User won't be able to book this service if disabled
        </p>
        <UButton
          class="mt-2 w-2/3"
          :loading="toggleLoading"
          @click.native="toggleService"
          :class="selectedService.disabled ? 'bg-success' : 'bg-red-500'"
          >{{ selectedService.disabled ? 'Enable' : 'Disable' }}</UButton
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import ServiceList from '~/components/U/ServiceList.vue'
import ServiceQuery from '@/apollo/subs/all-services.gql'
import Fab from '~/components/U/Fab.vue'
import BottomSheet from '~/components/U/BottomSheet.vue'
import AddServices from '~/components/onboard/add-services.vue'
import Modal from '~/components/U/Modal.vue'
export default {
  name: 'ManageServices',
  layout: 'default',
  components: { ServiceList, Fab, BottomSheet, AddServices, Modal },
  data() {
    return {
      services: [],
      skipSub: false,
      sheetState: false,
      updatedPrices: {},
      isUpdated: false,
      updateBtnLoading: false,
      serviceSheet: false,
      selectedService: false,
      toggleLoading: false,
      updateTimeLoading: false,
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
    async toggleService() {
      try {
        this.toggleLoading = true
        await this.$salonRepository.disableService(this.selectedService.id)
        this.toggleLoading = false
      } catch (error) {
        this.toggleLoading = false
        this.$Toast.danger(error.response.data.message)
      }
      this.serviceSheet = false
    },
    async updateTime() {
      try {
        this.updateTimeLoading = true
        await this.$salonRepository.updateServiceDuration(
          this.selectedService.id,
          parseInt(this.selectedService.avg_duration)
        )
        this.serviceSheet = false
        this.$Toast.success('Duration updated')
        this.updateTimeLoading = false
      } catch (error) {
        this.$Toast.danger(error.response.data.message)
        this.updateTimeLoading = true
      }
    },
    async onServiceSelect(service) {
      this.serviceSheet = true
      this.selectedService = service
    },
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

    async onPriceInput(payload) {
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

    async saveUpdatedPrices() {
      try {
        this.updateBtnLoading = true
        const serviceArr = Object.keys(this.updatedPrices).map((s) => ({
          id: s,
          price: this.updatedPrices[s],
        }))

        await Promise.all(
          serviceArr.map((s) =>
            this.$salonRepository.updatePrice(s.id, s.price)
          )
        )
        this.updateBtnLoading = false

        this.$Toast.success('Prices Updated')
        this.clearBottomSheet()
      } catch (error) {
        this.$Toast.danger(error.response.data.message)
      }
    },

    clearBottomSheet() {
      this.sheetState = false
      this.updatedPrices = {}
      this.isUpdated = false
    },
  },
  computed: {},
}
</script>

<style></style>
