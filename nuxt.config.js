export default {
  publicRuntimeConfig: {
    WS_GQL_URL: process.env.WS_GQL_URL,
    GQL_URL: process.env.GQL_URL,
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  env: {
    BASE_URL: process.env.BASE_URL,
  },

  server: {
    host: '0.0.0.0',
  },
  head: {
    title: 'UBU - My Salon',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'UBU My Salon for salon owners and stylists. Manage your online bookings and walk in customers.',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  router: {
    // middleware: ['auth'],
  },

  // serverMiddleware: ['~/serverMiddleware/validateFirebaseToken'],

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
    {
      src: '~/plugins/repository.ts',
    },

    {
      src: '~/plugins/tawk.js',
      mode: 'client',
    },

    {
      src: '~/plugins/dialog',
      mode: 'client',
    },

    {
      src: '~/plugins/apollo',
      mode: 'client',
    },
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
    '@nuxtjs/dayjs',
  ],

  dayjs: {
    defaultLocale: 'en',
    defaultTimeZone: 'Asia/Calcutta',
    plugins: ['timezone', 'duration'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

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
    extend(config) {
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      })
    },
  },
}
