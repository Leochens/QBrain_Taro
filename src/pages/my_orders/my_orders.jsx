import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtTabBar } from 'taro-ui'
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
            list: [
                // {
                //     name: '贾志杰',
                //     gender: '女',
                //     time: '2018-03-12',
                //     hospital: '安贞医院分院',
                //     number: '订单号：dafagadgah1234'
                // }
            ]
        }
    }

    
    handleClick = value => {
        this.setState({
            current: value
        })
    }

    componentWillMount(){
        Date.prototype.format = function(fmt) { 
            var o = { 
                "M+" : this.getMonth()+1,                 //月份 
                "d+" : this.getDate(),                    //日 
                "h+" : this.getHours(),                   //小时 
                "m+" : this.getMinutes(),                 //分 
                "s+" : this.getSeconds(),                 //秒 
                "q+" : Math.floor((this.getMonth()+3)/3), //季度 
                "S"  : this.getMilliseconds()             //毫秒 
            }; 
            if(/(y+)/.test(fmt)) {
                    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
            }
             for(var k in o) {
                if(new RegExp("("+ k +")").test(fmt)){
                     fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                 }
             }
            return fmt; 
        }

        Taro.getStorage({ key: 'sessionID'})
        .then(res =>{
            let sessionID = res.data
            return Taro.request({
                url: appConfig.apiBaseUrl+'/orders',
                method:'POST',
                header: {
                    'content-type': 'application/json', // 默认值
                    "cookie": sessionID
                },
            })
        })
        .then((res)=>{
            if(res.data.code==200){
                console.log('Taro.request->orders=>',res.data)
                let list = res.data.data
                list.forEach(e=>{
                    e.date = new Date(e.time).format("yyyy-MM-dd");
                    e.number = '订单号：'+e.id
                })

                this.setState({
                    list
                })

            }
        })
    }

    renderList = () => {
        const { current, list } = this.state;
        let res = []
        switch (current) {
            case 0: 
                res = list
                break
            case 1: 
                res = list.filter(e=>e.status == 0)
                break
            case 2: 
                res = list.filter(e=>e.status == 1)
                break
            case 3: 
                res = list.filter(e=>e.status == 2)
                break
            default: break
        }

        return res.length
            ? res.map((item, idx) => {
                return <View className="list-item" key={idx}>
                    <View className="left">
                        <View className="name">{item.name}</View>
                        <View className="gender">{item.gender==0 ? '男' : '女'}</View>
                    </View>
                    <View className="middle">
                        <View className="time">{item.date}</View>
                        <View className="hospital">{item.hospital}</View>
                        <View className="number">{item.number}</View>
                        <View className="price">{item.price}</View>
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

