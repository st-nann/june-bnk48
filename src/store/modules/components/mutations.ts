import { MutationTree } from 'vuex'
import { mutation_type } from './mutation-types'
import State from './states'
import Vue from 'vue'

const mutations: MutationTree<State> = {
  [mutation_type.LOADING](state: State): void {
    Vue.set(state, 'loading', true)
    setTimeout(function() {
      Vue.set(state, 'loading', false)
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
  }
}

export default mutations
