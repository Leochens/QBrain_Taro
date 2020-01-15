import Taro, { Component, getCurrentPages, getApp } from '@tarojs/taro'
import { View, Button, Text, Label, Input } from '@tarojs/components'
import NavBar from '../../../components/NavBar/NavBar'
import { appConfig } from '../../../config'
import './discount_code.less'
import { AtIcon, AtInput, AtButton } from 'taro-ui'

export default class DiscountCode extends Component {
    config = {
        navigationBarTitleText: '输入优惠码',
        navigationBarTextStyle: "black"
    }
    constructor() {
        const app = Taro.getApp();
        this.state = {
            value: ''
        }

    }

    handleChange = e => {
        console.log(e);
        this.setState({
            value: e
        })
    }
    handleConfirm = e => {
        const { value } = this.state;
        console.log("优惠码提交", value)

        Taro.getStorage({ key: 'sessionID' })
            .then(res => {
                let sessionID = res.data
                return Taro.request({
                    url: appConfig.apiBaseUrl + '/discount_code',
                    data: {
                        discount_code: value
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/json', // 默认值
                        "cookie": sessionID
                    },
                })
            })
            .then((res) => {
                if (res.data.code == 200) {
                    console.log('Taro.request->ins=>', res.data)
                    let data = res.data.data
                    if (!data || data.is_use) return Taro.showToast({
                        title: '优惠码无效',
                        icon: 'none'
                    });
                    Taro.showToast({
                        title: "优惠码验证成功",
                        icon: 'success'
                    })

                    const app = Taro.getApp();
                    app.globalData = {
                        discount: data.discount,
                        discount_code: value
                    }

                    Taro.navigateBack({
                        delta: 1
                    })

                } else {
                    console.log("服务器错误");
                }
            })

    }

    render() {
        return <View className="wrap">
            <NavBar title="输入优惠码" />
            <View className="inp">

                <AtInput
                    customStyle={{
                        padding: '10px 30px'
                    }}
                    name='value'
                    type='text'
                    placeholder='优惠码'
                    value={this.state.value}
                    onChange={this.handleChange}
                    onConfirm={this.handleConfirm}
                />

                <AtButton className="confirm-btn" onClick={this.handleConfirm}>提交</AtButton>
            </View>
        </View>
    }
}

