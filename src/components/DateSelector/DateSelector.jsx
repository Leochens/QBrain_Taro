import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCalendar } from "taro-ui"

import './DateSelector.less'
import '../../custom.scss';
// const app = Taro.getApp();
export default class DateSelector extends Component {



    state = {
        index: 0,
        showCalendar: false,
        dates: [`${this.getNextDate(new Date(), 1)}`, `${this.getNextDate(new Date(), 2)}`, this.getNextDate(new Date(), 3), `选择日期`]
    }
    componentDidMount() {
        const { onChangeDate } = this.props;
        onChangeDate && onChangeDate(this.state.dates[0]);
    }
    getTomorrow() {
        const dd = new Date();
        dd.setDate(dd.getDate() + 1);
        const y = dd.getFullYear();
        const m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        const res = y + '/' + m + '/' + d
        console.log(res);
        return res;
    }
    getNextDate(date, day) {
        const dd = new Date(date);
        dd.setDate(dd.getDate() + day);
        const y = dd.getFullYear();
        const m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + '-' + m + "-" + d;
    };

    selectDate(e) {
        const { onChangeDate } = this.props;
        const { id } = e.target.dataset;
        this.setState({
            index: id
        })
        if (id === 3) { // 自定义日期
            this.setState({
                showCalendar: true
            })
            // callback
            onChangeDate && onChangeDate(this.state.dates[0]);


        } else {
            this.setState({
                showCalendar: false
            })
            // callback
            onChangeDate && onChangeDate(this.state.dates[id]);
        }

    }
    handelSelectDate = e => {
        // console.log(e);
        const { start } = e.value;
        const { onChangeDate } = this.props;
        // callback
        onChangeDate && onChangeDate(start);
    }
    renderList() {
        const { index, dates } = this.state;
        return dates.map((item, idx) => {
            return <View
                data-id={idx}
                onClick={this.selectDate}
                className={`item ${idx === index ? 'active' : ''}`} key={idx}>
                {item}
            </View>

        })
    }
    render() {

        return <View>
            <View className="wrap">
                {this.renderList()}
            </View>
            {this.state.showCalendar && <AtCalendar
                onSelectDate={this.handelSelectDate}
                minDate={this.getTomorrow()} currentDate={this.getTomorrow()} />}

        </View>
    }
}