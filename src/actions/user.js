import {
    SET_SID
} from '../constants/user'

export const setSid = (sid) => {
    return {
        type: SET_SID,
        sid
    }
}
