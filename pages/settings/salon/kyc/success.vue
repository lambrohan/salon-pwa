<template>
  <div
    id="success"
    class="bg-white h-screen w-full flex flex-col items-center p-12"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-20 w-20 text-success"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clip-rule="evenodd"
      />
    </svg>
    <h4 class="text-lg font-medium mt-4">{{ $t('kyc_submitted') }}</h4>
    <p class="text-sm text-gray-500 text-center mt-8">
      {{ $t('kyc_disc') }}
    </p>
    <div class="mt-4 text-md text-gray-500">
      You can
      <span class="text-success underline">
        <a href="https://ubuapk.page.link/salon">{{ $t('go_back_app') }}</a>
      </span>
      or
      <span
        class="text-black underline"
        @click="$router.push(localePath('/settings'))"
        >{{ $t('browse_here') }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalonSuccess',
  methods: {
    close() {
      window.close()
    },
  },
}
</script>

<style></style>
