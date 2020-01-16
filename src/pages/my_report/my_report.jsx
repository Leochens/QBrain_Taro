import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtToast } from 'taro-ui'
import NavBar from '../../components/NavBar/NavBar'
import './my_report.less'
import { appConfig } from '../../config'


export default class MyReport extends Component {
    config = {
        navigationBarTitleText: '我的报告',
        navigationBarTextStyle: "black"
    }

    checkReport = (report_url) => (e) => {
        this.setState({
            isloading:true
        })

        let that = this
        Taro.downloadFile({
            // url: 'https://static-ac.oss-cn-zhangjiakou.aliyuncs.com/qbrain-report/report.pdf?spm=5176.8466032.0.dopenurl.a16a1450iK6RnX&file=report.pdf',
            url: report_url,

            success: function (res) {
                var filePath = res.tempFilePath
                that.setState({
                    isloading:false
                })
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
            list: [
                // {
                //     name: '贾志杰',
                //     gender: '女',
                //     time: '2018-03-12',
                //     hospital: '安贞医院分院',
                //     number: '订单号：dafagadgah1234'
                // }, {
                //     name: '贾志杰',
                //     gender: '男',
                //     time: '2018-03-12',
                //     hospital: '安贞医院分院',
                //     number: '订单号：dafagadgah1234'
                // }
            ],
            isloading:false
        }

        


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
                    list:list.filter(e=>e.status==2)
                })

            }
        })
    }
    renderList = () => {
        const { list } = this.state;

        return list.length
            ? list.map((item, index) => {
                return <View className="item" key={item.id}>
                    <View className="left">
                        <View className="name">{item.name}</View>
                        <View className="gender">{item.gender==0 ? '男' : '女'}</View>
                    </View>
                    <View className="middle">
                        <View className="time">{item.date}</View>
                        <View className="hospital">{item.hospital}</View>
                        <View className="number">{item.number}</View>
                    </View>
                    <View className="right">
                        <View className="btn" data-id={index} onClick={this.checkReport(item.report_url)}>查看</View>
                    </View>
                </View>
            })
            : <View className="empty">暂时还没有报告</View>

    }
    render() {
        return <View className="wrap">
            <NavBar title="我的报告" />
            <View className="content">
                <AtToast isOpened={this.state.isloading} text="正在打开pdf..." status="loading"></AtToast>
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

