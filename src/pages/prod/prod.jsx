import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
// import { } from 'taro-ui';
import { connect } from '@tarojs/redux'
import './prod.less'
import { AtIcon, AtList, AtListItem } from 'taro-ui';
export default class Prod extends Component {
    config = {
        navigationBarTitleText: '产品',
        navigationBarTextStyle: "black"

    }

    constructor(props) {
        super(props);
        const that = this;
        Taro.getSystemInfo({
            success: function (res) {
                console.log(res.model)
                console.log(res.pixelRatio)
                console.log(res.windowWidth)
                console.log(res.windowHeight)
                console.log(res.language)
                console.log(res.version)
                console.log(res.platform)
                that.state = {
                    statusBarHeight: res.statusBarHeight
                }
            }
        })
    }
    render() {
        return <View>
            <View style={{
                height: this.state.statusBarHeight,
                width: '100%',
                backgroundColor: 'transparent',
                color: 'transparent'
            }}>占位</View>
            <View className='wrap'>

                <View className="top-title">脑健康体检</View>
                <View className="banner"></View>
                <View className="at-row tags">
                    <View className="at-col item">
                        <AtIcon value="check-circle icon" size="small" />
                        <View>三甲医院设备</View>
                    </View>
                    <View className="at-col item" >
                        <AtIcon value="check-circle icon" size="small" />
                        <View>官方直营
</View>
                    </View>
                    <View className="at-col item">
                        <AtIcon value="check-circle icon" size="small" />
                        <View>快速预约
</View>
                    </View>
                </View>
                <View className="features">
                    <View>

                        <View className="title"> 体检特色</View>
                        <View className="items">
                            <View className="item">
                                <View className="icon"></View>
                                <View className="title">数据权威
</View>
                                <View>全国最大人脑数据库，评估更精准</View>
                            </View>
                            <View className="item">
                                <View className="icon"></View>
                                <View className="title">AI分析
</View>
                                <View>61个脑分区全面分析检测
</View>
                            </View>
                            <View className="item">
                                <View className="icon"></View>
                                <View className="title">专家团队

</View>
                                <View>国内顶级神经内科专家核验
</View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="have-a-look">
                    <View className="des">查看可预约分院和机构</View>
                    <AtIcon value="chevron-right icon" />
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

                            <Text className="int">2999</Text>
                            <Text className="float">.00</Text>
                        </View>
                    </View>
                    <View className="btn">立即预约</View>
                </View>
            </View>

        </View>
    }
}