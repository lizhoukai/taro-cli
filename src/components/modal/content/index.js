import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import OrcComponent from '../../../common/component'

import './index.less'

export default class OrcModalContent extends OrcComponent {
  render() {
    return (
      <View className='orc-modal-content'>{this.props.children}</View>
    )
  }
}
