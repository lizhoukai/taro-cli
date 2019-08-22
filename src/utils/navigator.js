/*
 * @Author: 余树
 * @Date: 2019-08-22 10:35:28
 * @Last Modified by:   余树
 * @Last Modified time: 2019-08-22 10:35:28
 * 全局路由层级拦截
 */

import Taro from '@tarojs/taro'

const navigateTo = object => {
  console.log('当前页面层级数:', Taro.getCurrentPages().length)
  if (Taro.getCurrentPages().length > 9) {
    Taro.redirectTo(object)
  } else {
    Taro.navigateTo(object)
  }
}

export default navigateTo
