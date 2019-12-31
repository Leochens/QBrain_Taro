import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './CircleProgress.less'
export default class CircleProgress extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return <View className="wrap">

            <View className="circle"></View>
            <View className="circle grey"></View>
        </View>
    }
}