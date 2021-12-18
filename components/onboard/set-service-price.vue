<template>
  <div id="set-prices">
    <validation-observer ref="priceForm">
      <form @submit.prevent="">
        <table class="w-full table-fixed">
          <tr class="bg-primary">
            <th class="py-2">Service</th>
            <th class="py-2">Price</th>
            <th class="py-2">Duration</th>
          </tr>
          <tr v-for="bs in services" :key="bs.id">
            <td class="py-2 pl-3 pr-2 border-b">{{ bs.name }}</td>
            <td class="py-2 px-3 flex flex-col items-enter border-b">
              <validation-provider
                ref="priceValidator"
                rules="required|integer|min_value:1"
                v-slot="{ errors, classes }"
              >
                <input
                  type="number"
                  name="price"
                  v-model="bs.price"
                  class="rounded-full text-center max-w-full py-1 bg-gray-100"
                  placeholder="₹"
                  :class="classes"
                />
                <span
                  class="text-xs text-red-500 leading-none block mt-1 text-center"
                  >{{ errors[0] }}</span
                >
              </validation-provider>
            </td>
            <td class="border-b">
              <validation-provider
                ref="priceValidator"
                rules="required|integer|min_value:1"
                v-slot="{ errors, classes }"
              >
                <input
                  type="number"
                  name="duration"
                  v-model="bs.avg_duration"
                  class="rounded-full text-center max-w-full py-1 bg-gray-100"
                  placeholder="minutes"
                  :class="classes"
                />
                <span
                  class="text-xs text-red-500 leading-none block mt-1 text-center"
                  >{{ errors[0] }}</span
                >
              </validation-provider>
            </td>
          </tr>
        </table>
        <UButton
          class="bg-accent mt-6"
          @click.native="onConfirm"
          :loading="loading"
          >Save & Continue</UButton
        >
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  name: 'SetServicePrices',
  props: {
    bss: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      services: [],
      loading: false,
    }
  },
  mounted() {
    this.services = this.bss.map((bs) => ({
      id: bs.id,
      price: '',
      avg_duration: '',
      name: bs.name,
    }))
  },

  methods: {
    async onConfirm() {
      if (!this.services.length) {
        this.$Toast.danger('service not selected')
        return
      }
      if ((await this.$refs.priceForm.validate()) == false) return

      this.$emit('next', this.services)
    },
  },
}
</script>

<style></style>
