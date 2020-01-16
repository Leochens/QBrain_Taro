import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Icon } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtIcon } from 'taro-ui';
import NBTitle from '../../components/NBTitle/NBTitle';
import topBannerPng from '../../images/topBanner.png'
import entrancePng from '../../images/entrance.png'
import backgroundPng from '../../images/background.png'
import indexPng from './index.png';
import './index.less'
import { appConfig } from '../../config'

class Index extends Component {

  config = {
    navigationBarTitleText: '测试页'
  }
  constructor(props) {
    super(props);
    const sale_user_id = this.$router.params.sale_id;
    const sessionID = Taro.getStorageSync('sessionID');
    if (sale_user_id) {
      Taro.request({
        url: appConfig.apiBaseUrl + '/sale',
        method: "POST",
        data: {
          sale_user_id
        },
        header: {
          'content-type': 'application/json', // 默认值
          cookie: sessionID
        },
        success: function (res) {
          console.log(res.data);
        },
        fail: e => console.log(e)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  onShareAppMessage() {

    const u_id = Taro.getStorageSync('uid');

    return {
      path: '/pages/index/index?sale_id=' + u_id
    }
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


        <Image src={indexPng} className="indexPng" />

        <View style={{
          position: 'fixed',
          bottom: 0
        }}>
          <Image src={entrancePng} class="entrance" onClick={this.gotoAppointment} />
        </View>


        {/* <Image src={topBannerPng} class="topBanner" />
        <View className="at-col banner-wrap">
          <View className='at-row test at-row__justify--around'>
            <View className="at-col at-col-5 banner-item">
              <View className="title">整套评测</View>
              <View className="des1">测评更准确</View>
              <View className="des2">耗时较长</View>
              <Button circle className="btn" onClick={this.toFullTest}>去评测</Button>
            </View>
            <View className="at-col at-col-5 banner-item">
              <View className="title" >快速评定</View>
              <View className="des1">入门级评测</View>
              <View className="des2">8道题目，耗时少</View>
              <Button className="btn" onClick={this.toQuickTest}>去评测</Button>
            </View>
          </View>
        </View>
        <Image src={entrancePng} class="entrance" onClick={this.gotoAppointment} />
        <View className='at-col detail'>
          <View className="at-col des">
            <NBTitle>评测背景</NBTitle>
            <Image src={backgroundPng} class="background" />

          </View>
          <View className="at-col des">
            <NBTitle>合作伙伴</NBTitle>
            <View className="partner">

            </View>
          </View>
        </View>
     
     
      */}
      </View>

    )
  }
}

export default Index

