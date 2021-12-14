<template>
  <client-only>
    <div id="kyc-page">
      <div class="flex items-center">
        <img
          src="/icons/arrow-back.svg"
          alt="back"
          class="w-12 h-12 p-2"
          @click="$router.go(-1)"
        />
        <h4 class="text-lg text-center">Salon Kyc</h4>
      </div>
      <div class="wrapper p-3 px-4" v-if="salon.profile && !salon.kyc">
        <validation-observer>
          <form @submit.prevent="">
            <h4 class="font-semibold text-xl">{{ salon.profile.name }}</h4>

            <!-- INFO -->

            <validation-provider
              v-slot="{ errors, classes }"
              rules="required|numeric"
            >
              <label for="Account No" class="mt-4">Bank Account Number</label>
              <input
                type="number"
                name="account number"
                placeholder="enter your account no"
                v-model="bank.ac_no"
                :class="classes"
              />
              <span class="text-xs text-red-500 leading-none block mt-1">{{
                errors[0]
              }}</span>
            </validation-provider>

            <validation-provider
              v-slot="{ errors, classes }"
              rules="required|alpha_num"
            >
              <label for="IFSC" class="mt-4">IFSC Code</label>
              <input
                type="text"
                name="ifsc code"
                placeholder="enter bank ifsc code"
                v-model="bank.ifsc"
                :class="classes"
              />
              <span class="text-xs text-red-500 leading-none block mt-1">{{
                errors[0]
              }}</span>
            </validation-provider>

            <validation-provider
              v-slot="{ errors, classes }"
              rules="required|alpha_num"
            >
              <label for="Pan No" class="mt-4">Owner's PAN Number</label>
              <input
                type="text"
                v-model="owner.pan_no"
                placeholder="enter your PAN no"
                name="Pan Number"
                :class="classes"
              />
              <span class="text-xs text-red-500 leading-none block mt-1">{{
                errors[0]
              }}</span>
            </validation-provider>

            <hr class="mt-6" />
            <!-- DOCS -->

            <label for="Salon Proof" class="text-sm mt-4"
              >Registration Certificate</label
            >
            <p class="text-xs my-1 text-gray-500">
              Upload registration or incorporation certificate having salon name
              clearly visible
            </p>
            <FileInput
              labelName="Salon Document"
              class="mt-1"
              accept="image/jpg,image/jpeg,image/png,application/pdf"
              v-model="files.salon_proof"
            />

            <label for="Bank Proof" class="text-sm mt-4"
              >Bank Account Document</label
            >
            <p class="text-xs my-1 text-gray-500">
              Upload cancelled cheque or bank statement where account number &
              IFSC code are clearly visible
            </p>
            <FileInput
              labelName="Bank Document"
              class="mt-1"
              v-model="files.bank_proof"
            />

            <label for="PAN Card" class="text-sm mt-4">PAN Document</label>
            <p class="text-xs my-1 text-gray-500">Upload PAN card photo</p>
            <FileInput name="PAN Card" class="mt-1" v-model="files.owner_pan" />
          </form>
        </validation-observer>
        <UButton
          class="bg-accent rounded mt-8"
          @click.native="upload"
          :loading="uploadLoading"
          >Upload & Save</UButton
        >
      </div>
      <div class="kyc-done flex flex-col items-center mt-12" v-if="salon.kyc">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-20 w-20 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <h4 class="text-green-600 font-semibold text-lg">Salon is verified</h4>
        <p class="text-sm text-gray-500">
          You have already completed the kyc verification
        </p>

        <div
          class="flex items-center mt-8 cursor-pointer"
          @click="$router.go(-1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-500 p-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span class="text-blue-500 ml-1"> Back to settings </span>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import FileInput from '~/components/U/FileInput.vue'
export default {
  name: 'KYCPage',
  components: { FileInput },
  layout: 'onboard',
  data() {
    return {
      salon: {},
      bank: {},
      files: {},
      owner: {},
      uploadLoading: false,
    }
  },
  mounted() {
    this.fetchSalon()
  },
  methods: {
    async fetchSalon() {
      this.salon = await this.$salonRepository.getById(
        this.$route.params.salonId
      )
    },

    async upload() {
      try {
        this.uploadLoading = true
        const formData = new FormData()
        formData.append(
          'salon_proof',
          this.files.salon_proof[0],
          this.files.salon_proof[0].name
        )
        formData.append(
          'bank_proof',
          this.files.bank_proof[0],
          this.files.bank_proof[0].name
        )
        formData.append(
          'owner_pan',
          this.files.owner_pan[0],
          this.files.owner_pan[0].name
        )
        formData.append('owner_pan_no', this.owner.pan_no)
        formData.append('bank_ac_no', this.bank.ac_no)
        formData.append('ifsc_code', this.bank.ifsc)

        await this.$axios.$post(`/salon/kyc/${this.salon.id}`, formData)

        this.uploadLoading = false
        this.$Toast.success('Kyc Updated')
        this.$router.go(-1)
      } catch (error) {
        this.uploadLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#kyc-page {
  label {
    display: block;
    font-size: 12px;
  }

  input {
    padding: 8px 12px;
    width: 100%;
    margin-top: 4px;
    border: 0.5px solid rgb(204, 204, 204);
    border-radius: 4px;
  }
}
</style>
