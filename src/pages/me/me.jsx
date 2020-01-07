import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import avatar from '../../images/avatar.png'

import './me.less'
import { AtIcon } from 'taro-ui'

// @connect(({ user }) => ({
//     user
// }), (dispatch) => ({

// }))
export default class Me extends Component {
    config = {
        navigationBarTitleText: '我的',
        navigationBarTextStyle: "black"
    }
    constructor() {
        const app = Taro.getApp();
        console.log(app.state)
        console.log(app.state.statusBarHeight);
        this.state = {
            statusBarHeight: app.state.statusBarHeight,
            navHeight: app.state.nav.height,
            navMarginTop: app.state.nav.top
        }
    }
    render() {
        return <View className="wrap">
            <View style={{
                textAlign: 'center',
                height: this.state.navHeight + 'px',
                paddingTop: this.state.navMarginTop + 'px',
                backgroundColor: '#fff',
                lineHeight: this.state.navHeight + 'px'
            }}>我的</View>
            <View className="user">
                <Image src={this.props.user.avatarUrl} className="avatar" />
                <View className="info">
                    <View className="phone">134******78</View>
                    <View className="edit">编辑信息</View>
                </View>
            </View>
            <View className="list">
                <View className="item border" >
                    我的报告
                    <AtIcon className="icon" value="chevron-right" />
                </View>
                <View className="item" >
                    我的订单
                    <AtIcon className="icon" value="chevron-right" />
                </View>
            </View>

            <View className="logout">退出</View>
        </View>
    }
}
