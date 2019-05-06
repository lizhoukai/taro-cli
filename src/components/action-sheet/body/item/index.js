import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { View } from '@tarojs/components'

import PropTypes from 'prop-types'
import _isFunction from 'lodash/isFunction'

import OrcComponent from '../../../../common/component'

import './index.less'

export default class OrcActionSheetItem extends OrcComponent {
  handleClick = (...args) => {
    if (_isFunction(this.props.onClick)) {
      this.props.onClick(...args)
    }
  }

  render () {
    const rootClass = classNames('orc-action-sheet-item', this.props.className)

    return (
      <View className={rootClass} onClick={this.handleClick}>
        {this.props.children}
      </View>
    )
  }
}

OrcActionSheetItem.propTypes = {
  onClick: PropTypes.func
}
