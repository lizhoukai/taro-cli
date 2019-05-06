import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { View, Text } from '@tarojs/components'

import OrcComponent from '../../../common/component'

import './index.less'

export default class OrcActionSheetHeader extends OrcComponent {
  render () {
    const rootClass = classNames('at-action-sheet-header', this.props.className)

    return (
      <View className={rootClass}>
        <Text>{this.props.children}</Text>
      </View>
    )
  }
}
