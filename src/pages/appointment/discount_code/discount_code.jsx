import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Label, Input } from '@tarojs/components'
import NavBar from '../../../components/NavBar/NavBar'

import './discount_code.less'
import { AtIcon, AtInput } from 'taro-ui'

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

            </View>
        </View>
    }
}

