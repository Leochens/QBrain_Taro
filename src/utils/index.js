import { appConfig } from '../config';

export const getExpiration = () => {
    const timestamp = Date.parse(new Date());
    const expiration = timestamp + appConfig.expiration;
    return expiration;
}


const testName = name => {
    var p = /^[\u4E00-\u9FA5·]{2,10}$/;
    return p.test(name);
}
const testPhone = value => {
    if (value.substring(0, 3) === '+86') {
        return value.length == 14 && /^\+?\d{1,}[- ]?[\d\- ]{1,}?\d{1,}$/.test(value)
    } else {
        return value.length > 8 & value.length < 15 & /^\+?\d{1,}[- ]?[\d\- ]{1,}?\d{1,}$/.test(value)
    }
}
// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
// 详情查看javascript的数值范围
const testIDCard = (idcode) => {
    // 加权因子
    var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码
    var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    var code = idcode + "";
    var last = idcode[17];//最后一位

    var seventeen = code.substring(0, 17);

    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    var arr = seventeen.split("");
    var len = arr.length;
    var num = 0;
    for (var i = 0; i < len; i++) {
        num = num + arr[i] * weight_factor[i];
    }
    // 获取余数
    var resisue = num % 11;
    var last_no = check_code[resisue];
    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
    // 判断格式是否正确
    var format = idcard_patter.test(idcode);
    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    return last === last_no && format ? true : false;
}

export const REG = {
    testName,
    testIDCard,
    testPhone
}

export const getAgeByIdCard = card => {
    const myDate = new Date();

    const month = myDate.getMonth() + 1;

    const day = myDate.getDate();

    let age = myDate.getFullYear() - card.substring(6, 10) - 1;

    if (card.substring(10, 12) < month || card.substring(10, 12) == month && card.substring(12, 14) <= day) {

        age++;

    }

    return age;
}