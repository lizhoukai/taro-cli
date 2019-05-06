import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'

import OrcComponent from '../../common/component'

import './index.less'

export default class OrcCell extends OrcComponent {
  render() {
    const { title } = this.props
    return (
      <View className='orc-cell'>
        {title && <View className='orc-cell_header'>{title}</View>}
        {this.props.children}
      </View>
    )
  }
}

OrcCell.propTypes = {
  title: PropTypes.string
}
