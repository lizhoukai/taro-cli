import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'

import OrcComponent from '../../common/component'
import './index.less'

/**
 * @author:chenzeji
 * @description tabs 标签内容页
 * @prop index {Number} 在页面容器的的索引值 default:0
 * @prop current {Number} 当前选中的tab index值，从0计数，default:0
 */
export default class OrcTabsPane extends OrcComponent {
  static defaultProps = {
    index: 0,
    current: 0
  }

  static propTypes = {
    index: PropTypes.number,
    current: PropTypes.number
  }

  render() {
    const { index, current } = this.props
    const rootCls = ['orc-tabs-pane']
    if (index === current) {
      rootCls.push('orc-tabs-pane--active')
    } else {
      rootCls.push('orc-tabs-pane--inactive')
    }

    return <View className={rootCls}>{this.props.children}</View>
  }
}
