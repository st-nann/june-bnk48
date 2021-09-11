import { MutationTree } from 'vuex'
import { mutation_type } from './mutation-types'
import State from './states'
import Vue from 'vue'

const mutations: MutationTree<State> = {
  [mutation_type.LOADING](state: State, modal: boolean): void {
    let name = modal ? 'modal_loading' : 'loading'
    Vue.set(state, name, true)
    setTimeout(function() {
      Vue.set(state, name, false)
    }, 1000)
  },
  [mutation_type.TOGGLE_SIDEBAR](state: State, page: string): void {
    if (state.toggle_sidebar) {
      Vue.set(state, 'toggle_sidebar', false)
    }
    setTimeout(function() {
      Vue.set(
        state,
        'toggle_sidebar',
        page === 'home' ? false : !state.toggle_sidebar
      )
    }, 100)
  },
  [mutation_type.SNACKBAR](state: State, data: object): void {
    Vue.set(state, 'message', data['txt'])
    Vue.set(state, 'status', data['type'])
  },
  [mutation_type.ISEXPIRE](state: State, data: boolean): void {
    Vue.set(state, 'isExpire', data)
  }
}

export default mutations
