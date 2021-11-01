<template>
  <div id="owner-onboard">
    <UTabs :activeIndex="activeTabIndex">
      <UTab title="1"> <OnboardU @next="activeTabIndex++" /> </UTab>
      <UTab title="2"> <OnboardSalon /> </UTab>
    </UTabs>
  </div>
</template>

<script>
import Tabs from '~/components/U/Tabs.vue'
import Tab from '~/components/U/Tab.vue'
import Salon from '~/components/onboard/salon.vue'
export default {
  name: 'OwnerOnboard',
  layout: 'onboard',
  components: { Tabs, Tab, Salon },
  data() {
    return {
      activeTabIndex: 0,
    }
  },
}
</script>

<style></style>
