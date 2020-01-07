import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import NavBar from '../../components/NavBar/NavBar'
import './my_orders.less'

export default class MyOrders extends Component {
    config = {
        navigationBarTitleText: '我的订单',
        navigationBarTextStyle: "black"
    }

    constructor(props) {
        super(props);
    }
    render() {
        return <View className="wrap">
            <NavBar title="我的订单" />
        </View>
    }
}

