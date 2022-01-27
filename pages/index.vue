<template>
  <div id="home">
    <div class="content w-full h-screen items-center flex flex-col" v-if="user">
      <img src="/icon.png" alt="logo" class="w-2/3" />
      <div class="hidden">
        <nuxt-link
          v-for="locale in availableLocales"
          :ref="locale.code"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
        ></nuxt-link>
      </div>

      <h2 class="text-xl font-semibold">{{ $t('welcome') }}</h2>
      <div class="w-full flex flex-col items-center mt-4">
        <h4 class="text-sm text-gray-500 mb-1">{{ $t('select_lang') }}</h4>
        <select
          v-model="defaultLocale"
          @input="localeChange"
          class="bg-white w-6/12 py-2 border rounded-full langselect text-center"
        >
          <option
            :value="locale.code"
            v-for="locale in availableLocales"
            :key="locale.code"
          >
            {{ locale.name }}
          </option>
        </select>
      </div>
      <p class="text-sm text-gray-500 mt-12">
        {{ $t('loggedin_as') + user.phone_number }}
      </p>
      <UButton
        class="bg-success w-2/3 my-0 mt-4"
        @click.native="
          $router.push(
            localePath({
              name: 'home',
            })
          )
        "
      >
        {{ $t('continue_to_dash') }}
      </UButton>
    </div>
  </div>
</template>

<script>
import Button from '~/components/U/Button.vue'
export default {
  name: 'HomePage',
  layout: 'default',
  middleware: ['ownerOrStylist'],
  data() {
    return {
      defaultLocale: this.$i18n.locale,
    }
  },
  mounted() {},
  methods: {
    localeChange(e) {
      this.$refs[e.target.value][0].$el.click()
    },
  },
  components: { Button },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    availableLocales() {
      return this.$i18n.locales
    },
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
.langselect {
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
}
</style>
