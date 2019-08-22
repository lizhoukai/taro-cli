/*
 * @Author: 余树
 * @Date: 2019-05-28 10:45:58
 * @Last Modified by: 余树
 * @Last Modified time: 2019-08-22 11:06:46
 */

import { observable } from 'mobx'

const userStore = observable({
  phoneModel: '',
  handlePhoneModel(v) {
    this.phoneModel = v
  }
})

export default userStore
