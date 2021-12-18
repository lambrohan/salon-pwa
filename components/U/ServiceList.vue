<template>
  <div id="service-list">
    <client-only>
      <table class="w-full">
        <tr class="">
          <th class="font-normal text-sm text-left text-gray-500 px-3">
            Service
          </th>
          <th class="text-gray-500 font-normal text-sm text-right px-3">
            Fees(₹)
          </th>
        </tr>
        <tr
          v-for="service in services"
          :key="service.id"
          :class="service.disabled ? 'bg-red-100' : 'bg-gray-100'"
        >
          <td
            class="p-2 px-3 rounded-tl-lg rounded-bl-lg"
            @click="$emit('onSelect', service)"
          >
            {{ service.base_service.name }}
          </td>
          <td class="rounded-tr-lg rounded-br-lg text-right w-3/12">
            <input
              type="number"
              v-model="service.updated_price"
              :placeholder="service.effective_price"
              @input="
                $emit('priceInput', {
                  id: service.id,
                  price: service.updated_price,
                  currentPrice: service.effective_price,
                })
              "
              class="w-full text-right bg-transparent p-3 rounded-tr-lg rounded-br-lg"
            />
          </td>
        </tr>
      </table>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'ServiceList',
  props: {
    services: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
#service-list {
  table {
    border-collapse: separate;
    border-spacing: 0 0.5em;

    input {
      border: 0.5px solid transparent;
      transition: 0.3s ease all;

      &:focus {
        border-color: rgba(17, 17, 17, 0.534);
      }
    }
  }
}
</style>
