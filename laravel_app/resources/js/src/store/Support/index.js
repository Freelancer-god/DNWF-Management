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
            label: "Thông tin chính sách của tài xế",
        },
    ]
};

// API Call
export const getData = createAsyncThunk(
    'Support/getData_ConfigInfor',
    async (_, { getState }) => {
        const {
            search, order, dynamicFilter, page, limit,
        } = getState().support;
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
    'Support/getItemByID_ConfigInfor',
    async (_) => {
        const { id } = _;
        const response = await fetchGetByID({ id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickGetItemByID = createAsyncThunk(
    'Support/quickGetItemByID_ConfigInfor',
    async (_) => {
        const { id } = _;
        const response = await fetchGetByID({ id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const create = createAsyncThunk(
    'Support/create_ConfigInfor',
    async (_, { getState, dispatch }) => {
        const {
            name,
            value,
            type,
            status,
            dataConfig
        } = _ || getState().support;
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
    'Support/quickCreate_ConfigInfor',
    async (_, { getState, dispatch }) => {
        const { name } = _ || getState().Support;
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
    'Support/update_ConfigInfor',
    async (_, { getState, dispatch }) => {
        clog("getState()", getState())
        const {
            id,
            name,
            value,
            type,
            status,
            dataConfig
        } = _ || getState().support;
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
    'Support/quickUpdate_ConfigInfor',
    async (_, { getState }) => {
        const { id, name } = _ || getState().Support;
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
    'Support/deleteItem_ConfigInfor',
    async (_, { getState, dispatch }) => {
        const { selectedRows } = getState().support;
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
    'Support/deleteMulti_ConfigInfor',
    async (_, { getState, dispatch }) => {
        const { selectedRows } = _ || getState().Support;
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

export const Support = createSlice({
    name: 'Support',
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
} = Support.actions;
export const selectedRows = (state) => state.support.selectedRows;
export const search = (state) => state.support.search;
export const page = (state) => state.support.page;
export const limit = (state) => state.support.limit;
export const order = (state) => state.support.order;
export const data = (state) => state.support.data;
export const total = (state) => state.support.total;
export const spinnerSearch = (state) => state.support.spinnerSearch;
// FILTER
export const dynamicFilter = (state) => state.support.dynamicFilter;
// CREATE
export const showModalCreate = (state) => state.support.showModalCreate;
export const id = (state) => state.support.id;
export const updateItem = (state) => state.support.updateItem;
export const name = (state) => state.support.name;
export const value = (state) => state.support.value;
export const type = (state) => state.support.type;
export const status = (state) => state.support.status;
export const dataConfig = (state) => state.support.dataConfig;

export const spinnerCreate = (state) => state.support.spinnerCreate;
export const optionTypes = (state) => state.support.optionTypes;
export default Support.reducer;
