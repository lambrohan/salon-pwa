<template>
  <form
    id="user-info"
    class="flex flex-col p-6 pt-16"
    @submit.prevent="onSubmit"
  >
    <h4 class="text-2xl font-semibold mb-6">Personal Information</h4>
    <label for="name" class="mb-1 text-sm text-gray-500">Full Name</label>
    <input
      name="name"
      type="text"
      placeholder="eg. Elon Musk"
      class="p-3.5 rounded border"
    />
    <label for="date" class="mt-6 text-sm mb-1 text-gray-500">Birthdate</label>
    <input
      name="date"
      type="date"
      placeholder="birthdate"
      class="p-3.5 w-full bg-white border rounded"
    />
    <label for="gender" class="mt-6 text-sm mb-1 text-gray-500">Gender</label>
    <select name="gender" class="p-3.5 bg-white border rounded">
      <option value="">Select</option>
      <option value="MALE">Male</option>
      <option value="FEMALE">Female</option>
      <option value="Rather Not Say">Rather Not Say</option>
    </select>
    <UButton class="bg-black h-14 mt-8" @click.native="onSubmit"
      >Save &amp; Continue</UButton
    >
  </form>
</template>

<script>
export default {
  name: 'UserInfoBoarding',
  methods: {
    onSubmit() {
      this.$Toast.show('Go next')
      this.$emit('next')
    },
  },
}
</script>

<style></style>
