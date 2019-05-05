import Vue from 'vue'
import Vuex from 'vuex'
import Components from './modules/components/index'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    components: Components
  }
})

export default store
