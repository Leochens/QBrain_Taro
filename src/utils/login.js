import Taro, { Component } from '@tarojs/taro'

import { appConfig } from '../config'

export default function login() {
    console.log('url=>', appConfig.apiBaseUrl + '/auth')

    Taro.showLoading({
        title: "登录中...",
        mask: true
    })
    return new Promise((resolve, reject) => {
        Taro.login({
            success(res) {
                return res
            }
        })
            .then(res => {
                console.log('Taro.login=>', res)
                if (res.code) {
                    return Taro.request({
                        url: appConfig.apiBaseUrl + '/auth',
                        method: 'POST',
                        data: {
                            code: res.code
                        }
                    })
                } else {
                    throw new Error('登录失败！' + res.errMsg)
                }
            })
            .then(res => {
                console.log('Taro.request=>', res)
                if (res.statusCode != 200) throw new Error("后端认证失败")
                //获得u_id 和 SID
                const SID = res.data.SID
                const u_id = res.data.u_id
                const phone_number = res.data.phone_number
                Taro.setStorageSync('phone_number', phone_number)
                console.log('setStorage->phone_number');
                Taro.setStorageSync('sessionID', SID)
                console.log('setStorage->sessionID');
                Taro.setStorageSync('uid', u_id)
                console.log('setStorage->u_id');

                Taro.hideLoading();
                return resolve(true)

            })
            .catch(err => {
                // Taro.hideLoading();
                Taro.showModal({
                    title: "提示",
                    content: "登录出现错误，请联系管理员。",
                })
                console.log(err)
                return reject(false);
            })
    })
}