import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSteps, AtForm, AtInput, AtButton } from 'taro-ui'

import './Appointment.less'
import DateSelector from '../../components/DateSelector/DateSelector';
const app = Taro.getApp();

export default class Appointment extends Component {

    state = {
        step: 0,
        statusBarHeight: app.state.statusBarHeight,

        name: '',
        gender: null,
        phone: '',
        address: '',
        gatecode: ''


    }
    handleSelectDate = date => {
        console.log("用户选择了", date)
        this.setState({
            date
        })
    }
    handleSelectHospital(e) {
        const { id } = e.target.dataset;
        console.log(id);
        this.setState({
            step: 1
        })
    }
    renderSelectAddressDate() {
        return <View className="select-address-date">

            <View className="city">
                北京市
                <View className="at-col">
                    <AtIcon className="icon" value="chevron-right" />
                </View>
            </View>
            <View className="select-date">
                <DateSelector onChangeDate={this.handleSelectDate} />
            </View>
            <View className="hospital">
                <View className="item">
                    <View className="detail">
                        <View className="name">北京市宣武医院</View>
                        <View className="address">北京市西城区xxxxxxxx</View>
                        <View className="price">￥2999</View>
                    </View>
                    <View className="select" data-id={0} onClick={this.handleSelectHospital}>
                        选择
                    </View>
                </View>
                <View className="item">
                    <View className="detail">
                        <View className="name">北京市宣武医院</View>
                        <View className="address">北京市西城区xxxxxxxx</View>
                        <View className="price">￥2999</View>
                    </View>
                    <View className="select" data-id={0} onClick={this.handleSelectHospital}>
                        选择
                    </View>
                </View>
            </View>

        </View>
    }

    onSubmit = (e) => {
        // console.log(e);
        const { name, gender, phone, address, gatecode, date } = this.state;
        console.log("提交成功", name, gender, phone, address, gatecode, date)
    }
    renderConfirm() {
        const { name, gender, phone, address, gatecode, date } = this.state;
        return <View className="confirm">

            <AtForm
            >
                <AtInput
                    name='name'
                    title='体检人'
                    type='text'
                    placeholder='请输入体检人姓名'
                    value={name}
                    onChange={(e) => {
                        console.log(e)
                        this.setState({
                            name: e
                        })
                    }}
                />

                <AtInput
                    name='gender'
                    title='性别'
                    type='select'
                    value={gender}
                    onChange={(e) => {
                        console.log(e)
                        this.setState({
                            gender: e
                        })
                    }}
                />

                <AtInput
                    name='phone'
                    title='手机号'
                    type='text'
                    placeholder='请输入手机号'
                    value={phone}
                    onChange={(e) => {
                        console.log(e)
                        this.setState({
                            phone: e
                        })
                    }}
                />
                <AtInput
                    name='address'
                    title='收货地址'
                    type='text'
                    placeholder='点击选择'
                    value={address}
                    onChange={(e) => {
                        console.log(e)
                        this.setState({
                            address: e
                        })
                    }}
                />
                <AtInput
                    name='gatecode'
                    title='门牌号'
                    type='text'
                    placeholder='详细地址，例如：1层1单元101室'
                    value={gatecode}
                    onChange={(e) => {
                        console.log(e)
                        this.setState({
                            gatecode: e
                        })
                    }}
                />
            </AtForm>
            <View className="cur-hospital">
                <View className="h-title">北京市宣武医院</View>
                <View className="date">{date}</View>
            </View>
            <View className="line" />
            <View className="order">
                <View className="price">
                    <View>
                        总计：
                        <Text className="int">2999</Text>
                        <Text className="float">.00</Text>
                    </View>
                </View>
                <View className="btn" onClick={this.onSubmit}>立即支付</View>
            </View>

        </View>

    }
    render() {
        const { step } = this.state;

        return <View>
            <View style={{
                height: this.state.statusBarHeight,
                width: '100%',
                backgroundColor: 'transparent',
                color: 'transparent'
            }}>占位</View>

            <View className="wrap">
                <View className="title">体检预约</View>
                <View className="step-wrap">
                    <AtSteps current={step} className="step" items={[{ title: '选择地点' }, { title: "确认信息" }]} />
                </View>

                {step
                    ? this.renderConfirm()
                    : this.renderSelectAddressDate()}

            </View>
        </View>

    }
}