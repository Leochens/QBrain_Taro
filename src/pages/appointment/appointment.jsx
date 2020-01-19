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
import pay from '../../utils/payment';

export default class Appointment extends Component {

    state = {
        step: 0,
        statusBarHeight: app.state.statusBarHeight,

        name: '',
        gender: null,
        phone: '',
        idCard: '',
        isloading: false,

        selectHospital: {},
        dtPrice: null,
        dt: null,
        dcode: null,
        isAgree: true,
        isAgeOutRange: false,
        cities: [],
        hospitals: [],
        curCity: ''


    }
    componentDidMount() {
        const d = new Date();
        const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        Taro.getStorage({ key: 'sessionID' })
            .then(res => {
                let sessionID = res.data
                return Taro.request({
                    url: appConfig.apiBaseUrl + '/institutions',
                    method: 'POST',
                    data: {
                        date
                    },
                    header: {
                        'content-type': 'application/json', // 默认值
                        "cookie": sessionID
                    },
                })
            })
            .then((res) => {
                if (res.data.code == 200) {
                    console.log('Taro.request->ins=>', res.data)
                    let list = res.data.data;
                    let cities = new Set();
                    for (let i = 0; i < list.length; i++) {
                        cities.add(list[i].city);
                    }
                    cities = Array.from(cities);
                    const curCity = cities[0];

                    this.setState({
                        cities,
                        curCity
                    })

                }
            })
    }
    renderHospitals = () => {
        const { hospitals, curCity } = this.state;
        const list = hospitals.filter(item => item.city === curCity);

        return list.map((item, idx) => <View className="item">
            <View className="detail">
                <View className="name">{item.name}</View>
                <View className="address">{item.address}</View>
                <View className="price">￥{item.price} <Text className="full-ap" hidden={item.count}>约满</Text></View>
            </View>
            <View className={`select ${item.count ? '' : 'disabled'}`} data-hospital={item} onClick={item.count ? e => this.handleSelectHospital(e) : () => { }}>
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
        const { hospital } = e.target.dataset;
        console.log(hospital);
        this.setState({
            step: 1,
            selectHospital: hospital
        })
    }
    handelCityChange = e => {
        const { cities } = this.state;
        this.setState({
            curCity: cities[e.detail.value]
        })
    }
    renderSelectAddressDate() {
        const { curCity, cities } = this.state;
        return <View className="select-address-date">
            <Picker mode='selector' range={cities} onChange={this.handelCityChange}>

                <View className="city">
                    <View>{curCity}</View>
                    <AtIcon className="icon" value="chevron-right" />
                </View>
            </Picker>

            <View className="select-date">
                <DateSelector onChangeDate={this.handleSelectDate} />
            </View>
            <View className="hospital">
                {this.renderHospitals()}
            </View>


        </View>
    }
    componentWillUnmount() {
        app.globalData = {} // 清空缓存
    }
    componentDidShow() {


        const dt = app.globalData.discount;
        const dcode = app.globalData.discount_code;
        if (!dt || !dcode) return;
        app.globalData = {} // 清空缓存
        this.setState({
            dt,
            dcode,
            dtPrice: this.state.selectHospital.price - dt
        })

    }
    onSubmit = (e) => {
        // console.log(e);
        const { name, gender, phone, idCard, date, dcode, selectHospital } = this.state;
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


        let sale_code = '123123' // 销售代号
        let discount_code = dcode;
        let institution_id = selectHospital.id

        let order = {
            name, gender, phone, idCard, date, sale_code, institution_id, discount_code
        }

        console.log('order=>', order)
        pay(order, '/order');
    }
    toggleAgree = () => {
        this.setState({
            isAgree: !this.state.isAgree
        })
    }
    renderConfirm() {
        const { name, gender, phone, idCard, date, isAgeOutRange, selectHospital, isAgree, dt, dtPrice } = this.state;
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
                <View className="h-title">{selectHospital.name}</View>
                <View className="date">{date}</View>
            </View>

            <View className="discount-code" onClick={() => {
                Taro.navigateTo({
                    url: '/pages/appointment/discount_code/discount_code'
                })
            }}>
                <View className="d-title">优惠码 {dt ? '已优惠' + dt + '元' : ''}</View>
                <AtIcon className="d-icon" value="chevron-right" />
            </View>
            <View className="line" />

            <View className="bottom">
                <View className="age-out-range" hidden={!isAgeOutRange}>您的年龄不在适用范围</View>
                <View className="tip">
                    <AtIcon onClick={this.toggleAgree} size={16} className={`icon ${isAgree ? 'check' : ''}`} value="check-circle" />
                    <View className="doc">
                        我同意
                        <Text className="content" onClick={() => {
                            Taro.navigateTo({
                                url: '/pages/appointment/disclaimer/disclaimer'
                            })
                        }}>《脑健康体检知情同意书》</Text>
                    </View>
                </View>
                <View className="order">
                    <View className="price">
                        总计：
                            <View className="container">
                            <View hidden={!dt} className="dt">优惠￥{dt}</View>
                            <Text className="int">{dtPrice ? dtPrice : selectHospital.price}</Text>
                            <Text className="float">.00</Text>
                        </View>
                    </View>
                    <Button disabled={!isAgree} style={{
                        backgroundColor: isAgree ? '' : 'rgba(179,183,186,1);',
                        color: isAgree ? '' : '#fff',
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