import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './Modal.less'
// const app = Taro.getApp();
export default class Modal extends Component {

    render() {
        const { showModal } = this.props;

        return <View hidden={!showModal} className="mask" onClick={this.props.hide}>
            <View className="modal">
                <View className="title">
                    可用城市
                </View>
                <View className="content">
                    <View className="city">北京市</View>
                    <View className="list">
                        <View className="item">
                            <View className="name">宣武医院</View>
                            <View className="address">北京市西城区xxxxxxxx</View>
                        </View>
                        <View className="item">
                            <View className="name">宣武医院</View>
                            <View className="address">北京市西城区xxxxxxxx</View>
                        </View>
                    </View>
                </View>


            </View>
        </View>
    }
}