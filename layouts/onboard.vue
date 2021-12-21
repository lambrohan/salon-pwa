<template>
  <div id="onboard-layout">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'OnboardLayout',
  middleware: ['auth', 'norole'],
  methods: {},
  mounted() {},
}
</script>

<style></style>
