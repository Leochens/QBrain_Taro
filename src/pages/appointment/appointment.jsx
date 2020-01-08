import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtSteps, AtForm, AtInput, AtButton, AtRadio } from 'taro-ui'

import './Appointment.less'
import DateSelector from '../../components/DateSelector/DateSelector';
const app = Taro.getApp();

export default class Appointment extends Component {

    state = {
        step: 0,
        statusBarHeight: app.state.statusBarHeight,

        name: '冯亮',
        gender: null,
        phone: '13204020948',
        idCard: '142625199203270056',



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
        const { name, gender, phone, idCard, date } = this.state;
        if (!name || !gender || !phone || !idCard) {
            return Taro.showToast({
                title: "请将字段填写完整",
                icon: 'none'
            })
        }
        console.log("提交成功", name, gender, phone, idCard, date)
        Taro.showToast({
            title: "提交成功",
            icon: 'success'
        })
    }
    renderConfirm() {
        const { name, gender, phone, idCard, date } = this.state;
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
                        this.setState({
                            name: e
                        })
                    }}
                />




                <AtRadio
                    options={[
                        { label: '男', value: '0' },
                        { label: '女', value: '1' },
                    ]}
                    value={gender}
                    onClick={(value) => this.setState({ gender: value })}
                />


                <AtInput
                    name='phone'
                    title='手机号'
                    type='text'
                    placeholder='请输入手机号'
                    value={phone}
                    onChange={(e) => {
                        this.setState({
                            phone: e
                        })
                    }}
                />

                <AtInput
                    name='idCard'
                    title='身份证'
                    type='text'
                    placeholder='请输入身份证号'
                    value={idCard}
                    onChange={(e) => {
                        this.setState({
                            idCard: e
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