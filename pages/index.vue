<template>
  <div id="home">
    <UButton
      class="bg-black w-10/12 m-auto mt-24"
      @click.native="$router.push('/onboard/owner')"
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
