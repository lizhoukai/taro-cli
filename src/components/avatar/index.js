import Taro from '@tarojs/taro'
import { View, Text, Image, Icon } from '@tarojs/components'

import PropTypes from 'prop-types'

import OrcComponent from '../../common/component'
import OrcIcon from '../icon/index'

import './index.less'

const SIZE_CLASS = {
  small: 'small',
  default: 'default',
  large: 'large'
}

export default class OrcAvatar extends OrcComponent {
  handleClick() {
    this.props.onClick && this.props.onClick(...arguments)
  }
  render() {
    const { size, circle, url } = this.props
    let rootClassName = ['orc-avatar']
    let iconSize
    const circleClass = circle ? 'orc-avatar--circle' : ''
    const sizeClass = SIZE_CLASS[size] ? `orc-avatar--${size}` : ''

    switch (size) {
      case 'small':
        iconSize = '40'
        break
      case 'default':
        iconSize = '70'
        break
      case 'large':
        iconSize = '100'
        break
    }

    rootClassName.push(circleClass, sizeClass)

    return (
      <View className={rootClassName} onClick={this.handleClick}>
        {url ? (
          <Image lazyLoad className='pic' mode='scaleToFill' src={url} />
        ) : (
          <OrcIcon size={iconSize} color='#fff' icon='user' />
        )}
      </View>
    )
  }
}

OrcAvatar.defaultProps = {
  size: 'default',
  circle: false,
  url: ''
}
OrcAvatar.propTypes = {
  size: PropTypes.string,
  circle: PropTypes.bool,
  url: PropTypes.string,
  onClick: PropTypes.func
}
