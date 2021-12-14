<template>
  <div id="home-page" class="pt-10">
    <UTabs :activeIndex="activeIndex">
      <UTab v-for="salon in lite_salons" :key="salon.id">
        <LiveSalonView :lite_salon="salon" />
      </UTab>
    </UTabs>
  </div>
</template>

<script>
import LiveSalonView from '~/components/LiveSalonView.vue'
export default {
  name: 'DashHome',

  mounted() {
    this.$store.dispatch('salon/fetchLiteSalons')
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    lite_salons() {
      return this.$store.getters['salon/getLiteSalons']
    },
  },
  components: { LiveSalonView },
}
</script>
