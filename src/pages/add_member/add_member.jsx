import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import NavBar from '../../components/NavBar/NavBar'
import './add_member.less'

export default class AddMemebr extends Component {
    config = {
        navigationBarTitleText: '添加体检人',
        navigationBarTextStyle: "black"
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            gender: '',
            phone: '',
            idcard: ''
        }
    }
    componentDidMount() {
        console.log(this.$router.params);
        if (!this.$router.params.user) return;
        const user = JSON.parse(this.$router.params.user);

        this.setState({
            name: user.name,
            gender: user.gender,
            phone: user.phone,
            idcard: user.idcard
        })
    }
    handleChange = e => {
        console.log(e);

    }
    render() {
        return <View className="wrap">
            <NavBar title={`${this.$router.params.user ? '编辑' : '添加'}体检人`} />
            <AtForm className="form">
                <AtInput
                    name='name'
                    title='体检人'
                    type='text'
                    placeholder='请输入体检人'
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <AtInput
                    name='gender'
                    title='性别'
                    type='text'
                    placeholder=''
                    value={this.state.gender}
                    onChange={this.handleChange}
                />
                <AtInput
                    name='phone'
                    title='手机号'
                    type='text'
                    placeholder='请输入手机号'
                    value={this.state.phone}
                    onChange={this.handleChange}
                />
                <AtInput
                    name='idcard'
                    title='身份证'
                    type='text'
                    placeholder='请输入身份证号'
                    value={this.state.idcard}
                    onChange={this.handleChange}
                />
            </AtForm>
            <AtButton className="submit" >提交</AtButton>

        </View>
    }
}

