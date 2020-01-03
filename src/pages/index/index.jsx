

import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Icon } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtIcon } from 'taro-ui';
import NBTitle from '../../components/NBTitle/NBTitle';
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
    Taro.navigateTo({
      url: '/pages/appointment/appointment'
    })
  }
  toQuickTest = () => {
    Taro.navigateTo({
      url: '/pages/quicktest/quicktest'
    })
  }
  render() {
    return (
      <View className='at-col'>
        <View className="at-col banner-wrap">
          <View className='at-col banner'>
            <View className='at-row test'>
              <View className="at-col at-col-5  banner-item">
                <View className="title">整套评测</View>
                <View className="des1">245道题目</View>
                <View className="des2">预计时间20分钟
</View>
                <Button circle className="btn">去评测</Button>
              </View>
              <View className="at-col at-col-6 at-col__offset-1 banner-item">
                <View className="title" >快速评定</View>
                <View className="des1">10道题目</View>
                <View className="des2">预计时间5分钟
</View>
                <Button className="btn" onClick={this.toQuickTest}>去评测</Button>
              </View>
            </View>
          </View>


        </View>
        <View className='at-row appointment' onClick={this.gotoAppointment}>
          <View className="at-col at-col-11">
            <View className="title">预约脑体检
</View>
            <View className="des">AI筛查精准定位大脑健康状况
</View>
          </View>
          <View className="at-col">
            <AtIcon className="icon" value="chevron-right" />
          </View>
        </View>
        <View className='at-col detail'>
          <View className="at-col des">
            <NBTitle>专业评测团队</NBTitle>
            <View className="text">
              <View>北师大背景，国家xxx项目
</View>
            </View>
          </View>
          <View className="at-col des">
            <NBTitle>项目背景</NBTitle>
            <View className="text">
              <View>李开复推荐</View>
              <View>创始人背景 </View>
              <View>技术总监背景</View>
              <View>全球化视野</View>
            </View>
          </View>
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

