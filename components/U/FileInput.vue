<template>
  <validation-provider
    ref="provider"
    :rules="rules"
    v-slot="{ errors, classes }"
    :name="labelName"
  >
    <p v-if="value && value.filename" class="text-xs text text-gray-500 mb-1">
      Current File :
      <a class="text-success" :href="value.url" target="_blank">{{
        value.filename
      }}</a>
    </p>
    <input
      type="file"
      class="hidden"
      ref="upload"
      @change="handleSelect"
      :accept="accept"
    />
    <button
      class="w-full flex items-center justify-center rounded p-1 border"
      :class="[value ? ' border-green-500' : '', ...classes]"
      @click="$refs.upload.click()"
    >
      <p class="flex-grow text-left ml-2 text-gray-500">{{ filename }}</p>

      <div
        :class="value ? 'bg-green-200' : 'bg-gray-100'"
        class="w-10 h-10 rounded flex items-center justify-center"
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
      </div>
    </button>
    <span class="text-xs text-red-500 leading-none block mt-1">{{
      errors[0]
    }}</span>
  </validation-provider>
</template>

<script>
export default {
  name: 'FileInput',
  props: {
    labelName: {
      type: String,
      default: '',
    },

    accept: {
      type: String,
      default: 'image/png, image/jpeg',
    },
    rules: {
      type: String,
      default: 'size:2000',
    },

    value: {},
  },
  data() {
    return {
      filename: 'Choose File',
      file: '',
    }
  },
  methods: {
    handleSelect(e) {
      this.$refs.provider.validate(e)
      this.filename = this.$refs.upload.files[0].name || 'Choose File'
      this.$emit('input', this.$refs.upload.files)
    },
  },
}
</script>

<style></style>
