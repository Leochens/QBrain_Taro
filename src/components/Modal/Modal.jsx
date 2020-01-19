import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './Modal.less'
import { appConfig } from '../../config'
// const app = Taro.getApp();
export default class Modal extends Component {

    state = {
        cities: [],
        hospitals: [],
        curCity: ''
    }
    componentDidMount() {
        const d = new Date();
        const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        Taro.getStorage({ key: 'sessionID' })
            .then(res => {
                let sessionID = res.data
                return Taro.request({
                    url: appConfig.apiBaseUrl + '/institutions',
                    method: 'POST',
                    data: {
                        date
                    },
                    header: {
                        'content-type': 'application/json', // 默认值
                        "cookie": sessionID
                    },
                })
            })
            .then((res) => {
                if (res.data.code == 200) {
                    console.log('Taro.request->ins=>', res.data)
                    let list = res.data.data;
                    let cities = new Set();
                    for (let i = 0; i < list.length; i++) {
                        cities.add(list[i].city);
                    }
                    cities = Array.from(cities);

                    this.setState({
                        hospitals: list,
                        cities,
                        curCity: cities[0]
                    })

                }
            })
    }
    handelSelectCity = (e) => {
        const { id } = e.target.dataset;
        const { cities } = this.state
        this.setState({
            curCity: cities[id]
        })
    }
    renderCity = () => {
        const { cities, curCity } = this.state;

        return cities.map((item, idx) => <View
            key={item}
            className={`city ${item === curCity ? 'selected' : ''}`}
            data-id={idx}
            onClick={this.handelSelectCity}>{item}</View>)
    }
    renderList = () => {
        const { hospitals, curCity } = this.state;

        const hps = hospitals.filter(item => item.city === curCity);
        return hps.map(item => <View key={item.name} className="item">
            <View className="name">{item.name}</View>
            <View className="address">{item.address}</View>
        </View>
        )
    }
    render() {
        const { showModal } = this.props;

        return <View hidden={!showModal} className="mask" onClick={this.props.hide}>
            <View className="modal" onClick={e => e.stopPropagation()}>
                <View className="title">
                    可用城市
                </View>
                <View className="content">
                    <View style={{
                        flex: 1
                    }}>

                        {this.renderCity()}
                    </View>
                    <View style={{
                        flex: 3
                    }} className="list">
                        {this.renderList()}
                    </View>
                </View>
            </View>
        </View>
    }
}