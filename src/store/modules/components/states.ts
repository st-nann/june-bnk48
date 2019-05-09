export default class State {
  public loading: boolean
  public modal_loading: boolean
  public toggle_sidebar: boolean
  public message: string
  public status: boolean

  constructor() {
    this.loading = true
    this.modal_loading = true
    this.toggle_sidebar = false
    this.message = ''
    this.status = false
  }
}
