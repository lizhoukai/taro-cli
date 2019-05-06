import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'

import OrcActionSheetBody from './body/index'
import OrcActionSheetHeader from './header/index'
import OrcActionSheetFooter from './footer/index'

import OrcComponent from '../../common/component'

import './index.less'

export default class OrcActionSheet extends OrcComponent {
  constructor(props) {
    super(...arguments)
    const { isOpened } = props

    this.state = {
      _isOpened: isOpened
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isOpened } = nextProps
    if (isOpened !== this.state._isOpened) {
      this.setState({
        _isOpened: isOpened
      })

      !isOpened && this.handleClose()
    }
  }

  handleClose = () => {
    if (_isFunction(this.props.onClose)) {
      this.props.onClose()
    }
  }

  handleCancel = () => {
    if (_isFunction(this.props.onCancel)) {
      return this.props.onCancel()
    }
    this.close()
  }

  close = () => {
    this.setState(
      {
        _isOpened: false
      },
      this.handleClose
    )
  }

  handleTouchMove = e => {
    e.stopPropagation()
  }

  render() {
    const { title, cancelText, className } = this.props
    const { _isOpened } = this.state

    const rootClass = classNames(
      'orc-action-sheet',
      {
        'orc-action-sheet--active': _isOpened
      },
      className
    )

    return (
      <View className={rootClass} onTouchMove={this.handleTouchMove}>
        <View onClick={this.close} className='orc-action-sheet__overlay' />
        <View className='orc-action-sheet__container'>
          {title && <OrcActionSheetHeader>{title}</OrcActionSheetHeader>}
          <OrcActionSheetBody>{this.props.children}</OrcActionSheetBody>
          {cancelText && (
            <OrcActionSheetFooter onClick={this.handleCancel}>{cancelText}</OrcActionSheetFooter>
          )}
        </View>
      </View>
    )
  }
}

OrcActionSheet.defaultProps = {
  isOpened: false
}

OrcActionSheet.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  isOpened: PropTypes.bool,
  cancelText: PropTypes.string
}
