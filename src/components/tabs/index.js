/* eslint-disable react/no-string-refs */
import Taro from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import PropTypes from 'prop-types'

import OrcComponent from '../../common/component'
import './index.less'

export default class OrcTabs extends OrcComponent {
  static defaultProps = {
    style: '',
    current: 0,
    swipeable: true,
    scroll: false,
    fixed: false,
    tabList: [],
    onClick: () => {}
  }

  static propTypes = {
    style: PropTypes.string,
    current: PropTypes.number,
    swipeable: PropTypes.bool,
    fixed: PropTypes.bool,
    scroll: PropTypes.bool,
    tabList: PropTypes.array,
    onClick: PropTypes.func
  }

  constructor() {
    super(...arguments)
    this.state = {
      scrollLeft: 0,
      scrollIntoView: ''
    }
    // 触摸时的原点
    this.touchDot = 0
    // 定时器
    this.interval = null
    // 滑动时间间隔
    this.time = 0
    // 是否已经在滑动
    this.isMoving = false
    // 最大索引
    this.maxIndex = this.props.tabList.length
  }

  handleClick(i) {
    if (this.props.scroll && i >= 1) {
      // 标签栏滚动
      const env = Taro.getEnv()
      if (env === Taro.ENV_TYPE.WEAPP) {
        // 小程序环境
        this.setState({
          scrollIntoView: `tab${i - 1}`
        })
      } else if (env === Taro.ENV_TYPE.WEB) {
        // web环境
        this.setState({
          scrollLeft: this.refs.refTabHeader.vnode.dom.childNodes[i - 1].offsetLeft
        })
      }
    }
    this.props.onClick(i, ...arguments)
  }

  handleTouchStart(e) {
    if (!this.props.swipeable) return

    // 获取触摸时的原点
    this.touchDot = e.touches[0].pageX
    // 使用js计时器记录时间
    this.interval = setInterval(() => {
      this.time++
    }, 100)
  }

  handleTouchMove(e) {
    if (!this.props.swipeable) return

    const { current } = this.props
    const touchMove = e.touches[0].pageX
    const moveDistance = touchMove - this.touchDot

    if (!this.isMoving && this.time < 10) {
      // 向左滑动
      if (current + 1 < this.props.tabList.length && moveDistance <= -40) {
        this.isMoving = true
        this.handleClick(current + 1)

        // 向右滑动
      } else if (current - 1 >= 0 && moveDistance >= 40) {
        this.isMoving = true
        this.handleClick(current - 1)
      }
    }
  }

  handleTouchEnd() {
    if (!this.props.swipeable) return

    clearInterval(this.interval)
    this.time = 0
    this.isMoving = false
  }

  render() {
    const { style, tabList, scroll, current, fixed } = this.props
    const { scrollLeft, scrollIntoView } = this.state

    const headerCls = ['orc-tabs__header']
    if (scroll) {
      headerCls.push('orc-tabs__header--scroll')
    }
    const animationStyle = `transform: translate3d(-${current * 100}%, 0px, 0px);`
    const tabItems = tabList.map((item, i) => (
      <View
        className={current === i ? 'orc-tabs__item orc-tabs__item--active' : 'orc-tabs__item'}
        id={`tab${i}`}
        key={item.title}
        onClick={this.handleClick.bind(this, i)}
      >
        <View className='orc-tabs__text'>{item.title}</View>
      </View>
    ))

    return (
      <View className='orc-tabs' style={style}>
        {scroll ? (
          <ScrollView
            className={headerCls}
            scrollX
            scrollWithAnimation
            scrollLeft={scrollLeft}
            scrollIntoView={scrollIntoView}
            ref='refTabHeader'
            style={fixed ? 'position: fixed;top : 0;' : ''}
          >
            {tabItems}
          </ScrollView>
        ) : (
          <View className={headerCls} style={fixed ? 'position: fixed;top: 0;' : ''}>
            {tabItems}
          </View>
        )}
        <View
          className='orc-tabs__body'
          onTouchStart={this.handleTouchStart.bind(this)}
          onTouchEnd={this.handleTouchEnd.bind(this)}
          onTouchMove={this.handleTouchMove.bind(this)}
          style={animationStyle}
        >
          {this.props.children}
        </View>
      </View>
    )
  }
}
