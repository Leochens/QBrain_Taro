import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtForm, AtInput, AtButton, AtIcon } from 'taro-ui'
import NavBar from '../../components/NavBar/NavBar'
import './full_test.less'
import NBTitle from '../../components/NBTitle/NBTitle'

export default class FullTest extends Component {
    config = {
        navigationBarTitleText: '完整评测',
        navigationBarTextStyle: "white"
    }
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    handleChange = e => {
        console.log(e);

    }
    render() {
        return <View className="wrap">
            <NavBar title={`完整评测`} bgColor="#247ed2" color="#ffffff" />
            <NBTitle white >
                <View className="content">
                    <View >命名测验</View>
                    <View className="score">
                        <View>45分</View>
                        <AtIcon size="20px" className="icon" value="chevron-right" />
                    </View>
                </View>
            </NBTitle>
            <NBTitle white >
                <View className="content">
                    <View >连线测验</View>
                    <View className="score">
                        <View>5/21</View>
                        <AtIcon size="20px" className="icon" value="chevron-right" />
                    </View>
                </View>
            </NBTitle>
            <NBTitle white >
                <View className="content">
                    <View >情绪评测</View>
                    <View className="score">
                        <View style={{
                            color: '#999'
                        }}>未完成</View>
                        <AtIcon size="20px" className="icon" value="chevron-right" />
                    </View>
                </View>
            </NBTitle>



        </View>
    }
}

