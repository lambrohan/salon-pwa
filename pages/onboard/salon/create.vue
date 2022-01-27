<template>
  <div id="salon-onboard-create">
    <client-only>
      <SalonCreate @next="afterCreate" />
    </client-only>
  </div>
</template>

<script>
import SalonCreate from '~/components/onboard/salon-create.vue'
export default {
  name: 'SalonOnboardCreate',
  layout: 'onboard',
  components: { SalonCreate },
  data() {
    return {}
  },
  methods: {
    afterCreate(salon) {
      this.$router.push(this.localePath(`/onboard/salon/${salon.id}`))
    },
  },
}
</script>

<style></style>
