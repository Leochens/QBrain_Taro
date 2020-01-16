import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
// import { } from 'taro-ui';
import { connect } from '@tarojs/redux'
import './prod.less'
import { AtIcon, AtList, AtListItem } from 'taro-ui';
import Modal from '../../components/Modal/Modal';
import introPng from '../../images/introduction.png'
import { appConfig } from '../../config'
import login from '../../utils/login';

export default class Prod extends Component {
    config = {
        navigationBarTitleText: '产品',
        navigationBarTextStyle: "black"

    }
    onShareAppMessage() {

        const u_id = Taro.getStorageSync('uid');

        return {
            path: '/pages/prod/prod?sale_id=' + u_id
        }
    }
    componentDidShow(e) {
        console.log('show', e);
    }
    constructor(props) {
        super(props);
        const app = Taro.getApp();
        console.log('prod', this)
        this.state = {
            statusBarHeight: app.state.statusBarHeight,
            navHeight: app.state.nav.height,
            navMarginTop: app.state.nav.top,
            showModal: false
        }

    }
    async componentDidMount() {

        const sale_user_id = this.$router.params.sale_id;
        const sessionID = Taro.getStorageSync('sessionID');
        if (sale_user_id) {
            await login();
            console.log("登录成功,开始进行销售绑定")
            Taro.request({
                url: appConfig.apiBaseUrl + '/sale',
                method: "POST",
                data: {
                    sale_user_id
                },
                header: {
                    'content-type': 'application/json', // 默认值
                    cookie: sessionID
                },
                success: function (res) {
                    console.log(res.data);
                },
                fail: e => console.log(e)
            })
        }
    }

    toggleShowModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    gotoAppointment() {

    }

    getPhoneNumber(e) {
        console.log(`是否成功调用${e.detail.errMsg}`);
        console.log(`加密算法的初始向量:${e.detail.iv}`);
        console.log(`包括敏感数据在内的完整用户信息的加密数据:${e.detail.encryptedData}`);

        if (e.detail.iv && e.detail.encryptedData) {
            let endata = { iv: e.detail.iv, encryptedData: e.detail.encryptedData }

            Taro.getStorage({ key: 'sessionID' })
                .then(res => {
                    let sessionID = res.data
                    return Taro.request({
                        url: appConfig.apiBaseUrl + '/number',
                        method: 'POST',
                        header: {
                            'content-type': 'application/json', // 默认值
                            "cookie": sessionID
                        },
                        data: {
                            endata: endata
                        }
                    })
                })
                .then(res => {
                    console.log('Taro.resquest->update phoneNumber=>', res)
                    if (typeof res.data.phoneNumber !== 'undefined') {
                        Taro.navigateTo({
                            url: '/pages/appointment/appointment'
                        })
                    }

                })

        }

    }

    render() {
        return <View>
            <View className='wrap'>
                <View style={{
                    textAlign: 'center',
                    height: this.state.navHeight + 'px',
                    marginTop: this.state.navMarginTop + 'px',
                    lineHeight: this.state.navHeight + 'px'
                }} className="top-title">脑健康体检</View>
                <View className="banner"></View>
                <View className="at-row tags">
                    <View className="at-col item">
                        <AtIcon value="check-circle icon" size="small" />
                        <View>三甲医院设备</View>
                    </View>
                    <View className="at-col item" >
                        <AtIcon value="check-circle icon" size="small" />
                        <View>官方直营</View>
                    </View>
                    <View className="at-col item">
                        <AtIcon value="check-circle icon" size="small" />
                        <View>快速预约</View>
                    </View>
                </View>
                <View className="features">
                    <View>

                        <View className="title"> 体检特色</View>
                        <View className="items">
                            <View className="item">
                                <View className="icon p1"></View>
                                <View className="title">数据权威</View>
                                <View>全国最大人脑数据库，评估更精准</View>
                            </View>
                            <View className="item">
                                <View className="icon p2"></View>
                                <View className="title">AI分析</View>
                                <View>61个脑分区全面分析检测</View>
                            </View>
                            <View className="item">
                                <View className="icon p3"></View>
                                <View className="title">专家团队</View>
                                <View>国内顶级神经内科专家核验</View>
                            </View>
                        </View>
                    </View>
                </View>
                {/* <View className="have-a-look" onClick={this.toggleShowModal}>
                    <View className="des">查看可预约分院和机构</View>
                    <AtIcon value="chevron-right icon" />
                </View> */}
                <View className="introBlock">
                    <Image src={introPng} class="introPng" />
                </View>

                <View className="brain-des">
                    <View className="title">
                        大脑分区功能介绍
                    </View>

                    <View className="brain-parts">
                        <View className="item title" >
                            <View className="name">
                                分区名称
                            </View>
                            <View className="des">
                                萎缩产生的影响
                            </View>
                        </View>
                        <View className="item" >
                            <View className="name">
                                岛叶-白质
                            </View>
                            <View className="des">
                                常与脑血管、神经变性病伴发
                            </View>
                        </View>
                        <View className="item" >
                            <View className="name">
                                胼胝体
                            </View>
                            <View className="des">
                                左右协调不灵活
                            </View>
                        </View>
                        <View className="item" >
                            <View className="name">
                                深部脑白质
                                <View>(脑室周围)</View>
                            </View>
                            <View className="des">
                                认知障碍
                            </View>
                        </View>
                        <View className="item" >
                            <View className="name">
                                内嗅回
                            </View>
                            <View className="des">
                                嗅觉障碍，常与神经变性病伴发
                            </View>
                        </View>
                        <View className="item" >
                            <View className="name">
                                内嗅回
                            </View>
                            <View className="des">
                                嗅觉障碍，常与神经变性病伴发
                            </View>
                        </View>
                    </View>

                </View>
                <View className="order">
                    <View className="price">
                        <View>

                            <Text className="int">￥1500</Text>
                            <Text className="float">.00</Text>
                        </View>
                    </View>
                    <Button openType='getPhoneNumber' onGetPhoneNumber={this.getPhoneNumber} className="btn">立即预约</Button>
                </View>
            </View>

            {/* <Modal showModal={this.state.showModal} hide={this.toggleShowModal} /> */}

        </View>
    }
}