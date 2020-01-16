import Taro, { Component } from '@tarojs/taro'
import { appConfig } from '../config'
const pay = (order, endpoint, repay = false) => {
    Taro.showLoading({
        title: '请稍后',
        mask: true
    });
    Taro.getStorage({ key: 'sessionID' })
        .then(res => {
            let sessionID = res.data
            return Taro.request({
                url: appConfig.apiBaseUrl + endpoint,
                method: 'POST',
                header: {
                    'content-type': 'application/json', // 默认值
                    "cookie": sessionID
                },
                data: {
                    order: repay ? null : order,
                    order_id: repay ? order.id : null
                }
            })
        })
        .then((res) => {
            Taro.hideLoading();
            console.log(res);
            if (res.data.code == 200) {
                const payargs = res.data.data

                Taro.requestPayment({
                    timeStamp: payargs.timeStamp,
                    nonceStr: payargs.nonceStr,
                    package: payargs.package,
                    signType: payargs.signType,
                    paySign: payargs.paySign,
                    success(res) {
                        console.log(res);

                        Taro.showToast({
                            title: "支付成功",
                            icon: 'success'
                        })
                        Taro.switchTab({
                            url: '/pages/prod/prod'
                        })
                    },
                    fail(res) {
                        Taro.showToast({
                            title: "取消支付",
                            icon: 'none'
                        })
                        !repay && Taro.redirectTo({
                            url: '/pages/my_orders/my_orders'
                        })
                        console.log(res);
                    }
                })
                // Taro.showToast({
                //     title: "提交成功",
                //     icon: 'success'
                // })
                console.log(res.data)

                //后端返回 微信支付的订单号（由我们自己的商户订单+xxx合成）
                //->wx.requ
                //->成功 跳转我的订单页

                // Taro.navigateTo({
                //     url: '/pages/my_orders/my_orders'
                // })
            } if (res.data.code == 400) {
                Taro.showToast({
                    title: "提交数据错误",
                    icon: 'none'
                })
            }

        }).catch(e => {
            Taro.hideLoading();
            Taro.showToast({
                title: "请求失败",
                icon: 'none'
            });
            console.log(e)
        })
}


export default pay;