import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block, Image, Button, Form, Input } from '@tarojs/components'

import './index.less'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '账号登录',
    navigationBarBackgroundColor: '#333851',
    navigationBarTextStyle: 'white'
  }
  constructor() {
    super(...arguments)

    this.state = {
      formData: {
        phone: '',
        password: ''
      },
      rule: [
        {
          key: 'phone',
          required: true,
          message: '手机号码',
          type: 'mobile'
        },
        {
          key: 'password',
          required: true,
          message: '密码'
        }
      ]
    }
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}

  // 表单提交
  async formSubmit() {
    const { formData } = this.state
    if (!this.$va(formData, this.state.rule).includes(false)) {
      const res = await this.$http.post('/user/wx/login/', formData)
      if (res && res.code === 0) {
        Taro.setStorageSync('token', res.data.token)
        Taro.redirectTo({
          url: '../order/order'
        })
      }
    }
  }

  bindInpVal(key, e) {
    let { formData } = this.state
    formData[key] = e.target.value

    this.setState({ formData })
  }

  render() {
    const { formData } = this.state
    return (
      <Block>
        <View className='login-page'>
          <View className='login-box'>
            <View className='form-item'>
              <View className='iconfont icon-shoujihaoma' />
              <Input
                className='input-panel'
                type='number'
                maxlength='11'
                placeholder='手机号码'
                name='phone'
                value={formData.phone}
                onInput={this.bindInpVal.bind(this, 'phone')}
              />
            </View>
            <View className='form-item'>
              <View className='iconfont icon-yanzhengma' />
              <Input
                className='input-panel'
                type='password'
                placeholder='密码'
                name='password'
                onInput={this.bindInpVal.bind(this, 'password')}
              />
            </View>
            <View className='btn-group pt24'>
              <Button
                className='w-full btn-success'
                disabled={formData.phone && formData.password ? false : true}
                onClick={this.formSubmit.bind(this)}
              >
                登录
              </Button>
            </View>
          </View>
        </View>
      </Block>
    )
  }
}
