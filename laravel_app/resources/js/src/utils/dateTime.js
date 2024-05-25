import dayjs, { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { tt } from './index';

export const timeAgoDayjs = (date, format = 'DD/MM/YYYY HH:mm:ss') => dayjs(date, format).fromNow();

export const stringToDateDMYHM = (dtStr) => {
  if (!dtStr) return null;
  const [day, month, year, hour, minute] = dtStr.split(/\/|\s|:/);
  const date = new Date(year, month - 1, day, hour, minute);
  return date;
};
export const stringToDateDMYHMS = (dtStr) => {
  if (!dtStr) return null;
  const dateParts = dtStr.split('/');
  const timeParts = dateParts[2].split(' ')[1].split(':');
  dateParts[2] = dateParts[2].split(' ')[0];
  // month is 0-based, that's why we need dataParts[1] - 1
  const dateObject = new Date(
    +dateParts[2],
    dateParts[1] - 1,
    +dateParts[0],
    timeParts[0],
    timeParts[1],
    timeParts[2],
  );
  return dateObject;
};
export const stringToDateUnixTimeStamp = (number) => {
  if (!number) return null;
  return new Date(number * 1000);
};
export const unixTimeStampToStringDate = (number, format = 'DD/MM/YYYY HH:mm') => dayjs.unix(number).format(format);
export const getFormattedDate = (ttParam, date, prefomattedDate = false, hideYear = false) => {
  const MONTH_NAMES = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
  ];
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }
  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${prefomattedDate} ${hours}:${minutes}`;
  }
  if (hideYear) {
    // 10/1 at 10:20
    return `${day}/${month} ${hours}:${minutes}`;
  }
  // 10/1/2017. at 10:20
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const timeAgo = (dateParam, ttParam, inMinute = false) => {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(seconds / (60 * 60));
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();
  if (inMinute === true) {
    if (seconds < 5) {
      return ttParam('Bây giờ');
    } if (seconds < 60) {
      return `${seconds} ${ttParam('Giây trước')}`;
    } if (seconds < 90) {
      return ttParam('Khoảng một phút trước');
    } if (minutes < 60) {
      return `${minutes} ${ttParam('Phút trước')}`;
    } if (hours < 12) {
      return `${hours} ${ttParam('Giờ trước')}`;
    } if (isToday) {
      return getFormattedDate(tt, date, ttParam('Hôm nay')); // Today at 10:20
    } if (isYesterday) {
      return getFormattedDate(tt, date, ttParam('Hôm qua')); // Yesterday at 10:20
    } if (isThisYear) {
      return getFormattedDate(tt, date, false, false); // 10/2/2023 at 10:20
    }
  } else {
    if (isToday) {
      return getFormattedDate(tt, date, ttParam('Hôm nay')); // Today at 10:20
    } if (isYesterday) {
      return getFormattedDate(tt, date, ttParam('Hôm qua')); // Yesterday at 10:20
    } if (isThisYear) {
      return getFormattedDate(tt, date, false, false); // 10/2/2023 at 10:20
    }
  }

  return getFormattedDate(tt, date); // 10/1/2017. at 10:20
};

export const getRangeTodayPlusUnix = (plusDay = 7) => {
  const dateNow = new Date();
  const startDate = new Date();
  startDate.setSeconds(0);
  startDate.setMinutes(0);
  startDate.setHours(0);
  const endDate = dateNow;
  endDate.setDate(dateNow.getDate() + plusDay);
  endDate.setSeconds(59);
  endDate.setMinutes(59);
  endDate.setHours(23);
  return [startDate.getTime() / 1000, endDate.getTime() / 1000];
};

export const getRangeTodayUnix = () => getRangeTodayPlusUnix(0);

export const customNameMonthDayDayJS = () => {
  dayjs.extend(updateLocale);
  dayjs.updateLocale('vi', {
    months: [
      tt('Tháng 1'), tt('Tháng 2'), tt('Tháng 3'), tt('Tháng 4'), tt('Tháng 5'), tt('Tháng 6'), tt('Tháng 7'),
      tt('Tháng 8'), tt('Tháng 9'), tt('Tháng 10'), tt('Tháng 11'), tt('Tháng 2'),
    ],
    monthsShort: [
      tt('Thg 1'), tt('Thg 2'), tt('Thg 3'), tt('Thg 4'), tt('Thg 5'), tt('Thg 6'),
      tt('Thg 7'), tt('Thg 8'), tt('Thg 9'), tt('Thg 10'), tt('Thg 11'), tt('Thg 12'),
    ],
    weekdays: [
      tt('Chủ nhật'), tt('Thứ 2'), tt('Thứ 2'), tt('Thứ 4'), tt('Thứ 5'), tt('Thứ 6'), tt('Thứ 7'),
    ],
    weekdaysShort: [tt('CN'), tt('T2'), tt('T3'), tt('T4'), tt('T5'), tt('T6'), tt('T7')],
    weekdaysMin: [tt('CN'), tt('T2'), tt('T3'), tt('T4'), tt('T5'), tt('T6'), tt('T7')],
    //
    // months: [
    //   'January', 'February', 'March', 'April', 'May', 'June', 'July',
    //   'August', 'September', 'October', 'November', 'December',
    // ],
    // monthsShort: [
    //   'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    //   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    // ],
    // weekdays: [
    //   'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    // ],
    // weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    // weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    // relativeTime: {
    //   future: 'in %s',
    //   past: '%s ago',
    //   s: 'a few seconds',
    //   m: 'a minute',
    //   mm: '%d minutes',
    //   h: 'an hour',
    //   hh: '%d hours',
    //   d: 'a day',
    //   dd: '%d days',
    //   M: 'a month',
    //   MM: '%d months',
    //   y: 'a year',
    //   yy: '%d years',
    // },
    // calendar: {
    //   lastDay: '[Yesterday at] LT',
    //   sameDay: '[Today at] LT',
    //   nextDay: '[Tomorrow at] LT',
    //   lastWeek: '[last] dddd [at] LT',
    //   nextWeek: 'dddd [at] LT',
    //   sameElse: 'L',
    // },
  });
};

export const formatNgayThang = (input, hour = false) => {
  // const ngayThang = new Date(input);

  // const ngay = ngayThang.getDate();
  // const thang = ngayThang.getMonth() + 1; // Tháng bắt đầu từ 0
  // const nam = ngayThang.getFullYear();

  // // Sử dụng padStart để thêm số 0 đằng trước nếu cần
  // const ngayFormatted = ngay.toString().padStart(2, '0');
  // const thangFormatted = thang.toString().padStart(2, '0');

  // return `${ngayFormatted}/${thangFormatted}/${nam} `;
  if (hour) {
    return dayjs(input).format('DD/MM/YYYY HH:mm:ss');
  }
  return dayjs(input).format('DD/MM/YYYY');
};
