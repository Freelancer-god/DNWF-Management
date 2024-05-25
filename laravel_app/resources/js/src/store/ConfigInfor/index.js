/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


import { fetchAdd, fetchDelete, fetchDeleteMulti, fetchGetByID, fetchGetList, fetchUpdate, } from './API';
import { clog, formatFilterDynamicToTerm, tt } from '../../utils';
import { formatGetIDAndTitleBFSubmit } from "./formatData";
import { showSuccess } from '../../components/dialogs';
import { PAGE_LIMIT } from '../../CONSTANT';


const cleanForm = (state) => {
    state.name = '';
    state.value = '';
    state.type = null;
    state.status = 1;
    state.dataConfig = null
};
const handleInitCreate = (state) => {
    if (state.id) {
        cleanForm(state);
    }
    state.updateItem = null;
    state.id = null;
    state.spinnerCreate = false;
};
const handleInitUpdate = (state, action) => {
    const { id, name, value, type, status, data } = action.payload;
    state.updateItem = action.payload;
    state.id = id;
    state.name = name
    state.value = value
    state.type = type
    state.status = status
    state.dataConfig = data

    state.spinnerCreate = false;
};

const initialState = {
    // LIST
    search: '',
    page: 1,
    limit: PAGE_LIMIT, // 25
    data: [],
    order: { order: 'created_at', sort: 'desc' },
    total: 0,
    selectedRows: [],
    spinnerSearch: false,

    // FILTER
    dynamicFilter: [],

    // CREATE
    id: null,
    updateItem: null,
    name: '',
    value: '',
    type: null,
    status: 1,
    dataConfig: null,

    spinnerCreate: false,
    showModalCreate: false,

    optionTypes: [
        {
            value: 1,
            label: "Tổng đài",
        },
        {
            value: 2,
            label: "Email hỗ trợ",
        },
        {
            value: 3,
            label: "Thông tin về Cudidi",
        },
        {
            value: 4,
            label: "Thông tin hủy tài khoản của khách hàng",
        },
        {
            value: 5,
            label: "Thông tin hủy tài khoản của tài xế",
        },
        {
            value: 6,
            label: "Thông tin chính sách của khách hàng",
        },
        {
            value: 7,
            label: "Thông tin điều khoản của khách hàng",
        },
        {
            value: 8,
            label: "Thông tin điều kiện bắt cuốc của tài xế",
        },
        {
            value: 9,
            label: "Nội dung về làm đẹp",
        },
        {
            value: 10,
            label: "Nội dung về giáo dục",
        },
        {
            value: 11,
            label: "Nội dung về y tế",
        },
        {
            value: 12,
            label: "Nội dung về bảo hiểm sức khỏe và du lịch",
        },
        {
            value: 13,
            label: "Nội dung về salon ô tô cao cấp",
        },
        {
            value: 14,
            label: "Nội dung về thuê tài xế riêng",
        },
        {
            value: 15,
            label: "Thông tin số tài khoản phiếu đặt cọc cudidi",
        },
        {
            value: 16,
            label: "Thông tin ngân hàng phiếu đặt cọc cudidi",
        },
        {
            value: 17,
            label: "Nội dung về bảo dưỡng sửa chữa cho tài xế",
        },
        {
            value: 18,
            label: "Nội dung về bảo hiểm cho tài xế",
        },

        {
            value: 19,
            label: "Link bảo hiểm sức khỏe",
        },
        {
            value: 20,
            label: "Link bảo hiểm du lịch",
        },

        {
            value: 21,
            label: "Thông tin chính sách bảo mật tài xế",
        },
        {
            value: 22,
            label: "Thông tin điều kiện-điều khoản tài xế",
        },
    ]
};

