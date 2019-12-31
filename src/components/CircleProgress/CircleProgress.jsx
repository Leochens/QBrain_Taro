import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './CircleProgress.less'
// const app = Taro.getApp();
export default class CircleProgress extends Component {

    static defaultProps = {
        data: '心理资本',
        color: '#7D79F3',
        score: 0,
        progress: 0,
        detail: '健康'
    }

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.drawProgressbg(this.props.progress);
    }

    drawProgressbg(percent) {
        // 使用 .createContext 获取绘图上下文 context
        const cxt_arc = Taro.createCanvasContext('canvasArc', this)
        cxt_arc.setLineWidth(20);
        cxt_arc.setStrokeStyle('#D9E2EB');
        cxt_arc.setLineCap('round')
        cxt_arc.beginPath();//开始一个新的路径
        cxt_arc.arc(140, 140, 120, 0.8 * Math.PI, 0.2 * Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径
        cxt_arc.stroke();//对当前路径进行描边
        if (percent) {
            cxt_arc.setLineWidth(20);
            cxt_arc.setStrokeStyle(this.props.color);
            cxt_arc.setLineCap('round')
            cxt_arc.beginPath();//开始一个新的路径
            cxt_arc.arc(140, 140, 120, 0.8 * Math.PI, (percent * (2.2 - 0.8) - 0.8 - 0.4) * Math.PI, false);
            cxt_arc.stroke();//对当前路径进行描边
        }
        cxt_arc.draw();
    }

    render() {
        return <view class="wrap">
            <view class="top">
                <canvas class="cir" style="width:280px; height:280px;" canvas-id="canvasArc">
                </canvas>
                <View className="title">风险评分</View>
                <View className="score" style={{ color: this.props.color }}>{this.props.score}</View>
                <View className="cc" style={{
                    backgroundColor: this.props.color
                }}>{this.props.detail}</View>

            </view>
        </view>
    }
}