<template>
  <div id="salon-pic" class="p-4">
    <h2 class="text-xl font-semibold">Lets pick a nice photo of the salon.</h2>
    <p>It's important for search!</p>
    <img
      :src="url"
      class="w-80 m-auto h-80 object-cover rounded border mt-8"
      v-if="url"
      alt="selected file"
      @click="$refs.upload.click()"
    />
    <validation-provider v-show="!url" rules="required|image">
      <input
        type="file"
        class="hidden"
        ref="upload"
        @change="handleSelect"
        accept="image/png, image/jpeg"
      />
      <button
        class="
          w-3/4
          flex
          items-center
          justify-center
          bg-green-200
          px-8
          py-2
          rounded
          m-auto
          mt-8
        "
        @click="$refs.upload.click()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
        <p class="ml-2">Choose File</p>
      </button>
    </validation-provider>
    <UButton
      class="bg-accent mt-8"
      v-if="url"
      :loading="btnLoading"
      @click.native="$emit('next', file)"
      >Upload</UButton
    >
  </div>
</template>

<script>
export default {
  name: 'SalonPic',
  data() {
    return {
      file: false,
      url: '',
      btnLoading: false,
    }
  },
  methods: {
    handleSelect() {
      this.file = this.$refs.upload.files[0]

      this.file ? (this.url = URL.createObjectURL(this.file)) : ''
    },
  },
}
</script>

<style></style>
