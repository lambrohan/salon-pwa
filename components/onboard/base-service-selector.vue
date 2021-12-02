<template>
  <div id="base-services">
    <input
      type="text"
      placeholder="search services"
      class="bg-gray-100 w-full text-center p-3 rounded"
      id="searchinput"
      :value="query"
      @input="(e) => (query = e.target.value)"
    />
    <div class="main pb-32">
      <div class="empty" v-if="!bss.length">
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
            isSelected(bs) != -1 ? 'bg-accent text-white' : 'bg-primary',
          ]"
          v-for="bs in bss"
          v-show="!servicesToHide.includes(bs.id)"
          :key="bs.id"
          @click="toggle(bs)"
        >
          {{ bs.name }}
        </div>
      </div>
    </div>
    <div class="w-full px-4 py-2 absolute bottom-0 left-0">
      <UButton class="bg-accent" @click.native="goNext">Continue</UButton>
      <p class="text-center text-sm mt-2">
        with {{ selected.length }} services
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseServiceSelector',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    servicesToHide: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      query: '',
      bss: [],
      debounce: null,
      fetching: true,
      selected: [],
    }
  },
  mounted() {
    this.fetchServices()
    this.selected = this.value.map((s) => s.id)
  },
  methods: {
    async fetchServices() {
      this.bss = await this.$axios.$get(
        `/base-service/search/${this.query || 'all'}`
      )
      this.fetching = false
    },
    async search() {
      this.fetching = true
      clearTimeout(this.debounce)
      this.debounce = setTimeout(this.fetchServices, 600)
    },

    toggle(bs) {
      const selected = this.isSelected(bs)
      if (selected !== -1) {
        this.selected.splice(selected, 1)
      } else {
        this.selected.push(bs.id)
      }
    },
    isSelected(bs) {
      return this.selected.findIndex((s) => s == bs.id)
    },

    goNext() {
      if (!this.selected.length) {
        this.$Toast.danger('select services first')
        return
      }
      this.$emit(
        'next',
        this.bss.filter((bs) => this.selected.includes(bs.id))
      )
    },
  },

  watch: {
    query() {
      this.search()
    },
  },
}
</script>

<style></style>
