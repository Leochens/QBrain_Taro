import Taro, { Component, getCurrentPages, getApp } from '@tarojs/taro'
import { View, Button, Text, Label, Input } from '@tarojs/components'
import NavBar from '../../../components/NavBar/NavBar'
import { appConfig } from '../../../config'
import './disclaimer.less'
import { AtIcon, AtInput, AtButton } from 'taro-ui'

export default class Disclaimer extends Component {
    config = {
        navigationBarTitleText: '知情同意书',
        navigationBarTextStyle: "black"
    }

    render() {
        return <View >
            <NavBar title="知情同意书" />
            <View className="wrap">

            <View className="title">《脑健康体检知情同意书》</View>

            <View className="p">
                一、强磁场的危险性：MR检查室内的磁场非常强，任何进入检查室内人员的体内植入或体外携带的铁磁性物品都会被强大的磁场吸引，严重者会造成人身伤害。因此，进入MR检查室前被检查者和家属均应仔细阅读。若有所列随身物品，必须取出，将其放在医护人员制定的地方妥善保存；不能取出的体内植入物应向申请医生及当班医护人员咨询，以评估可否做MR检查。
            </View>
            <View className="p">
                二、被检查者进入检查室前，请确认以下内容：
    绝对禁止MR检查事项：装有心脏起搏器、人工心脏瓣膜、人工耳蜗、药物剂量控制装置、除颤仪、胰岛素计量泵、动脉瘤夹术后、冠状动脉支架术后三个月内。以上禁止事项，如果进行MR检查，将导致生命危险，因此禁止进行磁共振MR检查。
    相对禁止MR检查事项：1、进入扫描室检查前，必须除去身上所有金属物品：如钥匙、手表、手机、硬币、项链、耳环、发卡、磁卡、腰带、带有金属的衣服和内衣等。2、有手术史、钢钉及钢板等金属植入史、体内有假牙、电子眼、义眼及义肢等、金属节育环、妊娠、金属碎片溅入史等情况，必须告知医生及护士。以上情况，如果进行MR检查，将导致人身伤害、财产损失及检查失败。
            </View>
            <View className="p">
                三、脑健康体检是基于脑磁共振影像的分区体积定量测量不是疾病诊断，不能将检测结果与疾病的关系绝对化。
                该测量结果提示的是基于一次磁共振全脑影像测量后的脑部各分区体积值，并与常模健康人群脑部各分区体积做比较，从而提示脑体积是否高于或低于正常人群脑分区体积数值的百分比。是否最终表现为疾病和后天的饮食、行为、生活方式等因素密切相关。
            </View>
            <View className="p">
                四、体检结果的保密性
    受检者的记录将被妥善保管，做保密处理，但受检者资料有可能会接受有关主管部门的监察，但不得对外披露其受检者得身份。
            </View>
            </View>

        </View >
    }
}

