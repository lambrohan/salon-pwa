<template>
  <div id="home">
    <UButton
      class="bg-accent w-10/12 m-auto mt-24"
      @click.native="$router.push('/onboard/user')"
    >
      Get Started
    </UButton>
  </div>
</template>

<script>
import Button from '~/components/U/Button.vue'
export default {
  name: 'HomePage',
  mounted() {},
  components: { Button },
}
</script>

<style></style>
