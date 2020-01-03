import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Test from './pages/test/test'
import Index from './pages/index/index'
import configStore from './store'

import 'animate.css'
import './app.less'
// import 'taro-ui/dist/style/index.scss' 
import './custom.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/appointment/appointment',
      'pages/quicktest/quicktest',
      'pages/prod/prod',
      'pages/me/me',
      'pages/test/test',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      navigationStyle: 'custom'
    },
    tabBar: {
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        // iconPath: ''
      }, {
        pagePath: "pages/prod/prod",
        text: "产品",
        // iconPath: ''
      },
      {
        pagePath: "pages/me/me",
        text: "我的",
        // iconPath: ''
      }]
    },
    navigateToMiniProgramAppIdList: [
      // "wxe5f52902cf4de896"
    ]
  }

  constructor(props) {
    super(props)
    const that = this;
    Taro.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        that.state = {
          statusBarHeight: res.statusBarHeight,
          nav: Taro.getMenuButtonBoundingClientRect(),
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        }
      }
    })

  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
