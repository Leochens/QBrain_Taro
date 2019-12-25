import {
    SET_SID,
    SET_USER_INFO
} from '../constants/user'

export const setSid = (sid) => {
    return {
        type: SET_SID,
        sid
    }
}

export const setUserInfo = (userInfo) => {
    return {
        type: SET_USER_INFO,
        userInfo
    }
}
