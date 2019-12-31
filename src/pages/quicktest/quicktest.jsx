import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtProgress } from 'taro-ui';
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
        // console.log(e.target.dataset.w)˝
        const { index, score } = this.state;
        this.setState({
            index: index + 1,
            score: score + e.target.dataset.w
        })
    }
    back = () => {
        Taro.navigateBack()
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
                        <View>{index + 1}/{qlist.length} {score}</View>

                    </View>
                </View>
            )

        }
        return <View style={{
            textAlign: 'center'
        }}>答题结束 分数为{score} {score >= 2 ? '您有认知障碍' : "您没有认知障碍"}
            {/* <CircleProgress /> */}
            <Button onClick={this.back}>返回主页</Button>
        </View>
    }


    render() {
        const { index, qlist, score } = this.state;
        return <View className="wrap" style={{
            marginTop: this.state.statusBarHeight + 'px'
        }}>
            <View style={{
                height: this.state.navHeight + 'px',
                marginTop: this.state.navMarginTop + 'px',
                lineHeight: this.state.navHeight + 'px'
            }} className="title">量健智能老年痴呆评测-快速评测</View>
            {this.renderQList()}

        </View>
    }
}