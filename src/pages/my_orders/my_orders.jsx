import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtTabBar, AtButton } from 'taro-ui'
import NavBar from '../../components/NavBar/NavBar'
import './my_orders.less'
import { appConfig } from '../../config'

export default class MyOrders extends Component {
    config = {
        navigationBarTitleText: '我的订单',
        navigationBarTextStyle: "black"
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            list: []
        }
    }


    handleClick = value => {
        this.setState({
            current: value
        })
    }

    componentWillMount() {
        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,                 //月份 
                "d+": this.getDate(),                    //日 
                "h+": this.getHours(),                   //小时 
                "m+": this.getMinutes(),                 //分 
                "s+": this.getSeconds(),                 //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds()             //毫秒 
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }

        Taro.getStorage({ key: 'sessionID' })
            .then(res => {
                let sessionID = res.data
                return Taro.request({
                    url: appConfig.apiBaseUrl + '/orders',
                    method: 'POST',
                    header: {
                        'content-type': 'application/json', // 默认值
                        "cookie": sessionID
                    },
                })
            })
            .then((res) => {
                if (res.data.code == 200) {
                    console.log('Taro.request->orders=>', res.data)
                    let list = res.data.data
                    list.forEach(e => {
                        e.date = new Date(e.time).format("yyyy-MM-dd");
                        e.number = '订单号：' + e.id
                    })

                    this.setState({
                        list
                    })

                }
            })
    }
    getStatus = status => {
        let res = ''
        switch (status) {
            case 0: res = '待付款'; break;
            case 1: res = '待服务'; break;
            case 2: res = '已完成'; break;
            default: break;
        }
        return res;
    }
    renderList = () => {
        const { current, list } = this.state;
        let res = []
        switch (current) {
            case 0:
                res = list
                break
            case 1:
                res = list.filter(e => e.status == 0)
                break
            case 2:
                res = list.filter(e => e.status == 1)
                break
            case 3:
                res = list.filter(e => e.status == 2)
                break
            default: break
        }

        return res.length
            ? res.map((item, idx) => {
                return <View className="list-item" key={item.id}>
                    <View className="title">
                        <View className="left">关爱大脑健康套餐</View>
                        <View className="right">{this.getStatus(item.status)}</View>
                    </View>

                    <View className="fields">
                        <View className="name">订单编号</View>
                        <View className="value">{item.id}</View>
                        <View className="copy">复制</View>
                    </View>
                    <View className="fields">
                        <View className="name">体检人</View>
                        <View className="value">{item.name}</View>
                    </View>
                    <View className="fields">
                        <View className="name">下单时间</View>
                        <View className="value">{item.createAt}</View>
                    </View>
                    <View className="fields">
                        <View className="name">体检时间</View>
                        <View className="value">{item.time}</View>
                    </View>
                    <View className="fields">
                        <View className="name">体检机构</View>
                        <View className="value">{item.hospital}</View>
                    </View>

                    <View className="price">
                        实付金额:<Text className="bold">￥{item.price}</Text>
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
            <View className="order-list">
                {this.renderList()}
            </View>


            <View className="contact">
                <AtButton className="btn" openType="contact">联系客服</AtButton>
            </View>
        </View>
    }
}

