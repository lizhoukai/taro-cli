import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import PropTypes from 'prop-types'
import _isFunction from 'lodash/isFunction'

import OrcComponent from '../../../common/component'
import OrcIcon from '../../icon/index'

import './index.less'

export default class OrcCellItem extends OrcComponent {
  handleClick = (...args) => {
    if (_isFunction(this.props.onClick)) {
      this.props.onClick(...args)
    }
  }
  render() {
    const { label, value, arrow, required, flexdWidth, alignTop } = this.props
    return (
      <View
        className={['orc-cell_content', flexdWidth ? 'orc-cell--flexdwidth' : '']}
        style={alignTop ? 'align-items: flex-start;' : ''}
        onClick={this.handleClick}
      >
        <View className={['orc-cell_label', required ? 'orc-cell--required' : '']}>{label}</View>
        <View className='orc-cell_value'>
          {value && <Text>{value}</Text>}
          {this.props.children}
          {arrow && (
            <View className='orc-cell_icon'>
              <OrcIcon color='#DDDDDD' size='25' icon='right' />
            </View>
          )}
        </View>
      </View>
    )
  }
}

OrcCellItem.defaultProps = {
  required: false,
  flexdWidth: false,
  arrow: false,
  alignTop: false
}
OrcCellItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  arrow: PropTypes.bool,
  onClick: PropTypes.func
}
