<template>
  <div id="photo">
    <img
      :src="image.url"
      alt="image"
      class="w-full h-full object-cover rounded"
    />
  </div>
</template>

<script>
export default {
  name: 'Photo',
  props: ['image'],
  data() {
    return {}
  },
}
</script>

<style></style>
