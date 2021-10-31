<template>
  <div id="auth-layout">
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UbuLogo from '~/components/UbuLogo.vue'
export default Vue.extend({
  components: { UbuLogo },
  middleware({ store, redirect }) {
    if (store.state.authenticated) {
      redirect('/')
    }
  },
})
</script>

<style lang="scss" scoped></style>
