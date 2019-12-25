import Taro from '@tarojs/taro'
import { SET_SID, SET_USER_INFO } from '../constants/user'
const INITIAL_STATE = {
    SID: Taro.getStorageSync('SID') || '',
    nickName: '',
    city: '',
    province: '',
    phoneNumber: '',
    gender: 1,
    avatarUrl: '',
    country: '',
}

export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_SID: {
            console.log("设置sid", sid);
            const { sid } = action;
            try {
                Taro.setStorageSync('SID', sid);
                console.log("设置sid成功", sid);
                return {
                    SID: sid
                };
            } catch (e) {
                console.log("设置sid失败", e);

                console.log(e); return state;
            }
        }
        case SET_USER_INFO: {
            console.log("设置userinfo");
            const { nickName, city, province, country, avatarUrl, gender } = action.userInfo;
            return {
                ...state,
                nickName, city, province, country, avatarUrl, gender
            }
        }
        default: return state;
    }
}
