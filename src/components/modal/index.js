import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import PropTypes from 'prop-types'

import OrcModalHeader from './header/index'
import OrcModalAction from './action/index'
import OrcModalContent from './content/index'
import OrcComponent from '../../common/component'

import './index.less'

export default class OrcModal extends OrcComponent {
  static options = {
    addGlobalClass: true
  }
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
    }
  }

  handleTouchMove = e => {
    e.stopPropagation()
  }

  render() {
    const { _isOpened } = this.state
    const { title, content, cancelText, confirmText } = this.props

    const rootClass = ['orc-modal']

    if (_isOpened) {
      rootClass.push('orc-modal--active')
    }

    if (title || content) {
      const isRenderAction = cancelText || confirmText
      return (
        <View
          className={rootClass}
          onTouchMove={this.handleTouchMove}
        >
          <View className='orc-modal__overlay' />
          <View className='orc-modal__container'>
            {title && (
              <OrcModalHeader>
                <Text>{title}</Text>
              </OrcModalHeader>
            )}
            {content && (
              <OrcModalContent>
                <View className='content-simple'>
                  <Text>{content}</Text>
                </View>
              </OrcModalContent>
            )}
            {isRenderAction && (
              <OrcModalAction isSimple>
                {confirmText && (
                  <Button onClick={this.props.onConfirm}>
                    {confirmText}
                  </Button>
                )}
                {cancelText && (
                  <Button onClick={this.props.onCancel}>
                    {cancelText}
                  </Button>
                )}
              </OrcModalAction>
            )}
          </View>
        </View>
      )
    }

    return (
      <View className={rootClass} onTouchMove={this.handleTouchMove}>
        <View className='orc-modal__overlay' />
        <View className='orc-modal__container'>
          {this.props.children}
        </View>
      </View>
    )
  }
}

OrcModal.propTypes = {
  title: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  content: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string
}
