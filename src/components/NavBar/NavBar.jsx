import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui';
import './NavBar.less'

export default class NavBar extends Component {
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
    back = () => {
        Taro.navigateBack();
    }
    gotoHome = () => {
        Taro.switchTab({
            url: '/pages/index/index'
        })
    }

    render() {
        return <View>
            <View className="menu" style={{
                height: this.state.navHeight + 'px',
                marginTop: this.state.navMarginTop + 'px',
                lineHeight: this.state.navHeight + 'px'
            }}>
                <AtIcon onClick={this.back} size={20} className="icon" value="chevron-left" />
                |
            <AtIcon size={20} className="icon" value="home" onClick={this.gotoHome} /></View>
            <View className="title">{this.props.title}</View>
        </View>
    }
}