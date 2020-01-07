import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import NavBar from '../../components/NavBar/NavBar'
import './my_report.less'


export default class MyReport extends Component {
    config = {
        navigationBarTitleText: '我的报告',
        navigationBarTextStyle: "black"
    }

    checkReport = () => {
        Taro.downloadFile({
            url: 'https://static-ac.oss-cn-zhangjiakou.aliyuncs.com/qbrain-report/report.pdf?spm=5176.8466032.0.dopenurl.a16a1450iK6RnX&file=report.pdf',
            success: function (res) {
                var filePath = res.tempFilePath
                Taro.openDocument({
                    filePath: filePath,
                    success: function (res) {
                        console.log('打开文档成功', res);
                    }
                })
            }
        })
    }
    constructor(props) {
        super(props);


        this.state = {
            list: [{
                name: '贾志杰',
                gender: '女',
                time: '2018-03-12',
                hospital: '安贞医院分院',
                number: '订单号：dafagadgah1234'
            }, {
                name: '贾志杰',
                gender: '男',
                time: '2018-03-12',
                hospital: '安贞医院分院',
                number: '订单号：dafagadgah1234'
            }]
        }
    }

    renderList = () => {
        const { list } = this.state;

        return list.length
            ? list.map((item, idx) => {
                return <View className="item" key={idx}>
                    <View className="left">
                        <View className="name">{item.name}</View>
                        <View className="gender">{item.gender}</View>
                    </View>
                    <View className="middle">
                        <View className="time">{item.time}</View>
                        <View className="hospital">{item.hospital}</View>
                        <View className="number">{item.number}</View>
                    </View>
                    <View className="right">
                        <View className="btn" data-id={idx} onClick={this.checkReport}>查看</View>
                    </View>
                </View>
            })
            : <View className="empty">暂时还没有报告</View>

    }
    render() {
        return <View className="wrap">
            <NavBar title="我的报告" />
            <View className="content">

                <View hidden={!this.state.list.length} className="tip">
                    请选择您要查看的报告：
                </View>

                <View className="list">
                    {this.renderList()}
                </View>
            </View>
        </View>
    }
}

