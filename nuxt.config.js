export default {
  dev: process.env.NODE_ENV !== 'production',

  env: {
    RUNTIME_CLIENT: process.env.RUNTIME_CLIENT,
    HTTP_HOST: process.env.HTTP_HOST,
    ASSET_URL: process.env.ASSET_URL,
  },

  server: {
    port: 30576, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: true,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Web运营活动',
    htmlAttrs: {
      lang: 'zh-CN',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'viewport-fit=cover,width=device-width,maximum-scale=1,minimum-scale=1,initial-scale=1,user-scalable=no',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vant/lib/image/style',
    'vant/lib/col/style',
    'vant/lib/row/style',
    'vant/lib/overlay/style',
    'vant/lib/divider/style',
    '~/style/index.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/vant', { src: '@/plugins/window-listener', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'postcss-px-to-viewport': {
          viewportWidth: 1920,
          unitPrecision: 6,
          propList: ['*'],
          // selectorBlackList: [/^(?!\.van-(divider|button))/],
          include: /\/src\//,
          landscapeWidth: 1080,
        },
      },
    },
  },
};
