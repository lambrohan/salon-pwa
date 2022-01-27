<template>
  <div id="salon-photos" v-if="salon.profile">
    <div class="tlb bg-primary flex items-center">
      <img
        src="/icons/arrow-back.svg"
        class="w-12 p-2"
        @click="$router.go(-1)"
      />
      <h4>{{ $t('manage_photos') }}</h4>
    </div>
    <Gallery
      :images="salon.profile.images"
      :highlight="salon.profile.display_picture.id"
      @previewPrimaryClick="setDisplayPic"
      @previewSecondaryClick="deletePic"
      @handleSelect="handleSelect"
      addbutton
      ref="gallery"
    />

    <transition name="fade">
      <ImagePreview v-if="toUpload" :url="toUpload.url" @dismiss="dismissPrev">
        <div class="flex items-center justify-evenly">
          <UButton
            class="w-7/12 text-sm max-h-11"
            :loading="uploadLoading"
            @click.native="uploadImg"
            >{{ $t('upload') }}</UButton
          >
          <UButton
            class="w-4/12 bg-red-500 text-sm max-h-11 border-none"
            @click.native="dismissPrev"
            >{{ $t('cancel') }}</UButton
          >
        </div>
      </ImagePreview>
    </transition>
  </div>
</template>

<script>
import Gallery from '~/components/U/Gallery.vue'
import ImagePreview from '~/components/U/ImagePreview.vue'
export default {
  name: 'SalonPhotos',
  layout: 'default',
  components: { Gallery, ImagePreview },
  data() {
    return {
      salon: {},
      toUpload: false,
      uploadLoading: false,
    }
  },

  async mounted() {
    this.fetchSalon()
  },

  methods: {
    async uploadImg() {
      try {
        this.uploadLoading = true
        const payload = new FormData()
        payload.append('files', this.toUpload.file)
        await this.$salonRepository.addImage(this.salon.id, payload)
        this.fetchSalon()
        this.uploadLoading = false
        this.dismissPrev()
      } catch (error) {
        this.uploadLoading = false
        console.log(error)
      }
    },
    async fetchSalon() {
      this.salon = await this.$salonRepository.getById(this.$route.params.id)
    },
    handleSelect(f) {
      const file = f.target.files[0]
      const url = URL.createObjectURL(file)
      this.toUpload = { file, url }
    },
    async setDisplayPic(image) {
      this.$refs.gallery.previewPriLoading = true
      try {
        await this.$salonRepository.setDisplayPic(image.id, this.salon.id)
        this.$refs.gallery.dismiss()
        this.$Toast.success('Done')
        this.fetchSalon()
      } catch (error) {
        console.log(error)
        this.$refs.gallery.previewPriLoading = false
        this.$Toast.danger('Something went wrong!')
      }
    },
    async deletePic(image) {
      this.$refs.gallery.previewSecLoading = true
      try {
        await this.$salonRepository.deleteImage(image.id, this.salon.id)
        this.$Toast.success('image deleted')
        this.$refs.gallery.dismiss()
        this.fetchSalon()
      } catch (error) {
        this.$refs.gallery.previewSecLoading = false
        this.$Toast.danger(error.response.data.message)
      }
    },

    dismissPrev() {
      this.toUpload = false
    },
  },
}
</script>

<style></style>
