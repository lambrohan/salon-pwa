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
          class="bg-accent m-auto mt-8 w-8/12"
          @click.native="$router.push('/onboard/salon/create')"
          >Register new salon</UButton
        >
        <UButton class="m-auto mt-6 w-8/12" light
          >Join a salon as stylist</UButton
        >
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
