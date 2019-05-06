import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import PropTypes from 'prop-types'
import { isColor } from '../../utils/assist'

import AtComponent from '../../common/component'

import './index.less'

export default class OrcIcon extends AtComponent {
  handleClick() {
    this.props.onClick && this.props.onClick(...arguments)
  }
  render() {
    const { icon, color, size, sty } = this.props
    let rootClassName = ['iconfont', `icon-${icon}`]
    let objStyle = ''

    if (isColor(color)) {
      objStyle += `color:${color};`
    }
    if (size) {
      objStyle += `font-size:${size}rpx;`
    }

    return (
      <View className='orc-icon' onClick={this.handleClick.bind(this)} style={sty}>
        {icon && <Text className={rootClassName} style={objStyle ? objStyle : ''} />}
      </View>
    )
  }
}

OrcIcon.defaultProps = {
  size: '30',
  color: '#fff'
}
OrcIcon.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  sty: PropTypes.string
}
