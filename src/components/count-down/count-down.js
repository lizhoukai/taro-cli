import Taro, { Component, Events } from '@tarojs/taro'
import { View, ScrollView, Image, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import { isColor } from '../../utils/assist'

import './count-down.less'

export default class CountDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      second: this.props.time || 60,
      defaultText: this.props.defaultText || '获取验证码',
      disabled: false
    }
  }
  componentWillMount() {}

  componentDidMount() {}
  // 分发事件给父组件控制逻辑
  run() {
    this.props.onSendCode('传递给父组件')
  }

  // 开始倒计时
  start() {
    if (this.state.disabled) return
    this.setState({
      disabled: true
    })
    // 倒计时
    const timer = setInterval(() => {
      if (this.state.second > 1) {
        this.setState({
          second: this.state.second - 1
        })
      } else {
        this.setState({
          second: this.props.time || 60,
          disabled: false
        })
        clearInterval(timer)
      }
    }, 1000)
  }

  showTipText() {
    return this.state.disabled ? `${this.state.second}s后重试` : this.state.defaultText
  }

  render() {
    const { ghost, color, size } = this.props
    let objStyle = ''

    if (isColor(color)) {
      objStyle += `color:${color};`
    }

    if (size) {
      objStyle += `font-size:${size}rpx;`
    }

    if (ghost && isColor(color)) {
      objStyle += `border:1px solid ${color};`
    }

    return (
      <View>
        <View className='countdown' style={objStyle}>
          <Text className={this.state.disabled ? 'wait' : 'active'} onClick={this.run}>
            {this.showTipText()}
          </Text>
        </View>
      </View>
    )
  }
}

CountDown.defaultProps = {
  ghost: false,
  size: '30'
}
CountDown.propTypes = {
  color: PropTypes.string,
  ghost: PropTypes.bool
}
