Taro.login({
    success(res) {
        console.log("====code=====:" + res.code)
        Taro.request({
            url: "http://xxxxxxx//wxminpay",
            data: {
                wxcode: res.code,
                // xxx: xxxx(下单支付所需参数，可能会有很多)
            },
            method: 'POST',
            success(res) {
                const payargs = res.data
                Taro.requestPayment({
                    timeStamp: payargs.timeStamp,
                    nonceStr: payargs.nonceStr,
                    package: payargs.package,
                    signType: payargs.signType,
                    paySign: payargs.paySign
                })
            }
        })
    }
})
