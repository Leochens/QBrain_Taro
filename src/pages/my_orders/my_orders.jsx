import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtTabBar } from 'taro-ui'
import NavBar from '../../components/NavBar/NavBar'
import './my_orders.less'

export default class MyOrders extends Component {
    config = {
        navigationBarTitleText: '我的订单',
        navigationBarTextStyle: "black"
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            list: [
                {
                    name: '贾志杰',
                    gender: '女',
                    time: '2018-03-12',
                    hospital: '安贞医院分院',
                    number: '订单号：dafagadgah1234'
                }
            ]
        }
    }
    handleClick = value => {
        this.setState({
            current: value
        })
    }
    renderList = () => {
        const { current, list } = this.state;
        let res = list.slice();
        switch (current) {
            case 1: break
            case 2: res = []; break
            case 3: res = []; break
            case 0: break
            default: break
        }

        return res.length
            ? res.map((item, idx) => {
                return <View className="list-item" key={idx}>
                    <View className="left">
                        <View className="name">{item.name}</View>
                        <View className="gender">{item.gender}</View>
                    </View>
                    <View className="middle">
                        <View className="time">{item.time}</View>
                        <View className="hospital">{item.hospital}</View>
                        <View className="number">{item.number}</View>
                    </View>
                </View>
            })
            : <View className="empty">暂时还没有订单</View>
    }
    render() {
        return <View className="wrap">
            <NavBar title="我的订单" />

            <AtTabBar
                tabList={[
                    { title: '全部' },
                    { title: '待付款' },
                    { title: '待服务' },
                    { title: '已完成' }
                ]}
                onClick={this.handleClick}
                current={this.state.current}
            />

            {this.renderList()}
        </View>
    }
}

