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
                            <View className="name">美年大健康（牡丹园店）</View>
                            <View className="address">北京市海淀区花园北路35号9号楼健康智谷大厦B1</View>
                        </View>
                        <View className="item">
                            <View className="name">美年大健康（大望路店）</View>
                            <View className="address">北京市朝阳区西大望路15号外企大厦B座5层</View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }
}