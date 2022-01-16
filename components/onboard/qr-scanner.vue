<template>
  <div id="scanqr" class="p-4">
    <h4 class="text-center mb-2">Scan the QR Code</h4>
    <div
      class="complete w-full flex flex-col items-center justify-center mt-12"
      v-if="completed"
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
      <p class="text-gray-500 mt-2">Scan Completed</p>
    </div>
    <div class="w-full" id="reader" v-show="!completed"></div>
  </div>
</template>

<script>
import { Html5QrcodeScanner } from 'html5-qrcode'
let scanner
export default {
  name: 'QRScanner',
  data() {
    return {
      completed: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.completed) {
        this.launchScanner()
      }
    })
  },
  methods: {
    launchScanner() {
      try {
        scanner = new Html5QrcodeScanner('reader', {
          fps: 10,
          qrbox: 250,
        })
        scanner.render(this.onScanSuccess)
      } catch (error) {
        console.log(error)
      }
    },
    onScanSuccess(decodedText) {
      scanner.clear()
      this.completed = true
      this.$emit('onScan', decodedText)
    },
  },
  beforeDestroy() {
    try {
      if (scanner) {
        scanner.clear()
      }
    } catch (error) {}
  },
}
</script>

<style lang="scss">
#scanqr {
  #reader {
    min-height: 400px;
    box-sizing: border-box;

    img {
      margin: auto;
    }

    button {
      max-width: 70%;
      border-radius: 12px;
      padding: 6px 12px;
      border: 0.5px solid rgba(0, 0, 0, 0.322);
      margin-bottom: 16px;
    }
  }
}
</style>
