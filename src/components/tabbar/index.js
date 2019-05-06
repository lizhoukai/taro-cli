import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'

import PropTypes from 'prop-types'
import { isColor } from '../../utils/assist'

import AtComponent from '../../common/component'
// import OrcIcon from '../../components/icon/index'

import './index.less'

// 标签页大小
const SIZE_CLASS = {
  small: 'small', // 20px
  normal: 'normal' // 24px pd16px
}

export default class OrcTabbar extends AtComponent {
  constructor() {
    super()
  }
  handleClick(i) {
    this.props.onClick(i, ...arguments)
  }
  render() {
    let { bgcolor, activeColor, row, list, type, curIndex, sty } = this.props

    const rootClass = ['orc-tabbar', `orc-tabbar--${SIZE_CLASS[type]}`]
    let bgStyle, colorStyle

    if (row) rootClass.push('orc-tabbar--row')
    if (isColor(activeColor)) colorStyle = `color:${activeColor};`
    if (isColor(bgcolor)) bgStyle = `background-color: ${bgcolor};`

    if (sty) {
      bgStyle += sty
    }

    return (
      <View className={rootClass} style={bgStyle ? bgStyle : ''}>
        {list &&
          list.map((x, i) => {
            return (
              <View key={i} className='tab-item' onClick={this.handleClick.bind(this, i)}>
                <Image className='pic' mode='scaleToFill' src={curIndex === i ? x.activeUrl : x.defaultUrl} />
                <Text className='label' style={curIndex === i ? colorStyle : ''}>
                  {x.label}
                </Text>
              </View>
            )
          })}
      </View>
    )
  }
}

OrcTabbar.defaultProps = {
  bgcolor: '#F7F7F7',
  activeColor: '#222',
  type: 'small',
  row: false,
  curIndex: 0
}
OrcTabbar.propTypes = {
  bgcolor: PropTypes.string,
  type: PropTypes.string,
  activeColor: PropTypes.string,
  row: PropTypes.bool,
  onClick: PropTypes.func,
  list: PropTypes.array,
  sty: PropTypes.string
}
