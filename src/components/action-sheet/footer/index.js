import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'

import OrcComponent from '../../../common/component'

import './index.less'

export default class OrcActionSheetFooter extends OrcComponent {
  handleClick = (...args) => {
    if (_isFunction(this.props.onClick)) {
      this.props.onClick(...args)
    }
  }

  render() {
    const rootClass = classNames('orc-action-sheet-footer', this.props.className)

    return (
      <View onClick={this.handleClick} className={rootClass}>
        {this.props.children}
      </View>
    )
  }
}

OrcActionSheetFooter.propTypes = {
  onClick: PropTypes.func
}
