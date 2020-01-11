import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCalendar, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"

import './DateSelector.less'
import '../../custom.scss';
import GenModal from '../GenModal/GenModal';
// const app = Taro.getApp();

export default class DateSelector extends Component {
    state = {
        index: 0,
        showCalendar: false,
        dates: this.getNextThreeDate().concat([`选择日期`])
    }
    componentDidMount() {
        const { onChangeDate } = this.props;
        onChangeDate && onChangeDate(this.state.dates[0]);
    }

    getNextDate(date, day) {
        const dd = new Date(date);
        dd.setDate(dd.getDate() + day);
        const y = dd.getFullYear();
        const m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + '-' + m + "-" + d;
    };
    getNextThreeDate() {
        const dd = new Date();
        const y = dd.getFullYear();
        const m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        const date = y + '-' + m + "-" + d;
        if ([0, 1, 2].includes(dd.getDay())) { // 周日 周一 周二 可以顺延三天
            return [1, 2, 3].map(d => this.getNextDate(date, d));
        } else if (dd.getDay() === 3) { // 周三
            return [1, 2, 5].map(d => this.getNextDate(date, d));
        } else if (dd.getDay() === 4) { // 周四
            return [1, 4, 5].map(d => this.getNextDate(date, d));
        } else if (dd.getDay() === 5) { // 周五
            return [3, 4, 5].map(d => this.getNextDate(date, d));
        } else { // 周六
            return [2, 3, 4].map(d => this.getNextDate(date, d));
        }
    };
    hide = () => {
        this.setState({
            showCalendar: false
        })
    }
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
            // 判断是否是周六日
            if (this.isWeekend(this.state.dates[0])) { // 周末
                return Taro.showToast({
                    title: '双休日不可选',
                    icon: 'none'
                })
            }else{
                onChangeDate && onChangeDate(this.state.dates[0]);
            }
        } else {
            this.setState({
                showCalendar: false
            })
            // callback
            onChangeDate && onChangeDate(this.state.dates[id]);
        }
    }
    isWeekend = (date) => {
        // const _d = date.split('/').join('-');
        const d = new Date(date);
        const flag = d.getDay();
        return (flag === 0 || flag === 6)
    }
    handelSelectDate = e => {
        // console.log(e);
        const dates = this.state.dates.slice();
        const { start } = e.value;
        if (this.isWeekend(start)) { // 周末
            return Taro.showToast({
                title: '双休日不可选',
                icon: 'none'
            })
        }
        dates[dates.length - 1] = start
        this.setState({
            dates
        })
        const { onChangeDate } = this.props;
        // callback
        onChangeDate && onChangeDate(start);
    }
    getWeekDay = day => {
        const D = new Date(day);
        const wd = D.getDay();
        let res_wd = ''
        switch (wd) {
            case 0: res_wd = "周日"; break;
            case 1: res_wd = "周一"; break;
            case 2: res_wd = "周二"; break;
            case 3: res_wd = "周三"; break;
            case 4: res_wd = "周四"; break;
            case 5: res_wd = "周五"; break;
            case 6: res_wd = "周六"; break;
            default: break;
        }
        const tmp = day.split('-');
        const m_d = tmp[1] + '-' + tmp[2];
        return res_wd + ' ' + m_d
    }
    renderList() {
        const { index, dates } = this.state;
        return dates.map((item, idx) => {
            return <View
                data-id={idx}
                onClick={this.selectDate}
                className={`item ${idx === index ? 'active' : ''}`} key={idx}>
                {idx === dates.length - 1
                    ? item
                    : this.getWeekDay(item)
                }
            </View>
        })
    }
    render() {

        return <View>
            <View className="wrap">
                {this.renderList()}
            </View>
            <GenModal showModal={this.state.showCalendar} hide={this.hide}>
                <AtCalendar
                    style={{
                        width: '100vw'
                    }}
                    onSelectDate={this.handelSelectDate}
                    minDate={this.getNextThreeDate()[0]} currentDate={this.getNextThreeDate()[0]} />
            </GenModal>
        </View>
    }
}