// API Call
export const getData = createAsyncThunk(
    'ConfigInfor/getData_ConfigInfor',
    async (_, { getState }) => {
        const {
            search, order, dynamicFilter, page, limit,
        } = getState().configInfor;
        const response = await fetchGetList({
            term: formatFilterDynamicToTerm(dynamicFilter, search),
            order: order?.order,
            sort: order?.sort,
            page,
            limit,
        });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const getItemByID = createAsyncThunk(
    'ConfigInfor/getItemByID_ConfigInfor',
    async (_) => {
        const { id } = _;
        const response = await fetchGetByID({ id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickGetItemByID = createAsyncThunk(
    'ConfigInfor/quickGetItemByID_ConfigInfor',
    async (_) => {
        const { id } = _;
        const response = await fetchGetByID({ id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const create = createAsyncThunk(
    'ConfigInfor/create_ConfigInfor',
    async (_, { getState, dispatch }) => {
        const {
            name,
            value,
            type,
            status,
            dataConfig
        } = _ || getState().configInfor;
        const response = await fetchAdd({
            name,
            value,
            type,
            status,
            data: dataConfig
        });
        dispatch(refresh());
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickCreate = createAsyncThunk(
    'ConfigInfor/quickCreate_ConfigInfor',
    async (_, { getState, dispatch }) => {
        const { name } = _ || getState().ConfigInfor;
        const response = await fetchAdd({
            name,
        });
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);

export const update = createAsyncThunk(
    'ConfigInfor/update_ConfigInfor',
    async (_, { getState, dispatch }) => {
        clog("getState()", getState())
        const {
            id,
            name,
            value,
            type,
            status,
            dataConfig
        } = _ || getState().configInfor;
        const response = await fetchUpdate({
            id,
            name,
            value,
            type,
            status,
            data: dataConfig
        });
        // Vi update cung anh huong hen cac item khac nen phai reload tat ca lai
        dispatch(refresh());
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickUpdate = createAsyncThunk(
    'ConfigInfor/quickUpdate_ConfigInfor',
    async (_, { getState }) => {
        const { id, name } = _ || getState().ConfigInfor;
        const response = await fetchUpdate({
            id,
            name,
        });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);

export const deleteItem = createAsyncThunk(
    'ConfigInfor/deleteItem_ConfigInfor',
    async (_, { getState, dispatch }) => {
        const { selectedRows } = getState().configInfor;
        const id = selectedRows[0].id;
        const response = await fetchDelete({ id });
        dispatch(refresh());
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const deleteMulti = createAsyncThunk(
    'ConfigInfor/deleteMulti_ConfigInfor',
    async (_, { getState, dispatch }) => {
        const { selectedRows } = _ || getState().ConfigInfor;
        const response = await fetchDeleteMulti({
            ids: formatGetIDAndTitleBFSubmit(selectedRows),
        });
        dispatch(refresh());
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);

export const ConfigInfor = createSlice({
    name: 'ConfigInfor',
    initialState,
    reducers: {
        // list
        changeSelectedRows: (state, action) => {
            state.selectedRows = action.payload;
        },
        changeSearch: (state, action) => {
            state.search = action.payload;
        },
        changePage: (state, action) => {
            state.page = action.payload;
        },
        changeOrder: (state, action) => {
            state.order = action.payload;
        },
        changeSpinnerSearch: (state, action) => {
            state.spinnerSearch = action.payload;
        },
        addDynamicFilterItem: (state, action) => {
            state.page = 1;
            state.dynamicFilter = [...state.dynamicFilter, action.payload];
        },
        removeDynamicFilterItem: (state, action) => {
            const index = state.dynamicFilter.findIndex(
                (obj) => obj.id === action.payload,
            );
            if (index !== -1) {
                state.dynamicFilter.splice(index, 1);
            }
        },
        removeAllDynamicFilterItem: (state) => {
            state.dynamicFilter = [];
        },
        setDynamicFilterItem: (state, action) => {
            state.page = 1;
            state.dynamicFilter = action.payload;
        },
        refresh: (state) => {
            state.page = 1;
            state.total = 0;
            state.selectedRows = [];
        },
        // state form
        changeName: (state, action) => {
            state.name = action.payload;
        },
        changeValue: (state, action) => {
            state.value = action.payload;
        },
        changeType: (state, action) => {
            state.type = action.payload;
        },
        changeStatus: (state, action) => {
            state.status = action.payload;
        },
        changeDataConfig: (state, action) => {
            clog("action.payload", action.payload)
            state.dataConfig = action.payload;
        },
        // action
        changeSpinnerCreate: (state, action) => {
            state.spinnerCreate = action.payload;
        },
        changeShowModalCreate: (state, action) => {
            state.showModalCreate = action.payload;
        },
        changeUpdateItem: (state, action) => {
            state.updateItem = action.payload;
        },
        initCreateWithoutShowModal: (state) => {
            handleInitCreate(state);
        },
        initCreate: (state) => {
            handleInitCreate(state);
            state.showModalCreate = true;
        },
        initUpdateWithoutShowModal: (state, action) => {
            handleInitUpdate(state, action);
        },
        initUpdate: (state, action) => {
            handleInitUpdate(state, action);
            state.showModalCreate = true;
        },
        initDuplicate: (state) => {
            state.id = null;
            state.title = '';
            state.spinnerCreate = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                if (state.data.length === 0) {
                    state.spinnerSearch = true;
                }
            })
            .addCase(getData.fulfilled, (state, action) => {
                if (action.payload) {
                    state.data = action.payload.data;
                    state.total = action.payload.total;
                    const filteredTypes = state.optionTypes.filter(type => !action.payload.data.some(item => item.type === type.value));
                    state.optionTypes = filteredTypes
                }
                state.spinnerSearch = false;
            })
            .addCase(getItemByID.pending, (state) => {
                state.spinnerCreate = true;
            })
            .addCase(getItemByID.fulfilled, (state, action) => {
                if (action.payload) {
                    handleInitUpdate(state, action);
                }
                state.spinnerCreate = false;
            })
            .addCase(create.pending, (state) => {
                state.spinnerCreate = true;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.spinnerCreate = false;
                if (action.payload) {
                    cleanForm(state);
                    state.showModalCreate = false;
                    showSuccess(tt('Tạo thành công'));
                }
            })
            .addCase(update.pending, (state) => {
                state.spinnerCreate = true;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.spinnerCreate = false;
                state.showModalCreate = false;
                if (action.payload) {
                    const index = state.data.findIndex(
                        (obj) => obj.id === action.payload.id,
                    );
                    if (index !== -1) {
                        state.data[index] = { ...state.data[index], ...action.payload };
                        showSuccess(tt('Cập nhật thành công'));
                        cleanForm(state);
                    }
                }
            })
            .addCase(deleteMulti.pending, (state) => {
                state.spinnerSearch = true;
            })
            .addCase(deleteMulti.fulfilled, (state, action) => {
                state.spinnerSearch = false;
                if (action.payload !== null && action.payload.length === 0) {
                    state.selectedRows = [];
                    showSuccess(tt('Xoá thành công'));
                }
            })
            .addCase(deleteItem.pending, (state) => {
                state.spinnerCreate = true;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.spinnerCreate = false;
                if (action.payload) {
                    showSuccess(tt('Xoá thành công'));
                }
            });
    },
});

export const {
    changeSelectedRows,
    changeSearch,
    changePage,
    changeSpinnerSearch,
    addDynamicFilterItem,
    setDynamicFilterItem,
    removeDynamicFilterItem,
    removeAllDynamicFilterItem,
    refresh,
    changeShowModalCreate,
    initUpdate,
    initCreate,
    changeSpinnerCreate,
    initCreateWithoutShowModal,
    initUpdateWithoutShowModal,
    initDuplicate,
    changeOrder,
    changeName,
    changeValue,
    changeType,
    changeStatus,
    changeDataConfig
} = ConfigInfor.actions;
export const selectedRows = (state) => state.configInfor.selectedRows;
export const search = (state) => state.configInfor.search;
export const page = (state) => state.configInfor.page;
export const limit = (state) => state.configInfor.limit;
export const order = (state) => state.configInfor.order;
export const data = (state) => state.configInfor.data;
export const total = (state) => state.configInfor.total;
export const spinnerSearch = (state) => state.configInfor.spinnerSearch;
// FILTER
export const dynamicFilter = (state) => state.configInfor.dynamicFilter;
// CREATE
export const showModalCreate = (state) => state.configInfor.showModalCreate;
export const id = (state) => state.configInfor.id;
export const updateItem = (state) => state.configInfor.updateItem;
export const name = (state) => state.configInfor.name;
export const value = (state) => state.configInfor.value;
export const type = (state) => state.configInfor.type;
export const status = (state) => state.configInfor.status;
export const dataConfig = (state) => state.configInfor.dataConfig;

export const spinnerCreate = (state) => state.configInfor.spinnerCreate;
export const optionTypes = (state) => state.configInfor.optionTypes;
export default ConfigInfor.reducer;
