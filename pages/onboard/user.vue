<template>
  <div id="owner-onboard" class="p-4">
    <UTabs :activeIndex="activeTabIndex">
      <UTab title="1">
        <OnboardUser @next="goNext" />
      </UTab>
      <UTab title="2">
        <h4 class="text-xl font-semibold text-center mt-8">
          {{ $t('alerts.onboarding_action') }}
        </h4>
        <UButton
          class="bg-accent m-auto mt-8 w-8/12"
          @click.native="$router.push(localePath('/onboard/salon/create'))"
          >{{ $t('register_new_salon') }}</UButton
        >
        <UButton
          class="m-auto mt-6 w-8/12"
          light
          @click.native="onboardStylist"
          >{{ $t('join_as_stylist') }}</UButton
        >
      </UTab>
    </UTabs>
  </div>
</template>

<script>
export default {
  name: 'OwnerOnboard',
  layout: 'onboard',
  middleware: ['norole'],
  components: {},
  data() {
    return {
      activeTabIndex: 0,
      loading: false,
    }
  },
  methods: {
    goNext(count) {
      if (count) {
        this.activeTabIndex = this.activeTabIndex + count
        return
      }
      this.activeTabIndex++
    },
    onboardStylist() {
      this.$router.push(this.localePath('/onboard/stylist'))
    },
  },
}
</script>

<style></style>
