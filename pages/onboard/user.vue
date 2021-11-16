<template>
  <div id="owner-onboard" class="p-4">
    <UTabs :activeIndex="activeTabIndex">
      <UTab title="1">
        <OnboardUser @next="goNext" />
      </UTab>
      <UTab title="2">
        <h4 class="text-xl font-semibold text-center mt-8">
          Please select a action to continue onboarding
        </h4>
        <UButton
          class="bg-black mt-8"
          @click.native="$router.push('/onboard/salon/create')"
          >Register new salon</UButton
        >
        <UButton class="mt-6" light>Join a salon as stylist</UButton>
      </UTab>
    </UTabs>
  </div>
</template>

<script>
export default {
  name: 'OwnerOnboard',
  layout: 'onboard',
  components: {},
  data() {
    return {
      activeTabIndex: 1,
    }
  },
  methods: {
    goNext() {
      this.activeTabIndex++
    },
  },
}
</script>

<style></style>
