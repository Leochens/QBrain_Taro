

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
                <View className="title">快速评定</View>
                <View className="des1">10道题目</View>
                <View className="des2">预计时间5分钟
</View>
                <Button className="btn">去评测</Button>
              </View>
            </View>
          </View>


        </View>
        <View className='at-row appointment'>
          <View className="at-col at-col-11">
            <View className="title">预约脑体检
</View>
            <View className="des">AI筛查精准定位大脑健康状况
</View>
          </View>
          <View className="at-col at-col-1">
            <AtIcon className="icon" value="chevron-right" />
          </View>
        </View>
        <View className='at-col '>
          <View className="at-row des">
            <NBTitle>专业评测团队</NBTitle>
          </View>
        </View>
      </View>

    )
  }
}

export default Test

