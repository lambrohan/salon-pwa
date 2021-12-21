<template>
  <div id="home">
    <div class="content w-full h-screen items-center flex flex-col" v-if="user">
      <img src="/icon.png" alt="logo" class="w-2/3" />
      <h2 class="text-xl font-semibold">Welcome Administrator</h2>
      <p class="text-sm text-gray-500 mt-12">
        You are logged in as {{ user.phone_number }}
      </p>
      <UButton
        class="bg-success w-2/3 my-0 mt-4"
        @click.native="$router.push('/home')"
        >Continue to dashboard</UButton
      >
    </div>
  </div>
</template>

<script>
import Button from '~/components/U/Button.vue'
export default {
  name: 'HomePage',
  layout: 'default',
  middleware: ['ownerOrStylist'],
  mounted() {},
  components: { Button },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    partner() {
      return this.$store.getters.getPartner
    },
  },
}
</script>

<style></style>
