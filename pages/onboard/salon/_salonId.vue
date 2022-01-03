<template>
  <div id="salon-onboard">
    <client-only>
      <UTabs :activeIndex="activeTabIndex">
        <UTab title="1">
          <SelectAddress @next="uploadAddress" ref="addressTab" />
        </UTab>
        <UTab title="2">
          <SalonPic @next="uploadPic" ref="picTab" />
        </UTab>
        <UTab title="3">
          <AddServices @next="saveServices" ref="serviceTab" />
        </UTab>
        <UTab>
          <SalonChair @next="$router.push('/settings')" />
        </UTab>
      </UTabs>
    </client-only>
  </div>
</template>

<script>
import SalonCreate from '~/components/onboard/salon-create.vue'
import SelectAddress from '~/components/onboard/select-address.vue'
import SalonPic from '~/components/onboard/salon-pic.vue'
import AddServices from '~/components/onboard/add-services.vue'
import SalonChair from '~/components/onboard/salon-chair.vue'
export default {
  name: 'SalonOnboard',
  layout: 'onboard',
  components: {
    SalonCreate,
    SelectAddress,
    SalonPic,
    AddServices,
    SalonChair,
  },
  data() {
    return {
      activeTabIndex: 0,
      salon: false,
    }
  },
  methods: {
    afterCreate(salon) {
      this.salon = salon
      this.activeTabIndex++
    },
    async uploadAddress(result) {
      if (!result) {
        this.$Toast.danger('Please select location first')
      }
      try {
        this.$refs.addressTab.btnLoading = true
        await this.$axios.$put(`/salon-profile/${this.$route.params.salonId}`, {
          latitude: result.geometry.location.lat(),
          longitude: result.geometry.location.lng(),
          address: result.formatted_address,
        })
        this.$Toast.success('Done')
        this.$refs.addressTab.btnLoading = false
        this.activeTabIndex++
      } catch (error) {
        this.$refs.addressTab.btnLoading = false
        this.$Toast.danger('Something went wrong!')
      }
    },

    async uploadPic(file) {
      if (!file) {
        this.$Toast.danger('File not found')
        return
      }
      try {
        const data = new FormData()
        data.append('files', file, file.name)
        this.$refs.picTab.btnLoading = true
        const profile = await this.$axios.$post(
          `/salon-profile/images/${this.$route.params.salonId}`,
          data
        )

        await this.$axios.$post('/salon-profile/default_picture', {
          fileId: profile.images[0].id,
          salonId: this.$route.params.salonId,
        })

        this.$refs.picTab.btnLoading = false
        this.$Toast.success('Done')
        this.activeTabIndex++
      } catch (error) {
        console.log(error)
        this.$refs.picTab.btnLoading = false
        this.$Toast.danger('Something went wrong')
      }
    },

    async saveServices(services) {
      try {
        this.$refs.serviceTab.$refs.priceTab.loading = true
        await this.$axios.$post('salon-service', {
          services,
          salon: this.$route.params.salonId,
        })

        this.$Toast.success('Services Added')
        this.activeTabIndex++
      } catch (error) {
        console.log(error)
        this.$refs.serviceTab.$refs.priceTab.loading = false
        if (error.response?.data) {
          this.$Toast.danger(error.response.data.message)
        }
      }
    },
  },
}
</script>

<style></style>
