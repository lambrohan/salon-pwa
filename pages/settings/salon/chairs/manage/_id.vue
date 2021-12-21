<template>
  <div id="manage-chair" v-if="chair.id">
    <div class="tlbr bg-primary flex items-center">
      <img
        src="/icons/arrow-back.svg"
        class="w-12 p-2"
        @click="$router.go(-1)"
      />
      <h4>Manage Chair</h4>
    </div>
    <div
      class="chairbtn w-28 h-28 m-auto mt-12 p-6 rounded-xl shadow-xl border-2"
      :class="chair.disabled ? 'border-red-500' : 'border-green-500'"
      @click="toggleStatus"
    >
      <img src="/icons/chair.svg" class="w-full h-full" />
    </div>
    <p class="text-xs text-center mt-4 text-gray-500">Created At</p>
    <p class="text-center text-xs">
      {{ $dayjs(chair.created_at).format('DD MMM, YYYY hh:mm A') }}
    </p>
    <div class="w-full p-4">
      <div class="dash bg-gray-100 text-sm p-4 rounded-lg">
        <p>
          Status -
          <span :class="chair.disabled ? 'text-red-500' : 'text-green-500'">{{
            chair.disabled ? 'Disabled' : 'Active'
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
  </div>
</template>

<script>
export default {
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
      const fetchChair = this.fetchChair
      const dialog = this.$Dialog.show({
        message: 'Are you sure want to disable the chair?',
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
  },
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
