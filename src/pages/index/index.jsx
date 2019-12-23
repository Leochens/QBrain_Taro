import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  // add() {
  //   dispatch(add())
  // },
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

  render() {
    return (
      <View className='index'>
        <Button onClick={() => {
          Taro.navigateTo({
            url:'/pages/test/test'
          })
        }}>测试页</Button>

        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

export default Index
