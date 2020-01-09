import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtProgress, AtIcon } from 'taro-ui';
import './test.less'
import entrancePng from '../../../images/entrance.png'

import allQuestions from './allQuestions';
import CircleProgress from '../../../components/CircleProgress/CircleProgress';
import NavBar from '../../../components/NavBar/NavBar';
export default class Test extends Component {


    config = {
        navigationBarTitleText: '情绪评测',
        navigationBarTextStyle: "black"
    }

    constructor(props) {
        super(props);
        // const type = props.$router.params.type || 'motion';
        const type = 'motion';
        this.state = {
            qlist: allQuestions[type].list,
            status: allQuestions[type].status,
            index: 0,
            score: 0,
            res: {}
        }
    }
    getRes = score => {
        const { status: { normal, middle, high } } = this.state;
        if (score >= normal.min && score <= normal.max) {
            return { ...normal, color: 'rgb(14,207,175)' }
        } else if (score >= middle.min && score <= middle.max) {
            return { ...middle, color: '#f58037' }
        } else if (score >= high.min && score <= high.max) {
            return { ...high, color: 'rgb(229,21,22)' }
        } else
            return {}
    }
    handleClickOption = e => {
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
            url: '/pages/index/index'
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
                <View className="main animated fadeInLeftBig">
                    <View className="q-tip">选择最切合您最近一周来的感受的答案：</View>
                    <View className="q-title">{title}</View>
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
        const res = this.getRes(score);
        console.log("??", res);
        const color = res.color;
        return <View>
            <CircleProgress score={score} progress={score / qlist.length} detail={res.title} color={color} />
            <View className="tip">您的评测结果为：</View>
            <View className="res" style={{
                color: color
            }}>{res.title}</View>
            <View className="ljzn">量健智能提醒您：</View>
            <View className="advice">{res.des}</View>
            <Image className="appointment-entry" src={entrancePng} onClick={this.gotoAppointment} />
            <Button className="home-btn" onClick={() => {
                Taro.navigateBack();
            }}> 返回主页</Button>
        </View>
    }


    render() {
        // const { index, qlist, score } = this.state;
        return <View className="wrap" style={{
        }}>
            <NavBar title={`量健智能-情绪评测`} />
            {this.renderQList()}
        </View>
    }
}