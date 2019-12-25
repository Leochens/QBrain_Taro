import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { setSid, setUserInfo } from '../../actions/user'
import { AtButton } from 'taro-ui'
import { appConfig } from '../../config'
const apiBaseUrl = appConfig.apiBaseUrl;
import './test.less'



@connect(({ user }) => ({
  user
}), (dispatch) => ({
  setSid(sid) {
    dispatch(setSid(sid))
  },
  setUserInfo(userInfo) {
    dispatch(setUserInfo(userInfo))
  }
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  // componentWillUnmount() { }

  // componentDidShow() { }

  // componentDidHide() { }
  getUserInfo = () => {
    const that = this;
    Taro.getUserInfo({
      success: res => {
        console.log(res.userInfo);
        that.props.setUserInfo(res.userInfo);
        Taro.request({
          url: apiBaseUrl + '/profile',
          method: "POST",
          header: {
            'content-type': 'application/json', // 默认值
            "cookie": that.props.user.SID
          },
          data: {
            profile: res.userInfo
          },
          success: r => console.log(r),
          fail: e => console.log(e)
        })
      }
    })
  }
  getPhoneNumber = e => {
    console.log(e);
    const that = this;
    const { encryptedData, iv } = e.detail;
    Taro.request({
      url: apiBaseUrl + '/number',
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
          console.log("本地有SID");
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
        <AtButton openType="getUserInfo" onGetUserInfo={e => console.log(JSON.parse(e.detail.rawData))}>用户授权信息</AtButton>
        <AtButton type='primary' onClick={this.onLogin}> 测试登录 </AtButton>
        <AtButton openType="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>获取电话号码</AtButton>
        <AtButton type='primary' onClick={this.getUserInfo}> 测试获取信息 </AtButton>

        <View><Text>Hello, World</Text></View>
      </View >
    )
  }
}

export default Index
