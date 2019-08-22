import Taro from '@tarojs/taro'
import { View, Text, Image, Icon } from '@tarojs/components'

import OrcComponent from '../../common/component'
import './index.less'

export default class OrcNavbar extends OrcComponent {
  static defaultProps = {
    color: '#000',
    bgcolor: '#fff'
  }
  constructor(props) {
    super(props)

    this.state = {
      statusHt: 0, // 状态栏高度
      navHt: 0, // 导航高度
      capsuleHt: 0 // 胶囊高度
    }
  }

  componentWillMount() {
    this.getNavbarInfo()
  }

  // 通过获取系统信息计算导航栏高度
  getNavbarInfo() {
    const { width } = Taro.getMenuButtonBoundingClientRect()
    let sysinfo = Taro.getSystemInfoSync(),
      statusHeight = sysinfo.statusBarHeight,
      isiOS = sysinfo.system.indexOf('iOS') > -1,
      navHeight
    if (!isiOS) {
      navHeight = 48
    } else {
      navHeight = 44
    }
    this.setState({
      statusHt: statusHeight,
      navHt: navHeight,
      capsuleHt: width
    })
  }

  render() {
    const { title, bgcolor, color } = this.props
    const { statusHt, navHt, capsuleHt } = this.state
    const wrapHt = statusHt + navHt
    return (
      <View className='orc-navbar' style={`height:${wrapHt}px;background:${bgcolor};`}>
        <View className='orc-navbar__header' style={`height:${statusHt}px;`} />
        <View className='orc-navbar__content' style={`padding-right:${capsuleHt + 8}px;height:${navHt}px;`}>
          {this.props.children}
          {title && (
            <View className='title' style={`color:${color};`}>
              {title}
            </View>
          )}
        </View>
      </View>
    )
  }
}
