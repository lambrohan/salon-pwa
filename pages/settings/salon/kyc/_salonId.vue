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
        <h4 class="text-lg text-center">{{ $t('salon_kyc') }}</h4>
      </div>
      <div class="wrapper p-3 px-4" v-if="salon.profile && !salon.kyc">
        <validation-observer ref="kycForm">
          <form @submit.prevent="">
            <h4 class="font-semibold text-xl">{{ salon.profile.name }}</h4>

            <p v-if="kyc" class="text-sm text-gray-500 mt-1">
              {{ $t('status') }}:
              <span class="text-black">{{ kyc.remarks }}</span>
            </p>

            <!-- INFO -->

            <validation-provider
              v-slot="{ errors, classes }"
              rules="required|numeric"
            >
              <label for="Account No" class="mt-4">{{
                $t('bank_ac_no')
              }}</label>
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
              <label for="IFSC" class="mt-4">{{ $t('ifsc_code') }}</label>
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
              <label for="Pan No" class="mt-4">{{ $t('owner_pan') }}</label>
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

            <label for="Salon Proof" class="text-sm mt-4">{{
              $t('reg_cert')
            }}</label>
            <p class="text-xs my-1 text-gray-500">
              {{ $t('reg_cert_info') }}
            </p>
            <FileInput
              labelName="Salon Document"
              class="mt-1"
              rules="required|size:2000"
              accept="image/jpg,image/jpeg,image/png,application/pdf"
              v-model="files.salon_proof"
            />

            <label for="Bank Proof" class="text-sm mt-4">{{
              $t('bank_ac_doc')
            }}</label>
            <p class="text-xs my-1 text-gray-500">
              {{ $t('bank_doc_info') }}
            </p>
            <FileInput
              labelName="Bank Document"
              class="mt-1"
              rules="required|size:2000"
              v-model="files.bank_proof"
            />

            <label for="PAN Card" class="text-sm mt-4">{{
              $t('pan_doc')
            }}</label>
            <p class="text-xs my-1 text-gray-500">{{ $t('pan_doc_info') }}</p>
            <FileInput
              name="PAN Card"
              class="mt-1"
              v-model="files.owner_pan"
              rules="required|size:2000"
            />
          </form>
        </validation-observer>

        <UButton
          class="bg-accent rounded mt-8"
          @click.native="upload"
          :loading="uploadLoading"
          >{{ $t('save_n_continue') }}</UButton
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
        <h4 class="text-green-600 font-semibold text-lg">
          {{ $t('salon_verified') }}
        </h4>
        <p class="text-sm text-gray-500">
          {{ $t('already_kyc') }}
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
          <span class="text-blue-500 ml-1"> {{ $t('back_to_settings') }} </span>
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
  layout: 'default',
  data() {
    return {
      salon: {},
      bank: {},
      files: {},
      owner: {},
      uploadLoading: false,
      kyc: false,
    }
  },
  mounted() {
    this.fetchSalon()
  },
  methods: {
    async fetchSalon() {
      if (!this.user) return
      this.salon = await this.$salonRepository.getById(
        this.$route.params.salonId
      )

      this.kyc = await this.$salonRepository.getKyc(this.$route.params.salonId)
      console.log(this.kyc)

      if (this.kyc) {
        const {
          bank_ac_no,
          bank_ifsc,
          owner_pan_no,
          salon_id_proof,
          bank_proof_cert,
          owner_pan_cert,
        } = this.kyc

        this.bank = {
          ac_no: bank_ac_no,
          ifsc: bank_ifsc,
        }
        this.owner = {
          pan_no: owner_pan_no,
        }

        this.files = {
          salon_proof: salon_id_proof,
          bank_proof: bank_proof_cert,
          owner_pan: owner_pan_cert,
        }
      }
    },

    async upload() {
      if (!(await this.$refs.kycForm.validate())) return
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
        formData.append('bank_ifsc', this.bank.ifsc)

        await this.$axios.$post(`/salon/kyc/${this.salon.id}`, formData)

        this.uploadLoading = false
        this.$Toast.success('Kyc Updated')
        this.$router.push(this.localePath(`/settings/salon/kyc/success`))
      } catch (error) {
        this.uploadLoading = false
      }
    },
  },

  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },

  watch: {
    user() {
      this.fetchSalon()
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
