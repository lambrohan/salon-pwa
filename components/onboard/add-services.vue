<template>
  <div id="add-services" class="">
    <h4 class="text-xl font-semibold bg-primary py-3 pl-4 mt-3">
      Add Services
    </h4>
    <UTabs :activeIndex="activeTabIndex">
      <UTab title="1" class="p-4">
        <BaseServiceSelector
          @next="onServiceSelect"
          :value="selectedServices"
          :servicesToHide="
            currentServices.map((s) => s.base_service.id).toString()
          "
        />
      </UTab>
      <UTab title="2" class="p-4">
        <button
          class="flex items-center mb-3 text-gray-500"
          @click="activeTabIndex--"
        >
          <img src="/icons/arrow-back.svg" class="w-6 mr-2" alt="" /> Back to
          select services
        </button>
        <SetServicePrice
          :bss="selectedServices"
          @next="onPriceConfirm"
          ref="priceTab"
        ></SetServicePrice>
      </UTab>
    </UTabs>
  </div>
</template>

<script>
import BaseServiceSelector from './base-service-selector.vue'
import SetServicePrice from './set-service-price.vue'
export default {
  name: 'AddServices',
  components: { BaseServiceSelector, SetServicePrice },
  props: {
    currentServices: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeTabIndex: 0,
      selectedServices: [],
    }
  },
  methods: {
    onServiceSelect(bss) {
      this.activeTabIndex++
      this.selectedServices = bss
    },
    async onPriceConfirm(services) {
      this.$emit(
        'next',
        services.map((s) => ({ base_service: s.id, price: parseInt(s.price) }))
      )
    },
  },
}
</script>

<style></style>
