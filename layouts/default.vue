<template>
  <div id="default-layout">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: ['auth'],
  methods: {},
  mounted() {},
}
</script>

<style></style>
