
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './GenModal.less'
// const app = Taro.getApp();
export default class GenModal extends Component {

    render() {
        const { showModal } = this.props;

        return <View hidden={!showModal} className="mask" onClick={this.props.hide}>
            <View className="modal">
                <View className="title">
                    选择日期
                </View>
                <View className="content">
                    {this.props.children}
                </View>
            </View>
        </View>
    }
}