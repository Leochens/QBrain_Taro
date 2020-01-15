import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Button } from '@tarojs/components'
import { AtSteps, AtForm, AtInput, AtButton, AtRadio, AtIcon } from 'taro-ui'
import NavBar from '../../components/NavBar/NavBar'
import './Appointment.less'
import DateSelector from '../../components/DateSelector/DateSelector';
import { REG, getAgeByIdCard } from '../../utils'
const { testIDCard, testName, testPhone } = REG;
const app = Taro.getApp();
import { appConfig } from '../../config'

export default class Appointment extends Component {

    state = {
        step: 0,
        statusBarHeight: app.state.statusBarHeight,

        name: '',
        gender: null,
        phone: '',
        idCard: '',
        isloading: false,

        selectHospital: '',
        isAgree: true,
        isAgeOutRange: false,
        dt: 1,
        hospitals: [
            {
                name: '美年大健康（牡丹园店）',
                address: "北京市海淀区花园北路35号9号楼健康智谷大厦B1",
                price: '￥2999',
                count: 0,
                work_time: '',
                phone: ''


            },
            {
                name: '美年大健康（大望路店）',
                address: "北京市朝阳区西大望路15号外企大厦B座5层",
                price: '￥2999',
                count: 20,
                work_time: '',
                phone: ''


            },
        ]

    }
    componentDidMount() {

    }
    renderHospitals = () => {
        const { hospitals } = this.state;

        return hospitals.map((item, idx) => <View className="item">
            <View className="detail">
                <View className="name">{item.name}</View>
                <View className="address">{item.address}</View>
                <View className="price">￥{item.price} <Text className="full-ap" hidden={item.count}>约满</Text></View>
            </View>
            <View className={`select ${item.count ? '' : 'disabled'}`} data-id={idx} onClick={item.count ? e => this.handleSelectHospital(e) : () => { }}>
                选择
        </View>
        </View>)
    }
    handleSelectDate = date => {

        Taro.getStorage({ key: 'sessionID' })
            .then(res => {
                let sessionID = res.data
                return Taro.request({
                    url: appConfig.apiBaseUrl + '/institutions',
                    data: {
                        date
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
                    let list = res.data.data

                    this.setState({
                        hospitals: list
                    })

                }
            })
        this.setState({
            date
        })
    }
    handleSelectHospital(e) {
        const { id } = e.target.dataset;
        console.log(id);
        const { hospitals } = this.state;
        this.setState({
            step: 1,
            selectHospital: hospitals[id].name
        })
    }
    renderSelectAddressDate() {
        return <View className="select-address-date">

            <View className="city">
                <View>北京市</View>
                <AtIcon className="icon" value="chevron-right" />
            </View>
            <View className="select-date">
                <DateSelector onChangeDate={this.handleSelectDate} />
            </View>
            <View className="hospital">
                {this.renderHospitals()}
            </View>

        </View>
    }
    componentDidShow() {
        console.log('LLL', this.state);
        this.setState({
            dt: this.state.dt
        })
    }
    onSubmit = (e) => {
        // console.log(e);
        const { name, gender, phone, idCard, date } = this.state;
        if (!name) {
            return Taro.showToast({
                title: "请填写姓名",
                icon: 'none'
            })
        }

        if (!testName(name)) {
            return Taro.showToast({
                title: "中文名不规范",
                icon: 'none'
            })
        }

        if (!gender) {
            return Taro.showToast({
                title: "请选择性别",
                icon: 'none'
            })
        }

        if (!phone) {
            return Taro.showToast({
                title: "请填写手机号",
                icon: 'none'
            })
        }

        if (!testPhone(phone)) {
            return Taro.showToast({
                title: "手机号不正确",
                icon: 'none'
            })
        }


        if (!idCard) {
            return Taro.showToast({
                title: "请填写身份证号",
                icon: 'none'
            })
        }

        if (!testIDCard(idCard)) {
            return Taro.showToast({
                title: "身份证号错误",
                icon: 'none'
            })
        }
        const age = getAgeByIdCard(idCard);
        if (age > 75 || age < 17) {
            this.setState({
                isAgeOutRange: true
            })
            return;
        }


        let code = '123123'
        let hospital = '宣武医院'

        let order = {
            name, gender, phone, idCard, date, code, hospital
        }

        console.log('order=>', order)


        this.setState({
            isloading: true
        })

        let that = this
        Taro.getStorage({ key: 'sessionID' })
            .then(res => {
                let sessionID = res.data
                return Taro.request({
                    url: appConfig.apiBaseUrl + '/order',
                    method: 'POST',
                    header: {
                        'content-type': 'application/json', // 默认值
                        "cookie": sessionID
                    },
                    data: {
                        order
                    }
                })
            })
            .then((res) => {
                that.setState({
                    isloading: false
                })
                if (res.data.code == 200) {
                    // Taro.showToast({
                    //     title: "提交成功",
                    //     icon: 'success'
                    // })

                    Taro.navigateTo({
                        url: '/pages/my_orders/my_orders'
                    })
                } else {
                    Taro.showToast({
                        title: "提交成功",
                        icon: 'error'
                    })
                }
            })


    }
    toggleAgree = () => {
        this.setState({
            isAgree: !this.state.isAgree
        })
    }
    renderConfirm() {
        const { name, gender, phone, idCard, date, isAgeOutRange, selectHospital, isAgree, dt } = this.state;
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
                            idCard: e,
                            isAgeOutRange: false
                        })
                    }}
                />
            </AtForm>
            <View className="cur-hospital">
                <View className="h-title">{selectHospital}</View>
                <View className="date">{date}</View>
            </View>

            <View className="discount-code" onClick={() => {
                Taro.navigateTo({
                    url: '/pages/appointment/discount_code/discount_code'
                })
            }}>
                <View className="d-title">优惠码 {dt}</View>
                <AtIcon className="d-icon" value="chevron-right" />
            </View>
            <View className="line" />

            <View className="bottom">
                <View className="age-out-range" hidden={!isAgeOutRange}>您的年龄不在适用范围</View>
                <View className="tip">
                    <AtIcon onClick={this.toggleAgree} size={16} className={`icon ${isAgree ? 'check' : ''}`} value="check-circle" />
                    <View className="doc">
                        我同意{this.state.dt}
                        <Text className="content" onClick={() => { }}>《脑健康体检知情同意书》</Text>
                    </View>
                </View>
                <View className="order">
                    <View className="price">
                        <View>
                            总计：
                            <Text className="int">2999</Text>
                            <Text className="float">.00</Text>
                        </View>
                    </View>
                    <Button disabled={!isAgree} style={{
                        backgroundColor: isAgree ? '' : 'rgba(179,183,186,1);',
                        color: isAgree ? '' : '#999',
                    }} className="btn" onClick={this.onSubmit}>立即支付</Button>
                </View>
            </View>


        </View>

    }
    render() {
        const { step } = this.state;
        console.log(this.state);
        return <View>
            <NavBar title="体检预约" />
            <View style={{
                height: this.state.statusBarHeight,
                width: '100%',
                backgroundColor: 'transparent',
                color: 'transparent'
            }}>占位</View>

            <View className="wrap">
                <View className="step-wrap">
                    <AtSteps current={step} className="step" items={[{ title: '选择地点' }, { title: "确认信息" }]} />
                </View>
                <AtToast isOpened={this.state.isloading} text="正在处理..." status="loading"></AtToast>
                {step
                    ? this.renderConfirm()
                    : this.renderSelectAddressDate()}

            </View>
        </View>

    }
}