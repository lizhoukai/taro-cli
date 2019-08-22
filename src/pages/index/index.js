import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.less'


@inject('userStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }
  componentWillReact() { }
  componentDidMount() { }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }

  render() {
    const { userStore } = this.props
    return (
      <View className='index'>
        <Button>Add Async</Button>
      </View>
    )
  }
}

export default Index
