import { ActionContext, ActionTree } from 'vuex'
import { mutation_type } from './mutation-types'
import State from './states'

const actions: ActionTree<State, State> = {
  updateLoading({ commit }: ActionContext<State, State>, modal: boolean): void {
    commit(mutation_type.LOADING, modal)
  },
  updateToggleSidebar(
    { commit }: ActionContext<State, State>,
    page: string
  ): void {
    commit(mutation_type.TOGGLE_SIDEBAR, page)
  },
  updateSnackbar({ commit }: ActionContext<State, State>, data: object): void {
    commit(mutation_type.SNACKBAR, data)
    setTimeout(() => {
      commit(mutation_type.SNACKBAR, { txt: '', type: '' })
    }, 5000)
  },
  updateIsExpire({ commit }: ActionContext<State, State>, data: object): void {
    commit(mutation_type.ISEXPIRE, data)
  }
}

export default actions
