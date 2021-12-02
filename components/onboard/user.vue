<template>
  <client-only>
    <form
      id="user-info"
      class="flex flex-col p-6 pt-16"
      @submit.prevent="onSubmit"
    >
      <h4 class="text-2xl font-semibold mb-6">Personal Information</h4>
      <label for="name" class="mb-1 text-sm text-gray-500">Full Name</label>
      <validation-provider v-slot="{ errors, classes }" rules="required">
        <input
          name="name"
          type="text"
          placeholder="eg. Elon Musk"
          class="p-3.5 rounded border w-full"
          :class="classes"
          v-model="name"
        />
        <span class="text-sm text-red-500">{{ errors[0] }}</span>
      </validation-provider>

      <label for="name" class="mb-1 text-sm text-gray-500 mt-6">Email</label>
      <validation-provider v-slot="{ errors, classes }" rules="required|email">
        <input
          name="email"
          type="email"
          placeholder="elon@tesla.com"
          class="p-3.5 rounded border w-full"
          v-model="email"
          :disabled="user && user.email"
          :class="classes"
        />
        <span class="text-sm text-red-500">{{ errors[0] }}</span>
      </validation-provider>

      <label for="date" class="mt-6 text-sm mb-1 text-gray-500"
        >Birthdate</label
      >
      <validation-provider v-slot="{ errors, classes }" rules="required">
        <input
          name="Birthdate"
          type="date"
          format="mm-dd-yyyy"
          placeholder="birthdate"
          class="p-3.5 w-full bg-white border rounded"
          v-model="birth_date"
          :class="classes"
        />
        <span class="text-sm text-red-500">{{ errors[0] }}</span>
      </validation-provider>

      <label for="gender" class="mt-6 text-sm mb-1 text-gray-500">Gender</label>
      <validation-provider v-slot="{ errors, classes }" rules="required">
        <select
          name="gender"
          class="p-3.5 bg-white border rounded w-full"
          v-model="gender"
          :class="classes"
        >
          <option value="" disabled>Select</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="Rather Not Say">Rather Not Say</option>
        </select>
        <span class="text-sm text-red-500">{{ errors[0] }}</span>
      </validation-provider>
      <UButton
        class="bg-accent h-14 mt-8"
        @click.native="onSubmit"
        :loading="loading"
        >Save &amp; Continue</UButton
      >
    </form>
  </client-only>
</template>

<script>
export default {
  name: 'UserInfoBoarding',
  data() {
    return {
      name: '',
      birth_date: '',
      gender: '',
      email: '',
      loading: false,
    }
  },
  mounted() {
    this.fillExisting()
  },
  methods: {
    async onSubmit() {
      const { name, email, birth_date, gender } = this

      try {
        this.loading = true
        await this.$axios.put('/user-profile/', {
          full_name: name,
          email,
          birth_date,
          gender,
        })

        this.$Toast.success('Done')
        this.loading = false
        this.$emit('next')
      } catch (error) {
        this.loading = false

        const msg = error.response?.data?.message

        if (!msg) {
          this.$Toast.danger('Something went wrong!')
        }
        if (typeof msg != String) {
          this.$Toast.danger(msg[0])
        } else {
          this.$Toast.danger(msg)
        }
      }
    },

    fillExisting() {
      if (this.user && this.user.profile) {
        this.name = this.user.profile.full_name
        this.birth_date = this.user.profile.birth_date
        this.email = this.user.email
        this.gender = this.user.profile.gender
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
      this.fillExisting()
    },
  },
}
</script>

<style></style>
