<template>
  <div id="add-walkin" class="p-6">
    <UTabs :activeIndex="activeIndex">
      <UTab>
        <h4 class="font-semibold text-xl text-center mb-4 text-gray-500">
          Add Walk-In Customer
        </h4>
        <validation-observer ref="observer">
          <form @submit.prevent="">
            <validation-provider
              rules="required|digits:10"
              v-slot="{ errors, classes }"
            >
              <input
                type="number"
                v-model="mobile"
                placeholder="enter mobile number"
                name="mobile"
                @input="
                  mobile.length > 10 ? (mobile = mobile.substring(0, 10)) : ''
                "
                class="p-3 bg-gray-50 w-full text-center rounded mt-4 border text-lg tracking-widest"
                :class="classes"
              />
              <span
                class="text-xs text-red-500 leading-none block mt-1 text-center"
                >{{ errors[0] }}</span
              >
            </validation-provider>
          </form>
        </validation-observer>
        <UButton class="bg-accent mt-6 w-3/4" @click.native="onMobileConfirm"
          >Continue</UButton
        >
      </UTab>
      <UTab>
        <QuickServiceSelector :salonId="salonId" @next="addWalkin" />
      </UTab>
    </UTabs>
  </div>
</template>

<script>
import QuickServiceSelector from './QuickServiceSelector.vue'
export default {
  name: 'AddWalkinComp',
  props: {
    salonId: {
      type: String,
    },
  },
  data() {
    return {
      activeIndex: 0,
      mobile: '',
    }
  },

  mounted() {},
  methods: {
    async onMobileConfirm() {
      if (!(await this.$refs.observer.validate())) {
        this.$Toast.danger('Mobile number is not valid')
        return
      }
      this.activeIndex++
    },

    async addWalkin(services) {
      this.$emit('onConfirm', { services, mobile: '+91' + this.mobile })
    },

    clear() {
      this.activeIndex = 0
      this.mobile = ''
    },
  },

  components: { QuickServiceSelector },
}
</script>

<style></style>
