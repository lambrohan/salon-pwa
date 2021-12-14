<template>
  <div id="notify-user" class="p-4">
    <h4 class="text-center">Notify User</h4>
    <textarea
      placeholder="enter message"
      class="w-full bg-gray-100 p-3 rounded mt-4"
      rows="4"
      v-model="message"
    ></textarea>

    <UButton
      class="bg-accent mt-4 w-3/4 mb-1"
      @click.native="$emit('onConfirm', message)"
      >Submit</UButton
    >
  </div>
</template>

<script>
export default {
  name: 'NotifyUser',
  data() {
    return {
      message: '',
    }
  },
}
</script>

<style></style>
