<template>
  <form
    id="salon-info"
    class="flex flex-col p-6 pt-16"
    @submit.prevent="onSubmit"
  >
    <h4 class="text-2xl font-semibold mb-6">Salon Information</h4>
    <label for="name" class="mb-1 text-sm text-gray-500">Salon Name</label>
    <input
      name="name"
      type="text"
      placeholder="eg. Elon Musk"
      class="p-3.5 rounded border"
    />
  </form>
</template>

<script>
export default {
  name: 'SalonInfoBoarding',
  methods: {
    onSubmit() {
      this.$Toast.show('Go next')
    },
  },
}
</script>

<style></style>
