<template>
  <div id="gallery">
    <div class="flex flex-wrap items-center p-3 pt-2 justify-between">
      <Photo
        v-for="image in images"
        :key="image.id"
        :class="highlight == image.id ? 'highlight' : ''"
        :image="image"
        @click.native="preview = image"
        style="width: 49%"
        class="h-52 mt-2 border bg-gray-50 rounded overflow-hidden"
        alt="gallery image"
      />
      <div
        v-if="addbutton"
        @click="launchSelect"
        class="addme h-52 mt-2 border bg-gray-100 rounded overflow-hidden flex flex-col items-center justify-center text-gray-400"
        style="width: 49%"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="text-sm mt-2"> {{ $t('add_image') }} </span>
        <input
          type="file"
          class="hidden"
          ref="upload"
          @change="
            (f) => {
              $emit('handleSelect', f)
            }
          "
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
    </div>
    <transition name="fade">
      <ImagePreview
        :url="preview.url"
        @dismiss="dismiss"
        v-if="preview"
        ref="imagePreview"
      >
        <div class="flex items-center justify-evenly">
          <UButton
            class="w-7/12 text-sm max-h-11"
            @click.native="$emit('previewPrimaryClick', preview)"
            :loading="previewPriLoading"
            >{{ $t('set_profile_pic') }}</UButton
          >
          <UButton
            @click.native="$emit('previewSecondaryClick', preview)"
            :loading="previewSecLoading"
            class="w-4/12 bg-red-500 text-sm max-h-11 border-none"
            >{{ $t('delete') }}</UButton
          >
        </div>
      </ImagePreview>
    </transition>
  </div>
</template>

<script>
import Photo from './Photo.vue'
import ImagePreview from './ImagePreview.vue'
export default {
  name: 'Gallery',
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    highlight: {
      type: String,
      default: '',
    },
    addbutton: {
      type: Boolean,
      defult: false,
    },
  },
  components: { Photo, ImagePreview },
  data() {
    return {
      preview: false,
      previewPriLoading: false,
      previewSecLoading: false,
    }
  },

  methods: {
    dismiss() {
      this.preview = false
      this.previewPriLoading = false
      this.previewSecLoading = false
    },

    launchSelect() {
      this.$refs.upload.click()
    },
  },
}
</script>

<style lang="scss" scoped>
#gallery {
  .highlight {
    position: relative;
    &:after {
      content: 'Default';
      position: absolute;
      width: 100%;
      background: rgba(24, 24, 24, 0.781);
      color: white;
      padding: 0 4px;
      bottom: 0px;
      font-size: 12px;
      text-align: center;
      z-index: 0;
    }
  }
}
</style>
