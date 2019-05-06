import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import OrcComponent from '../../../common/component'

import './index.less'

export default class OrcModalHeader extends OrcComponent {
  render() {
    return (
      <View className='orc-modal-header'>{this.props.children}</View>
    )
  }
}
