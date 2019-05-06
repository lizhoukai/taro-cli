import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import PropTypes from 'prop-types'
import { isColor } from '../../utils/assist'

import OrcComponent from '../../common/component'

import './index.less'

// 按钮类型
const TYPE_CLASS = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  error: 'error'
}

// 按钮大小
const SIZE_CLASS = {
  small: 'small', // 20px
  normal: 'normal', // 24px pd16px
  large: 'large' // 34px
}

export default class OrcButton extends OrcComponent {
  handleClick() {
    if (!this.props.disabled) {
      this.props.onClick && this.props.onClick(...arguments)
    }
  }
  render() {
    const { type, color, bgcolor, size, label, disabled, circle, sty, ghost } = this.props
    let rootClassName = ['orc-btn']
    let objStyle = ''

    const sizeClass = SIZE_CLASS[size] ? `orc-btn--${size}` : ''
    const typeClass = TYPE_CLASS[type] ? `orc-btn--${type}` : ''
    const disabledClass = disabled ? 'orc-btn--disabled' : ''
    const circleClass = circle ? 'orc-btn--circle' : ''
    const ghostClass = ghost ? 'orc-btn--ghost' : ''

    if (isColor(color)) {
      objStyle += `color:${color};`
    }
    if (isColor(bgcolor)) {
      objStyle += `background:${bgcolor};`
    }
    if (ghost && isColor(color)) {
      objStyle += `border:1rpx solid ${color};`
    }

    if (sty) {
      objStyle += sty
    }

    rootClassName.push(sizeClass, typeClass, disabledClass, circleClass, ghostClass)
    return (
      <View
        className={rootClassName}
        onClick={this.handleClick.bind(this)}
        style={objStyle ? objStyle : ''}
      >
        {label && <Text>{label}</Text>}
        {this.props.children}
      </View>
    )
  }
}

OrcButton.defaultProps = {
  disabled: false,
  ghost: false,
  circle: false,
  size: 'normal',
  type: 'success'
}
OrcButton.propTypes = {
  color: PropTypes.string,
  sty: PropTypes.string,
  bgcolor: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  ghost: PropTypes.bool,
  circle: PropTypes.bool,
  onClick: PropTypes.func
}
