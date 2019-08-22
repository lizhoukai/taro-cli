/*
纯javascript基于数据的表单验证
@params {object} form表单数据
@params {object} rules对应表单数据的验证规则
内置有lphone,email,idcard验证，同时支持正则pattern和自定义验证方法validator
小程序不支持 throw new Error() 报错
*/

import Taro from '@tarojs/taro'

function checkRule(value, rule) {
  // 非空验证
  if (rule.required) {
    // 0是false，需要规避掉
    if (!value && typeof value != 'number') {
      Taro.showToast({ title: `请输入${rule.message}`, icon: 'none', duration: 2000 })
      return false
    }
    // 空数组和空对象也被认为是空
    if (typeof value == 'object' && Object.values(value).length == 0) {
      Taro.showToast({ title: `请输入${rule.message}`, icon: 'none', duration: 2000 })
      return false
    }
  }
  // 正则验证
  if (rule.pattern && !rule.pattern.test(value)) {
    Taro.showToast({ title: `请输入正确的${rule.message}`, icon: 'none', duration: 2000 })
    return false
  }
  // 内置常见的验证
  if (rule.type) {
    switch (rule.type) {
      case 'mobile':
        if (!/^1[3456789]\d{9}$/.test(value)) {
          Taro.showToast({ title: `请输入正确的${rule.message}`, icon: 'none', duration: 2000 })
          return false
        }
        break

      // 大写字母
      case 'capital':
        if (!/^[A-Z]+$/.test(value)) {
          Taro.showToast({ title: `请输入正确的${rule.message}`, icon: 'none', duration: 2000 })
          return false
        }
        break
      case 'idcard':
        if (
          !/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
            value
          )
        ) {
          Taro.showToast({ title: `请输入正确的${rule.message}`, icon: 'none', duration: 2000 })
          return false
        }
        break

      case 'traffic':
        if (!/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(value)) {
          Taro.showToast({ title: `请输入正确的${rule.message}`, icon: 'none', duration: 2000 })
          return false
        }
        break
      case 'zipCode':
        if (!/^[0-9]{6}$/.test(value)) {
          Taro.showToast({ title: `请输入正确的${rule.message}`, icon: 'none', duration: 2000 })
          return false
        }
        break
      case 'number':
        if (!/^\d+$/.test(value)) {
          Taro.showToast({ title: `请输入正确的${rule.message}`, icon: 'none', duration: 2000 })
          return false
        }
        break
      case 'email':
        if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
          Taro.showToast({ title: `请输入正确的${rule.message}`, icon: 'none', duration: 2000 })
          return false
        }
        break
      case 'password':
        if (!/^[a-zA-Z]\w{5,17}$/.test(value)) {
          Taro.showToast({ title: `请输入正确的${rule.message}`, icon: 'none', duration: 2000 })
          return false
        }
        break
    }
  }
  return true
}

// eslint-disable-next-line
export function va(obj, arr) {
  let ruleResult = []
  let isPass
  arr.forEach(x => {
    isPass = checkRule(obj[x.key], x)
    ruleResult.push(isPass)
    if (!isPass) throw new Error('break forEach')
  })
  return ruleResult
}
