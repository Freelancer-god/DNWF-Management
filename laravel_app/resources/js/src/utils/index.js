import { useCallback } from 'react';
import _, { debounce } from 'lodash';
import { APP_NAME } from '../CONSTANT';

// if (process.env.NODE_ENV === 'production') {
//   console.log = () => {};
//   console.error = () => {};
//   // console.warn = () => {};
//   console.debug = () => {};
// }
export const clog = (...args) => {
    //   if (process.env.NODE_ENV === 'development') {
    //     console.log(...args);
    //   }
    if (import.meta.env.DEV === true) {
        console.log(...args);
    }
};

export const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toLowerCase();
};

export const checkDuplNameInArray = (arr) => {
    const valueArr = arr.map((item) => item.name);
    return valueArr.some((item, idx) => valueArr.indexOf(item) !== idx);
};

export const checkHasNameInArray = (arr) => {
    for (const i of arr) {
        if (i.name === '') {
            return true;
        }
    }
    return false;
};

export const getListIdInArray = (array) => {
    const newArray = [];
    for (const i of array) {
        newArray.push(i.id);
    }
    return newArray;
};

export const formatFilterDynamicToTerm = (filter, search) => {
    clog("filter", filter)
    const copy = filter.slice();
    if (filter.length === 0) {
        return search;
    }
    for (let i = 0; i < filter.length; i += 1) {
        copy[i] = copy[i].data;
    }
    return copy.concat(search);
};

export const trueTypeOf = (obj) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

export const formatterNumber = (val) => {
    if (!val) return 0;
    return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const parserNumber = (val) => {
    if (!val) return 0;
    return val.replace(/\$\s?|(,*)/g, '');
};

export function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

export function cutString(str, maxLength = 100) {
    if (str.length > maxLength) {
        return `${str.substring(0, maxLength)}…`;
    }
    return str;
}
export function formatArrayToSelect(array) {
    const newArray = [];
    for (const i of array) {
        newArray.push({
            id: i?.store.id || i.id,
            value: i?.store.id || i.id,
            label: i?.store.name || i.name || i.title,
        });
    }
    return newArray;
}

export function formatArrayStringToInt(array) {
    const newArray = [];
    for (const i of array) {
        newArray.push(parseInt(i));
    }
    return newArray;
}
export function formatArrayTimeWithID(array) {
    const newArray = [];
    for (const i of array) {
        newArray.push({ id: makeid(5), time: i });
    }
    return newArray;
}

export const debounceFun = _.debounce((func, data) => {
    func(data);
}, 1000);

export const xoaDau = (str) => {
    // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của xâu
    try {
        str.trim();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
        str = str.replace(/Đ/g, 'D');
        return str;
    } catch (e) {
        return str;
    }
};
// import { useTranslation } from "react-i18next";
// const { t } = useTranslation();
export const tt = (text) => text;

export const formatPoint = (number) => {
    if (number >= 1000000000) {
        return `${Math.floor(number / 1000000000)} tỷ`;
    } if (number >= 1000000) {
        return `${Math.floor(number / 1000000)} triệu`;
    } if (number >= 1000) {
        return `${Math.floor(number / 1000)} ngàn`;
    }
    return number.toString();
};

export const formatNumber = (number) => {
    const formattedAmount = number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return formattedAmount;
};

export const encodedData = (str) => {
    var decodedData = decodeURIComponent(str.replace(/&quot;/g, '"'));

    // Chuyển đổi thành đối tượng JSON
    var jsonData = JSON.parse(decodedData);
    return jsonData;
}
