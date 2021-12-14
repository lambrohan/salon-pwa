<template>
  <div id="quick-service-selector">
    <input
      type="text"
      placeholder="search services"
      class="bg-gray-100 w-full text-center p-3 rounded"
      id="searchinput"
      :value="query"
      @input="(e) => (query = e.target.value)"
    />
    <div class="main p-4 pb-32">
      <div class="empty" v-if="!services.length">
        <h2 class="mt-2">
          NO results found for
          <span class="font-bold underline">{{ query }}</span>
        </h2>
        <p class="mt-2 font0-semibold">
          Please contact support if service you are looking for doesn't exist
        </p>
      </div>
      <div class="flex flex-wrap mt-4">
        <div
          class="py-1 px-3 mr-3 mt-4 rounded-full text-m max-h-10 transition cursor-pointer"
          :class="[
            fetching ? 'shimmer' : '',
            isSelected(service) != -1 ? 'bg-accent text-white' : 'bg-primary',
          ]"
          v-for="service in services"
          :key="service.id"
          @click="toggle(service)"
        >
          {{ service.base_service.name }}
        </div>
      </div>
    </div>
    <div class="w-full px-4 py-2 absolute bottom-0 left-0">
      <UButton class="bg-accent" @click.native="goNext">Confirm</UButton>
      <p class="text-center text-sm mt-2">
        with {{ selected.length }} services
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuickServiceSelect',
  props: {
    salonId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      query: '',
      debounce: null,
      fetching: true,
      selected: [],
      services: [],
    }
  },
  mounted() {
    this.fetchServices()
  },
  methods: {
    toggle(s) {
      const selected = this.isSelected(s)
      if (selected !== -1) {
        this.selected.splice(selected, 1)
      } else {
        this.selected.push(s.id)
      }
    },
    isSelected(ss) {
      return this.selected.findIndex((s) => s == ss.id)
    },

    async fetchServices() {
      this.services = await this.$axios.$get(
        `/salon-service/search/${this.salonId}/${this.query || 'all'}`
      )
      this.fetching = false
    },

    async search() {
      this.fetching = true
      clearTimeout(this.debounce)
      this.debounce = setTimeout(this.fetchServices, 600)
    },

    goNext() {
      if (!this.selected.length) {
        this.$Toast.danger('select services first')
        return
      }
      this.$emit('next', this.selected)
    },
  },

  watch: {
    query() {
      this.search()
    },
  },
}
</script>

<style lang="scss" scoped></style>
