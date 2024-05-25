import dayjs from 'dayjs';
import { tt } from '../../../utils';

export const getItemFromArrayByValue = (array, value) => {
    for (const i of array) {
        if (i.value === value) {
            return i;
        }
    }
    return null;
};

export const isChecked = (array, id) => {
    const index = array.findIndex((obj) => obj.id === id);
    return index !== -1;
};

export const makeLabel = (array) => {
    let string = '';
    for (let i = 0; i < array.length; i += 1) {
        string += `${array[i].label}${i === array.length - 1 ? '' : ` (${tt('hoặc')}) `
            }`;
    }
    return string;
};

export const getStartTimeOfDate = (date) => {
    let today = new Date(date);
    if (!date) {
        today = new Date();
    }
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    return today;
};
export const getEndTimeOfDate = (date) => {
    let today = new Date(date);
    if (!date) {
        today = new Date();
    }
    today.setHours(23);
    today.setMinutes(59);
    today.setSeconds(59);
    return today;
};
export const getAvailableToDay = () => [
    dayjs(getStartTimeOfDate()).format('YYYY-MM-DD HH:mm:ss'),
    dayjs(getEndTimeOfDate()).format('YYYY-MM-DD HH:mm:ss'),
    // Math.floor(dayjs(getStartTimeOfDate()).valueOf() / 1000),
    // Math.floor(dayjs(getEndTimeOfDate()).valueOf() / 1000),
];
export const getAvailableYesterday = () => {
    const toDate = new Date();
    toDate.setDate(toDate.getDate() - 1);
    return [
        dayjs(getStartTimeOfDate(toDate)).format('YYYY-MM-DD HH:mm:ss'),
        dayjs(getEndTimeOfDate(toDate)).format('YYYY-MM-DD HH:mm:ss'),
        // Math.floor(dayjs(getStartTimeOfDate(toDate)).valueOf() / 1000),
        // Math.floor(dayjs(getEndTimeOfDate(toDate)).valueOf() / 1000),
    ];
};
export const commonFiledDynamicFilter = (table) => [
    { label: tt('Cập nhật lần cuối vào'), value: `${table}.updated_at`, type: "date" },
];
export const commonTimeAvailableDynamicFilter = (table) => [
    {
        id: 'available_dynamic_filter_item_divider',
        value: 'available_dynamic_filter_item_divider',
        label: '',
        type: 'divider',
    },
    {
        id: '2',
        type: 'group',
        title: tt('Cập nhật lần cuối'),
        children: [
            {
                id: 'available_dynamic_filter_item_time_today',
                value: 'available_dynamic_filter_item_time_today',
                label: tt('Hôm nay'),
                data: [
                    {
                        id: 'time_today',
                        field: `${table}.updated_at`,
                        cond: 'between',
                        value: getAvailableToDay(),
                    },
                ],
            },
            {
                id: 'available_dynamic_filter_item_time_yesterday',
                value: 'available_dynamic_filter_item_time_yesterday',
                label: tt('Hôm qua'),
                data: [
                    {
                        id: 'time_yesterday',
                        field: `${table}.updated_at`,
                        cond: 'between',
                        value: getAvailableYesterday(),
                    },
                ],
            },
        ],
    },
];
