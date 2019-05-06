import { observable, action } from 'mobx'

class orderStore {
  @observable object
  items = {}

  @action
  setDetail(items) {
    this.items = items
  }
}

export default new orderStore()
