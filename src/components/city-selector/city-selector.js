import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Form, Input } from '@tarojs/components'
import './city-selector.less'
import city from '../../utils/city'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '选择城市',
    navigationBarBackgroundColor: '#F8FFFF'
  }
  constructor() {
    super(...arguments)

    this.state = {
      toView: '',
      searchLetter: [],
      winH: 0,
      letterH: 0,
      cityList: []
    }
  }
  // 页面被载入
  componentWillMount() {
    let searchLetter = city.searchLetter
    let cityList = city.cityList()

    let sysInfo = Taro.getSystemInfoSync()
    let winH = sysInfo.windowHeight

    let letterH = winH / searchLetter.length

    this.setState({
      winH: winH,
      letterH: letterH,
      searchLetter: searchLetter,
      cityList: cityList
    })
  }
  // 页面渲染完成
  componentDidMount() {}
  // 页面退出 在微信小程序中这一生命周期方法对应 onUnload
  componentWillUnmount() {}
  // 页面展示出来 在微信小程序中这一生命周期方法对应 onShow，在H5中同样实现
  componentDidShow() {}
  // 页面被隐藏 在微信小程序中这一生命周期方法对应 onHide，在H5中同样实现
  componentDidHide() {}

  // 点击字母切换
  tapLetter(x) {
    Taro.showToast({ title: x, icon: 'none', duration: 1000 })
    this.setState({
      toView: x
    })
  }
  // 搜索页
  toSearch() {
    Taro.navigateTo({ url: '/components/city-selector/city-search/city-search' })
  }
  // 点击所选城市
  tapCity(v) {
    Taro.eventCenter.trigger('getCityName', v)
    Taro.navigateBack({
      delta: 1
    })
  }
  render() {
    const element = this.state.cityList.map((item, idx) => {
      const nodes = item.cityInfo.map((node, i) => {
        return (
          <View key={i} className='item-list' onClick={this.tapCity.bind(this, node.city)}>
            <View className='list-label'>{node.city}</View>
          </View>
        )
      })
      return (
        <View key={idx}>
          <View className='city-item' id={item.initial}>
            <View className='item-title'>{item.initial}</View>
            {nodes}
          </View>
        </View>
      )
    })

    return (
      <View className='city-select'>
        <View className='letter-item'>
          {this.state.searchLetter.map((x, idx) => (
            <View
              className='item-list'
              style={'height:' + this.state.letterH + 'px'}
              key={idx}
              onClick={this.tapLetter.bind(this, x)}
            >
              {x}
            </View>
          ))}
        </View>
        <ScrollView
          style={'height:' + this.state.winH + 'px'}
          className='scrollview'
          scrollY
          scrollIntoView={this.state.toView}
        >
          <View className='search-inp'>
            <Input placeholder='城市/拼音' onClick={this.toSearch} className='inp-panel' />
          </View>
          <View className='hot-city'>
            <View className='hot-title'>热门城市</View>
            <View className='hot-list'>
              <Text className='list-item' onClick={this.tapCity.bind(this, '北京')}>
                北京
              </Text>
              <Text className='list-item' onClick={this.tapCity.bind(this, '上海')}>
                上海
              </Text>
              <Text className='list-item' onClick={this.tapCity.bind(this, '广州')}>
                广州
              </Text>
              <Text className='list-item' onClick={this.tapCity.bind(this, '深圳')}>
                深圳
              </Text>
              <Text className='list-item' onClick={this.tapCity.bind(this, '天津')}>
                天津
              </Text>
              <Text className='list-item' onClick={this.tapCity.bind(this, '杭州')}>
                杭州
              </Text>
              <Text className='list-item' onClick={this.tapCity.bind(this, '重庆')}>
                重庆
              </Text>
              <Text className='list-item' onClick={this.tapCity.bind(this, '南京')}>
                南京
              </Text>
            </View>
          </View>
          <View className='scroll-title'>全部城市</View>
          {element}
        </ScrollView>
      </View>
    )
  }
}
