<template>
  <div id="auth-layout">
    <Nuxt />
  </div>
</template>

<script>
import Vue from 'vue'
import UbuLogo from '~/components/UbuLogo.vue'
export default Vue.extend({
  name: 'AuthLayout',
  components: { UbuLogo },
  middleware({ store, redirect }) {
    if (store.state.authenticated) {
      redirect('/')
    }
  },
})
</script>

<style lang="scss" scoped></style>
