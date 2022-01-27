<template>
  <client-only>
    <div id="stylist-profile" class="p-4">
      <h4 class="font-semibold text-lg">{{ $t('lets_create_profile') }}</h4>
      <p class="text-xs text-gray-500 mt-4">
        {{ $t('alerts.info_public_disc') }}
      </p>
      <div class="flex items-center mb-4 mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-xs text-red-500 ml-1">
          {{ $t('verification_required') }}
        </p>
      </div>
      <validation-observer ref="stylistForm">
        <p class="text-sm mb-1 text-gray-500">{{ $t('display_name') }}</p>
        <form @submit.prevent="">
          <validation-provider
            v-slot="{ errors, classes }"
            rules="required|alpha_spaces"
          >
            <input
              :class="classes"
              name="name"
              class="border p-2 w-full rounded"
              placeholder="enter your name"
              v-model="name"
            />
            <span class="text-sm text-red-500">{{ errors[0] }}</span>
          </validation-provider>
          <div class="mt-4">
            <p for="profilepic" class="text-sm text-gray-500 mb-1">
              {{ $t('display_pic') }}
            </p>
            <FileInput labelName="profilepic" v-model="files" />
          </div>
        </form>
      </validation-observer>
      <UButton
        class="bg-accent mt-8"
        @click.native="submit"
        :loading="loading"
        >{{ $t('submit') }}</UButton
      >
    </div>
  </client-only>
</template>

<script>
import FileInput from '../U/FileInput.vue'
export default {
  name: 'StylistProfile',
  data() {
    return {
      name: '',
      files: {},
      loading: false,
    }
  },
  methods: {
    async submit() {
      if (!(await this.$refs.stylistForm.validate())) return
      if (!this.files[0]) {
        this.$Toast.danger('profile picture required')
        return
      }
      this.loading = true
      try {
        await this.$stylistRepository.create({
          name: this.name,
        })

        const payload = new FormData()
        payload.append('file', this.files[0], this.files[0].name)

        await this.$stylistRepository.updateProfilePicture(payload)
        this.$Toast.success('Profile Created')
        this.loading = false
        this.$emit('next')
      } catch (error) {
        this.loading = false

        this.$Toast.danger(error.response.data.message)
      }
    },
  },
  components: { FileInput },
}
</script>

<style></style>
