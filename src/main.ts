import Vue from 'vue'
import App from '@/App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import filters from './filters'
import colors from 'vuetify/es5/util/colors'
import VueYouTubeEmbed from 'vue-youtube-embed'
import './assets/stylus/main.styl'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

const VueClipboards = require('vue-clipboard2')

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    offwhite: '#dccfbf', // '#f4efe9',
    lightgrey: '#dfe0e0',
    purple: '#d7a9cd',
    darkblue: '#052480',
    coral: '#FF7F50',
    green: '#67c504',
    yellow: '#f7d63b',
    pink: '#fbbbd2',
    brown: '#ccaa76',
    info: colors.blue.base,
    warning: colors.amber.base,
    error: colors.red.base,
    success: colors.green.base
  }
})
Vue.use(VueClipboards)
Vue.use(VueYouTubeEmbed)

filters.init()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
