import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { View } from '@tarojs/components'

import OrcComponent from '../../../common/component'

import './index.less'

export default class OrcActionSheetBody extends OrcComponent {
  render () {
    const rootClass = classNames('orc-action-sheet-body', this.props.className)
    return <View className={rootClass}>{this.props.children}</View>
  }
}
