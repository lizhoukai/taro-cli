import Taro from '@tarojs/taro'
import { View, Text, Image, Icon } from '@tarojs/components'

import PropTypes from 'prop-types'

import OrcComponent from '../../common/component'

import './index.less'

export default class OrcArticle extends OrcComponent {
  render() {
    const { title, content } = this.props

    return (
      <View className='orc-article'>
        <View className='orc-article_header'>
          <Text>{title}</Text>
        </View>
        <View className='orc-article_content'>
          <Text>{content}</Text>
        </View>
      </View>
    )
  }
}

OrcArticle.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
}
