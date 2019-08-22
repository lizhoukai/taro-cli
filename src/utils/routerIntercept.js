import Taro from '@tarojs/taro'

function toLogin() {
  Taro.clearStorage()
  Taro.redirectTo({ url: '/subpackages/wxAuthor/index' })
}

/**
 * 路由拦截器
 * @param {Boolean} flag [开关权限]
 */
const routerIntercept = (flag = true) => {
  return new Promise((resolve, reject) => {
    if (flag) {
      const USER_INFO = Taro.getStorageSync('userInfo')
      if (USER_INFO) {
        resolve()
      } else {
        toLogin()
        reject('未登录无权限，重定向到授权页面')
      }
    } else {
      toLogin()
      reject('未登录无权限，重定向到授权页面')
    }
  })
}

// eslint-disable-next-line
export { routerIntercept }
