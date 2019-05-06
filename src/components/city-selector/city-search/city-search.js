import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Form, Input } from '@tarojs/components'
import './city-search.less'
import city from '../../../utils/city'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '搜索城市',
    navigationBarBackgroundColor: '#F8FFFF'
  }
  constructor() {
    super(...arguments)
    this.state = {
      searchRresult: []
    }
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  tapCity(v) {
    Taro.eventCenter.trigger('getCityName', v)
    Taro.navigateBack({
      delta: 2
    })
  }
  goBack() {
    Taro.navigateBack({ delta: 1 })
  }
  handleInput(v) {
    let inpVal = v.detail.value.trim().toLowerCase()
    let cityList = city.cityObjs
    let filterArr = []

    // 英文状态过滤
    if (/^[a-z]+$/i.test(inpVal)) {
      filterArr = cityList.filter(item => {
        let text = item.short.slice(0, inpVal.length).toLowerCase()
        return text && text == inpVal
      })
    } else {
      filterArr = cityList.filter(item => {
        return item.city.indexOf(inpVal) > -1 && inpVal
      })
    }

    this.setState({
      searchRresult: filterArr
    })
  }
  render() {
    const ele = this.state.searchRresult.map((x, idx) => {
      return this.state.searchRresult ? (
        <View className='search-result' key={idx}>
          <View className='item-list' onClick={this.tapCity.bind(this, x.city)}>
            <View className='list-label'>{x.city}</View>
          </View>
        </View>
      ) : (
        ''
      )
    })

    return (
      <View className='city-search'>
        <View className='search-inp'>
          <Input placeholder='城市/拼音' onInput={this.handleInput} className='inp-panel' />
          <Text className='btn-cancel' onClick={this.goBack}>
            取消
          </Text>
        </View>
        {ele}
      </View>
    )
  }
}
