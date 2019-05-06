import Taro, { Component } from '@tarojs/taro'
import {
  Text,
  View,
  PickerView,
  PickerViewColumn
} from '@tarojs/components'

import $citys from '../../utils/citys'
import './index.less'

export default class CityLinkageSelector extends Component {
  config = {
    navigationBarTitleText: '',
    navigationBarBackgroundColor: '#F8FFFF'
  }
  constructor() {
    super(...arguments)

    this.state = {
      visibilitySelector: false,
      provinces: [],
      citys: [],
      areas: [],
      cityValue: [0, 0, 0]
    }
  }
  // 页面被载入
  componentWillMount() {
    const cityData = $citys.data
    this.setState({
      provinces: cityData,
      citys: cityData[0].sub,
      areas: cityData[0].sub[0].sub
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

  // 选择省市区
  cityChange(e) {
    const value = e.detail.value
    const cityData = $citys.data
    const { cityValue } = this.state
    const provinceIdx = value[0]
    const cityIdx = value[1]
    const areaIdx = value[2]
    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (cityValue[0] != provinceIdx) {
      this.setState({
        cityValue: [provinceIdx, 0, 0],
        citys: cityData[provinceIdx].sub,
        areas: cityData[provinceIdx].sub[0].sub
      })
    } else if (cityValue[1] != cityIdx) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      this.setState({
        cityValue: [provinceIdx, cityIdx, 0],
        areas: cityData[provinceIdx].sub[cityIdx].sub
      })
    } else {
      // 滑动选择了区
      this.setState({
        cityValue: [provinceIdx, cityIdx, areaIdx]
      })
    }
  }

  // 取消
  cityCancel() {
    this.setState({ visibilitySelector: false })
  }

  // 确定
  citySure() {
    const { cityValue } = this.state
    const cityData = $citys.data
    const curProvince = cityData[cityValue[0]]
    const curCity = curProvince.sub[cityValue[1]]
    const curArea = curCity.sub[cityValue[2]]
    this.props.onChooseCity(
      curProvince.name + curCity.name + curArea.name
    )
    this.setState({ visibilitySelector: false })
  }

  // 显示
  show() {
    this.setState({
      visibilitySelector: true
    })
  }

  render() {
    const { provinces, citys, areas } = this.state
    return (
      <View
        class='picker-view'
        // animation='{{animationAddressMenu}}'
        style={
          this.state.visibilitySelector
            ? 'visibility: visible'
            : 'visibility: hidden'
        }
      >
        <View className='picker-view__mask' />
        <View className='picker-view__inner'>
          <View className='picker-view__header'>
            <Text className='btn-cancel' onClick={this.cityCancel}>
              取消
            </Text>
            <Text className='btn-sure' onClick={this.citySure}>
              确定
            </Text>
          </View>
          <PickerView
            className='picker-view__content'
            onChange={this.cityChange}
            value={this.state.cityValue}
          >
            <PickerViewColumn className='picker-column'>
              {provinces.map((x, i) => {
                return (
                  <View class='picker-item' key={i}>
                    {x.name}
                  </View>
                )
              })}
            </PickerViewColumn>
            <PickerViewColumn>
              {citys.map((x, i) => {
                return (
                  <View class='picker-item' key={i}>
                    {x.name}
                  </View>
                )
              })}
            </PickerViewColumn>
            <PickerViewColumn>
              {areas.map((x, i) => {
                return (
                  <View class='picker-item' key={i}>
                    {x.name}
                  </View>
                )
              })}
            </PickerViewColumn>
          </PickerView>
        </View>
      </View>
    )
  }
}
