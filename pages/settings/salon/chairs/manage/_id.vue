<template>
  <div id="manage-chair" v-if="chair.id">
    <div class="tlbr bg-primary flex items-center">
      <img
        src="/icons/arrow-back.svg"
        class="w-12 p-2"
        @click="$router.go(-1)"
      />
      <h4>{{ $t('manage_chair') }}</h4>
    </div>
    <div
      class="chairbtn w-28 h-28 m-auto mt-12 p-6 rounded-xl shadow-xl border-2"
      :class="chair.disabled ? 'border-red-500' : 'border-green-500'"
      @click="toggleStatus"
    >
      <img src="/icons/chair.svg" class="w-full h-full" />
    </div>
    <p class="text-xs text-center mt-4 text-gray-500">{{ $t('created_at') }}</p>
    <p class="text-center text-xs">
      {{ $dayjs(chair.created_at).format('DD MMM, YYYY hh:mm A') }}
    </p>
    <div class="w-full p-4">
      <div class="dash bg-gray-100 text-sm p-4 rounded-lg">
        <p>
          {{ $t('status') }} -
          <span :class="chair.disabled ? 'text-red-500' : 'text-green-500'">{{
            chair.disabled ? $t('disabled') : $t('enabled')
          }}</span>
        </p>

        <p class="mt-1">
          Stylist -
          <span class="text-green-500">{{
            chair.stylist ? chair.stylist.display_name : 'not assigned'
          }}</span>
        </p>
      </div>
    </div>
    <Button
      class="bg-red-500 w-3/4 mt-2"
      @click.native="deleteChair"
      v-if="!chair.stylist"
      >{{ $t('delete') }}</Button
    >
  </div>
</template>

<script>
import Button from '~/components/U/Button.vue'
export default {
  name: 'ManageSalonChair',
  layout: 'default',
  data() {
    return {
      chair: {},
    }
  },
  mounted() {
    this.fetchChair()
  },
  methods: {
    async fetchChair() {
      this.chair = await this.$chairRepository.getById(this.$route.params.id)
    },
    async toggleStatus() {
      if (this.chair.disabled) {
        this.enableChair()
      } else {
        this.disableChair()
      }
    },
    async enableChair() {
      try {
        this.chair = await this.$chairRepository.toggle(this.chair.id)
      } catch (error) {
        this.$Toast.danger(error.response.data.message)
      }
    },
    async disableChair() {
      const chair = this.chair
      const dialog = this.$Dialog.show({
        message: this.$t('alerts.disable_chair'),
        positiveText: this.$t('confirm'),
        negativeText: this.$t('cancel'),
        positiveHandler: async () => {
          try {
            dialog.positiveLoading = true
            this.chair = await this.$chairRepository.toggle(chair.id)
            dialog.dismiss()
          } catch (error) {
            this.$Toast.danger(error.response.data.message)
            dialog.positiveLoading = false
          }
        },
      })
    },
    async deleteChair() {
      const chair = this.chair
      const dialog = this.$Dialog.show({
        message: this.$t('alerts.delete_chair'),
        positiveText: this.$t('confirm'),
        negativeText: this.$t('cancel'),
        positiveHandler: async () => {
          try {
            dialog.positiveLoading = true
            this.chair = await this.$chairRepository.validateChair(chair.id)
            this.$Toast.success('Chair Removed')
            this.$router.go(-1)
            dialog.dismiss()
          } catch (error) {
            this.$Toast.danger(error.response.data.message)
            dialog.positiveLoading = false
          }
        },
      })
    },
  },
  components: { Button },
}
</script>

<style lang="scss">
#manage-chair {
  .chairbtn {
    transition: 0.3s ease all;
    transform-origin: center;
    &:active {
      box-shadow: none;
      transform: translateY(3px);
    }
  }
}
</style>
