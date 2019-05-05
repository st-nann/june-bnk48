import Vue from 'vue'
import App from '@/App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import filters from './filters'
import colors from 'vuetify/es5/util/colors'
import './assets/stylus/main.styl'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

const VueClipboards = require('vue-clipboard2')

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    offwhite: '#f4efe9',
    lightgrey: '#dfe0e0',
    yellow: '#f1e7b7',
    cinnamon: '#e0b265',
    lightblue: '#d6eff8',
    darkblue: '#3f4559',
    info: colors.blue.base,
    warning: colors.amber.base,
    error: colors.red.base,
    success: colors.green.base
  }
})
Vue.use(VueClipboards)

filters.init()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
