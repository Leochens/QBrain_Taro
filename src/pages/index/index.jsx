import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { setSid } from '../../actions/user'
import { AtButton } from 'taro-ui'
import { appConfig } from '../../config'
const apiBaseUrl = appConfig.apiBaseUrl;
import './index.less'


@connect(({ user }) => ({
  user
}), (dispatch) => ({
  setSid(sid) {
    dispatch(setSid(sid))
  },
  // dec() {
  //   dispatch(minus())
  // },
  // asyncAdd() {
  //   dispatch(asyncAdd())
  // }
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getPhoneNumber = e => {
    console.log(e);
    const that = this;

    const { encryptedData, iv } = e.detail;
    Taro.request({
      url: apiBaseUrl + '/encrydata',
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
        "cookie": that.props.user.SID
      },
      data: {
        endata: {
          iv, encryptedData
        }
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log(err);
      }
    })
  }
  onLogin = () => {
    const that = this;
    Taro.checkSession({
      success: function () {
        if (Taro.getStorageSync('SID')) // 看看是否存在会话ID
          Taro.getUserInfo({
            success: res => {
              console.log(res);
            }
          })
        else {
          console.log("微信skey未过期但本地未存储,故需重新登录获取")
          that.login();
        }
      },
      fail: function () {// 检查失败 过期了 需要重新登录
        console.log("微信skey过期,需重新登录")

        that.login();
      }
    })

  }
  login = () => {
    const that = this;
    Taro.login({
      success: function (res) {
        console.log(res.code);
        Taro.request({
          url: 'http://localhost:8899/auth', //仅为示例，并非真实的接口地址
          data: {
            code: res.code
          },
          method: "POST",

          header: {
            'content-type': 'application/json', // 默认值
            "cookie": that.props.user.SID
          },
          success: function (res) {
            console.log(res);
            const sid = res.data.SID;
            that.props.setSid(sid);
          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    })
  }
  render() {
    return (
      <View className='index'>
        <AtButton onClick={() => {
          Taro.navigateTo({
            url: '/pages/test/test'
          })
        }}>测试页</AtButton>
        <AtButton openType="getUserInfo" onGetUserInfo={e => console.log(JSON.parse(e.detail.rawData))}>让用户授权登录</AtButton>
        <AtButton type='primary' onClick={this.onLogin}> 测试登录 </AtButton>
        <AtButton openType="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>获取电话号码</AtButton>
        <AtButton type='primary' onClick={() =>
          Taro.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country

              console.log(userInfo);
            }
          })}> 测试获取信息 </AtButton>

        <View><Text>Hello, World</Text></View>
      </View >
    )
  }
}

export default Index
