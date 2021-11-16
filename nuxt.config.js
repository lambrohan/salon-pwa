export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    host: '0.0.0.0',
  },
  head: {
    title: 'salon-pwa',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  router: {
    // middleware: ['auth'],
  },

  serverMiddleware: ['~/serverMiddleware/validateFirebaseToken'],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vee-validate.js',
      ssr: false,
    },

    {
      src: '~/plugins/notifier.js',
      ssr: false,
    },

    {
      src: '~/plugins/firebase.js',
      ssr: true,
    },
    {
      src: '~/plugins/auth-cookie.js',
      ssr: false,
    },
    // {
    //   src: '~/plugins/axios.js',
    // },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  loading: '~/components/LoadingGlobal.vue',

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',

    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
  ],

  styleResources: {
    scss: ['~/assets/global.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BACKEND_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      theme_color: '#000000',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
  },
}
