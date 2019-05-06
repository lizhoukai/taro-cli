import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import PropTypes from 'prop-types'

import OrcComponent from '../../../common/component'

import './index.less'

export default class OrcModalAction extends OrcComponent {
  render() {
    const rootClass = ['orc-modal-footer']

    if (this.props.isSimple) {
      rootClass.push('orc-modal-footer--simple')
    }

    return (
      <View className={rootClass}>
        <View className='orc-modal-footer__action orc-modal-action'>
          {this.props.children}
        </View>
      </View>
    )
  }
}

OrcModalAction.propTypes = {
  isSimple: PropTypes.bool
}
