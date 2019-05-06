import Taro from '@tarojs/taro'

// 请求库适配
if (Taro.getEnv() === 'ALIPAY') {
  var Fly = require('flyio/dist/npm/ap') // eslint-disable-line
} else {
  var Fly = require('flyio/dist/npm/wx') // eslint-disable-line
}
const http = new Fly()

console.log('当前开发环境:', process.env.NODE_ENV)
console.log('==========', `${$API_TARGET}/api`, '==========')
http.config.timeout = 15000
http.config.baseURL = `${$API_TARGET}/api`

// 状态码错误信息
const CODE_MESSAGE = {
  400: '请求错误,未找到该资源!',
  401: '当前用户未授权，请重新登录!',
  403: '用户得到授权，但是访问是被禁止的!',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作!',
  406: '请求的格式不可得!',
  410: '请求的资源被永久删除，且不会再得到的!',
  422: '当创建一个对象时，发生一个验证错误!',
  500: '服务器发生错误，请检查服务器!',
  502: '网络错误!',
  503: '服务不可用!',
  504: '网络超时!',
  505: 'http版本不支持该请求!'
}

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  if (Taro.getStorageSync('token')) {
    config.headers = {
      Authorization: `Token ${Taro.getStorageSync('token')}`
    }
  }
  Taro.showLoading({ title: '正在加载...' })
  return config
})

/**
 * 响应拦截
 */
http.interceptors.response.use(
  res => {
    Taro.hideLoading()
    if (res && res.data && res.data.code !== 0) {
      Taro.showToast({
        title: res.data.msg,
        icon: 'none'
      })
      if (res.data.code === 401) {
        Taro.clearStorage()
        Taro.redirectTo({ url: '../pages/login/login' })
      }
    }
    return res.data
  },
  error => {
    if (error && error.response) {
      Taro.showToast({
        title: CODE_MESSAGE[error.response.status],
        icon: 'none'
      })

      if (error.response.status === 401) {
        Taro.clearStorage()
        Taro.redirectTo({ url: '../pages/login/login' })
      }
    } else {
      Taro.showToast({
        title: '连接到服务器失败!',
        icon: 'none'
      })
    }
    Taro.hideLoading()
    return Promise.reject(error)
  }
)

export default http
