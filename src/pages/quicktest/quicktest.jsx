import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtProgress, AtIcon } from 'taro-ui';
import './quicktest.less'

import qlist from './qlist';
import CircleProgress from '../../components/CircleProgress/CircleProgress';
export default class QuickTest extends Component {


    config = {
        navigationBarTitleText: '快速测评',
        navigationBarTextStyle: "black"
    }

    constructor() {
        const app = Taro.getApp();
        console.log(app.state)
        console.log(app.state.statusBarHeight);
        this.state = {
            statusBarHeight: app.state.statusBarHeight,
            navHeight: app.state.nav.height,
            navMarginTop: app.state.nav.top,
            qlist,
            index: 0,
            score: 0
        }
    }

    handleClickOption = e => {
        // console.log(e.target.dataset.w)
        const { index, score } = this.state;
        this.setState({
            index: index + 1,
            score: score + e.target.dataset.w
        })
    }
    back = () => {
        Taro.navigateBack();
    }
    gotoHome = () => {
        Taro.switchTab({
            url:'/pages/index/index'
        })
    }
    gotoAppointment() {
        Taro.navigateTo({
            url: '/pages/appointment/appointment'
        })
    }
    renderQList = () => {
        const { index, qlist, score } = this.state;
        const tmp = qlist[index];
        if (tmp) {
            const title = tmp.title;
            const qs = tmp.ops;
            const list = qs.map((item, id) => <View
                onClick={this.handleClickOption}
                className="item"
                key={id}
                data-w={item.w}>
                {item.value}
            </View>)
            return (
                <View className="animated fadeInLeftBig">
                    <View className="nb-title">{title}</View>
                    <View className="q-list">
                        {list}
                    </View>
                    <View className="progress">
                        <AtProgress
                            color={'#1B7CD5'}
                            percent={((index + 1) / qlist.length) * 100}
                            isHidePercent strokeWidth={10} />
                        <View>{index + 1}/{qlist.length}</View>
                    </View>
                </View>
            )

        }
        const res = score >= 2 ? "重度" : "健康";
        const color = score >= 2 ? 'rgb(229,21,22)' : 'rgb(14,207,175)';
        return <View>
            {/* 答题结束 分数为{score} {score >= 2 ? '您有认知障碍' : "您没有认知障碍"} */}
            <CircleProgress score={score} progress={score / 8} detail={res} color={color} />
            <View className="tip">您的评测结果为：</View>
            <View className="res" style={{
                color: color
            }}>{res}</View>
            <View className="ljzn">量健智能提醒您：</View>
            <View className="advice">{res == '健康'
                ? '保持良好的生活习惯，有利于维持当前的健康状况'
                : '该测试显示您有认知功能丧失的风险，建议您做完整测评，或选择脑健康体检进一步筛查风险。'}</View>
            <View className='at-row appointment' onClick={this.gotoAppointment}>
                <View className="at-col at-col-11">
                    <View className="ap-title">预约脑体检</View>
                    <View className="des">AI筛查精准定位大脑健康状况</View>
                </View>
            </View>
            <Button onClick={() => {
                Taro.navigateBack();
            }}> 返回主页</Button>
        </View>
    }


    render() {
        // const { index, qlist, score } = this.state;
        return <View className="wrap" style={{
            marginTop: this.state.statusBarHeight + 'px'
        }}>
            <View className="menu" style={{
                height: this.state.navHeight + 'px',
                marginTop: this.state.navMarginTop + 'px',
                lineHeight: this.state.navHeight + 'px'
            }}>
                <AtIcon onClick={this.back} size={20} className="icon" value="chevron-left" />
                |
            <AtIcon size={20} className="icon" value="home"  onClick={this.gotoHome}/></View>
            <View className="title">量健智能老年痴呆评测-快速评测</View>
            {this.renderQList()}
        </View>
    }
}