import Taro from '@tarojs/taro'
import { SET_SID } from '../constants/user'
const INITIAL_STATE = {
    SID: Taro.getStorageSync('SID') || ''
}

export default function counter(state = INITIAL_STATE, action) {
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
        default: return state;
    }
}
