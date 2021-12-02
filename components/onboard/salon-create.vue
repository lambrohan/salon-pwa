<template>
  <form id="salon-info" class="flex flex-col p-6 pt-16">
    <h4 class="text-2xl font-semibold mb-6">Lets create a salon first</h4>
    <label for="name" class="mb-1 text-sm text-gray-500">Salon Name</label>
    <validation-provider
      v-slot="{ errors, classes }"
      rules="required|alpha_spaces"
    >
      <input
        name="Salon Name"
        type="text"
        v-model="salonName"
        placeholder="eg. My Salon"
        class="p-3.5 rounded border w-full"
        :class="classes"
      />
      <span class="text-sm text-red-500">{{ errors[0] }}</span>
    </validation-provider>

    <UButton
      class="bg-accent h-14 mt-8 w-full"
      :loading="loading"
      @click.native="onSubmit"
      >Save &amp; Continue</UButton
    >
  </form>
</template>

<script>
export default {
  name: 'SalonInfoBoarding',
  data() {
    return {
      salonName: '',
      loading: false,
    }
  },
  mounted() {},
  methods: {
    async onSubmit() {
      console.log(this.$chairRepository)
      try {
        this.loading = true
        const salon = await this.$salonRepository.create({
          name: this.salonName,
        })
        this.loading = false
        this.$emit('next', salon)
      } catch (error) {
        this.loading = false
        this.$Toast.danger(error.response.data.message)
      }
    },
  },
}
</script>

<style></style>
