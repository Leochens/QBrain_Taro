import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './NBTitle.less'
export default class NBTitle extends Component {

    render() {
        return <View className="title">{this.props.children}</View>
    }
}