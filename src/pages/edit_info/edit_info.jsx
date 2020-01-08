import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtTabBar } from 'taro-ui'
import NavBar from '../../components/NavBar/NavBar'
import './edit_info.less'

export default class EditInfo extends Component {
    config = {
        navigationBarTitleText: '编辑信息',
        navigationBarTextStyle: "black"
    }
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    name: '贾志杰',
                    gender: "女",
                    phone: '123334444',
                    idcard: '12132252363466'
                },
                {
                    name: '贾志杰',
                    gender: "女",
                    phone: '123334444',
                    idcard: '12132252363466'
                }
            ]
        }
    }

    updateUser = (id, user) => {
        const { list } = this.state;
        const res = list.slice();
        res[id] = user;
        this.setState({
            list: res
        })
    }
    toEdit = e => {
        const { list } = this.state;
        const id = e.currentTarget.dataset.id
        console.log(id);
        const user = list[id];
        Taro.navigateTo({
            url: '/pages/add_member/add_member?user=' + JSON.stringify(user)
        })


    }
    renderList = () => {
        const { list } = this.state;
        return list.map((item, idx) => {
            return <View className="item" key={idx}>
                <View className="block">
                    <View className="name">{item.name}</View>
                    <View className="edit" onClick={this.toEdit} data-id={idx}>编辑信息</View>
                </View >
                <View className="gender">性别: {item.gender}</View>
                <View className="phone">手机: {item.phone}</View>
                <View className="idcard">身份证: {item.idcard}</View>
            </View>
        })
    }
    render() {
        return <View className="wrap">
            <NavBar title="编辑信息" />
            <View className="list">
                {this.renderList()}
            </View>
            <View className="add" onClick={this.toEdit}>添加体检人</View>

        </View>
    }
}

