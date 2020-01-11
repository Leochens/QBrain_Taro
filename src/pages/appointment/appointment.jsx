import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtSteps, AtForm, AtInput, AtButton, AtRadio } from 'taro-ui'
import NavBar from '../../components/NavBar/NavBar'
import './Appointment.less'
import DateSelector from '../../components/DateSelector/DateSelector';
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
        isloading:false
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
                        <View className="name">美年大健康（牡丹园店）</View>
                        <View className="address">北京市海淀区花园北路35号9号楼健康智谷大厦B1</View>
                        <View className="price">￥2999</View>
                    </View>
                    <View className="select" data-id={0} onClick={this.handleSelectHospital}>
                        选择
                    </View>
                </View>
                <View className="item">
                    <View className="detail">
                        <View className="name">美年大健康（大望路店）</View>
                        <View className="address">北京市朝阳区西大望路15号外企大厦B座5层</View>
                        <View className="price">￥2999</View>
                    </View>
                    <View className="select" data-id={0} onClick={this.handleSelectHospital}>
                        选择
                    </View>
                </View>
            </View>

        </View>
    }
    testName = name => {
        var p = /^[\u4E00-\u9FA5·]{2,10}$/;
        return p.test(name);
    }
    testPhone = value => {
        if (value.substring(0, 3) === '+86') {
            return value.length == 14 && /^\+?\d{1,}[- ]?[\d\- ]{1,}?\d{1,}$/.test(value)
        } else {
            return value.length > 8 & value.length < 15 & /^\+?\d{1,}[- ]?[\d\- ]{1,}?\d{1,}$/.test(value)
        }
    }
    // 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
    // 详情查看javascript的数值范围
    testIDCard = (idcode) => {
        // 加权因子
        var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        // 校验码
        var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

        var code = idcode + "";
        var last = idcode[17];//最后一位

        var seventeen = code.substring(0, 17);

        // ISO 7064:1983.MOD 11-2
        // 判断最后一位校验码是否正确
        var arr = seventeen.split("");
        var len = arr.length;
        var num = 0;
        for (var i = 0; i < len; i++) {
            num = num + arr[i] * weight_factor[i];
        }
        // 获取余数
        var resisue = num % 11;
        var last_no = check_code[resisue];
        var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
        // 判断格式是否正确
        var format = idcard_patter.test(idcode);
        // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
        return last === last_no && format ? true : false;
    }

    onSubmit = (e) => {
        // console.log(e);
        const { name, gender, phone, idCard, date } = this.state;
        

        if (!name ) {
            return Taro.showToast({
                title: "请填写姓名",
                icon: 'none'
            })
        }

        if (!this.testName(name)) {
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

        if (!phone ) {
            return Taro.showToast({
                title: "请填写手机号",
                icon: 'none'
            })
        }

        if (!this.testPhone(phone)) {
            return Taro.showToast({
                title: "手机号不正确",
                icon: 'none'
            })
        }


        if (!idCard ) {
            return Taro.showToast({
                title: "请填写身份证号",
                icon: 'none'
            })
        }

        
        if (!this.testIDCard(idCard)) {
            return Taro.showToast({
                title: "身份证号错误",
                icon: 'none'
            })
        }


        let code = '123123'
        let hospital = '宣武医院'

        let order = {
            name, gender, phone, idCard, date,code,hospital
        }

        console.log('order=>',order)


        this.setState({
            isloading:true
        })

        let that = this
        Taro.getStorage({ key: 'sessionID'})
        .then(res =>{
            let sessionID = res.data
            return Taro.request({
                url: appConfig.apiBaseUrl+'/order',
                method:'POST',
                header: {
                    'content-type': 'application/json', // 默认值
                    "cookie": sessionID
                },
                data: {
                  order
                }
            })
        })
        .then((res)=>{
            that.setState({
                isloading:false
            })
            if(res.data.code==200){
                // Taro.showToast({
                //     title: "提交成功",
                //     icon: 'success'
                // })

                Taro.navigateTo({
                  url: '/pages/my_orders/my_orders'
                })
            }else{
                Taro.showToast({
                    title: "提交成功",
                    icon: 'error'
                })
            }
        })


    }
    renderConfirm() {
        const { name, gender, phone, idCard, date, loading } = this.state;
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
                <View className="btn" onClick={this.onSubmit} disabled={loading}>立即支付</View>
            </View>

        </View>

    }
    render() {
        const { step } = this.state;

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