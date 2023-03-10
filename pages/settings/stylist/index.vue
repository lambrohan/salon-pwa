<template>
  <div id="stylist-profile">
    <div class="flex items-center bg-primary">
      <img
        src="/icons/arrow-back.svg"
        alt="back"
        class="w-12 h-12 p-2"
        @click="$router.go(-1)"
      />
      <h4>{{ $t('stylist_profile') }}</h4>
    </div>
    <div class="" v-if="stylist.id">
      <img
        :src="
          stylist.display_picture ? stylist.display_picture.url : '/icon.png'
        "
        class="pic m-auto shadow mt-8 rounded-full"
      />
      <validation-provider rules="required|image">
        <input
          type="file"
          class="hidden"
          ref="upload"
          @change="handleSelect"
          accept="image/png, image/jpeg"
        />
      </validation-provider>
      <p class="text-blue-500 text-center mt-4" @click="$refs.upload.click()">
        {{ $t('change_photo') }}
      </p>
      <div class="p-4 mt-6">
        <p class="text-xs text-gray-500">{{ $t('display_name') }}</p>
        <p class="font-semibold text-lg">{{ stylist.display_name }}</p>
        <p class="text-xs text-gray-500 mt-4">{{ $t('salon') }}</p>
        <p class="font-semibold text-lg">
          {{ stylist.chair.salon.salon_profile.name }}
        </p>
      </div>
    </div>
    <ImagePreview :url="preview" v-if="preview">
      <UButton
        class="bg-success border-none"
        light
        @click.native="updateProfilePic"
        :loading="uploadLoading"
        >{{ $t('submit') }}</UButton
      >
      <UButton class="mt-4" @click.native="preview = false">{{
        $t('cancel')
      }}</UButton>
    </ImagePreview>
  </div>
</template>

<script>
import stylistQ from '@/apollo/queries/stylist.gql'
import ImagePreview from '~/components/U/ImagePreview.vue'
export default {
  name: 'StylistProfile',
  layout: 'default',
  data() {
    return {
      stylist: {
        display_name: '',
      },
      preview: false,
      file: false,
      uploadLoading: false,
    }
  },
  mounted() {
    this.fetchStylist()
  },
  methods: {
    async handleSelect() {
      this.file = this.$refs.upload.files[0]
      this.preview = URL.createObjectURL(this.file)
    },
    async fetchStylist() {
      if (!this.user) return
      const { data } = await this.$apollo.query({
        query: stylistQ,
        variables: {
          userId: this.user.id,
        },
        fetchPolicy: 'network-only',
      })
      if (data.stylist.length) {
        this.stylist = data.stylist[0]
      }
    },

    async updateProfilePic() {
      this.uploadLoading = true
      const payload = new FormData()
      payload.append('file', this.file, this.file.name)
      try {
        await this.$stylistRepository.updateProfilePicture(payload)
        this.fetchStylist()
        this.uploadLoading = false
        this.preview = false
      } catch (error) {
        this.uploadLoading = false
        this.preview = false
        console.log(error)
        this.$Toast.danger(error.response.data.message)
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
  components: { ImagePreview },
  watch: {
    user() {
      this.fetchStylist()
    },
  },
}
</script>

<style lang="scss" scoped>
#stylist-profile {
  position: relative;
  .pic {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
}
</style>
