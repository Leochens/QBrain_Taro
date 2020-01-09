import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Icon } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtIcon } from 'taro-ui';
import NBTitle from '../../components/NBTitle/NBTitle';
import topBannerPng from '../../images/topBanner.png'
import entrancePng from '../../images/entrance.png'
import backgroundPng from '../../images/background.png'

import './index.less'
class Test extends Component {

  config = {
    navigationBarTitleText: '测试页'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }
  componentDidHide() { }
  gotoAppointment() {
    Taro.switchTab({
      url: '/pages/prod/prod'
    })
  }
  toQuickTest = () => {
    Taro.navigateTo({
      url: '/pages/quicktest/quicktest'
    })
  }
  toFullTest = () => {
    Taro.navigateTo({
      url: '/pages/full_test/full_test'
    })
  }
  render() {
    return (
      <View className='at-col'>
        <Image src={topBannerPng} class="topBanner"/>
        <View className="at-col banner-wrap">
            <View className='at-row test at-row__justify--around'>
              <View className="at-col at-col-5 banner-item">
                <View className="title">整套评测</View>
                <View className="des1">测评更准确</View>
                <View className="des2">耗时较长</View>
                <Button circle className="btn"  onClick={this.toFullTest}>去评测</Button>
              </View>
              <View className="at-col at-col-5 banner-item">
                <View className="title" >快速评定</View>
                <View className="des1">入门级评测</View>
                <View className="des2">8道题目，耗时少</View>
                <Button className="btn" onClick={this.toQuickTest}>去评测</Button>
              </View>
          </View>
        </View>
        <Image src={entrancePng} class="entrance" onClick={this.gotoAppointment}/>

        <View className='at-col detail'>
          <View className="at-col des">
            <NBTitle>评测背景</NBTitle>
            <Image src={backgroundPng} class="background"/>
            
          </View>
          {/*<View className="at-col des">
            <NBTitle>项目背景</NBTitle>
            <View className="text">
              <View>李开复推荐</View>
              <View>创始人背景 </View>
              <View>技术总监背景</View>
              <View>全球化视野</View>
            </View>
          </View>*/}
          <View className="at-col des">
            <NBTitle>合作伙伴</NBTitle>
            <View className="partner">

            </View>
          </View>
        </View>
      </View>

    )
  }
}

export default Test

