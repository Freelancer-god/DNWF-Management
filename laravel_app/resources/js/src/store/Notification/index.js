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
    state.id = null
    state.title = '';
    state.content = '';
    state.type = null;
    state.status = 1;
    state.sendType = null
    state.sendDate = null
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
    const { id, title, content, type, send_type, send_date, status } = action.payload;
    state.updateItem = action.payload;
    state.id = id;
    state.title = title
    state.content = content
    state.type = type
    state.status = status
    state.sendType = send_type
    state.sendDate = send_date

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
    title: '',
    content: '',
    type: null,
    sendType: null,
    sendDate: null,
    status: 1,

    spinnerCreate: false,
    showModalCreate: false,

};

// API Call
export const getData = createAsyncThunk(
    'Notification/getData_Notification',
    async (_, { getState }) => {
        const {
            search, order, dynamicFilter, page, limit,
        } = getState().notification;
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
    'Notification/getItemByID_Notification',
    async (_) => {
        const { id } = _;
        const response = await fetchGetByID({ id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickGetItemByID = createAsyncThunk(
    'Notification/quickGetItemByID_Notification',
    async (_) => {
        const { id } = _;
        const response = await fetchGetByID({ id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const create = createAsyncThunk(
    'Notification/create_Notification',
    async (_, { getState, dispatch }) => {
        const {
            title,
            content,
            type,
            status,
            sendType,
            sendDate
        } = _ || getState().notification;
        const response = await fetchAdd({
            title,
            content,
            type,
            status,
            send_type: sendType,
            send_date: sendDate
        });
        dispatch(refresh());
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickCreate = createAsyncThunk(
    'Notification/quickCreate_Notification',
    async (_, { getState, dispatch }) => {
        const { name } = _ || getState().Notification;
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
    'Notification/update_Notification',
    async (_, { getState, dispatch }) => {
        clog("getState()", getState())
        const {
            id,
            title,
            content,
            type,
            status,
            sendType,
            sendDate
        } = _ || getState().notification;
        const response = await fetchUpdate({
            id,
            title,
            content,
            type,
            status,
            send_type: sendType,
            send_date: sendDate
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
    'Notification/quickUpdate_Notification',
    async (_, { getState }) => {
        const { id, name } = _ || getState().Notification;
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
    'Notification/deleteItem_Notification',
    async (_, { getState, dispatch }) => {
        const { selectedRows } = getState().notification;
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
    'Notification/deleteMulti_Notification',
    async (_, { getState, dispatch }) => {
        const { selectedRows } = _ || getState().Notification;
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

export const Notification = createSlice({
    name: 'Notification',
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
        changeTitle: (state, action) => {
            state.title = action.payload;
        },
        changeContent: (state, action) => {
            state.content = action.payload;
        },
        changeType: (state, action) => {
            state.type = action.payload;
        },
        changeStatus: (state, action) => {
            state.status = action.payload;
        },
        changeSendDate: (state, action) => {
            state.sendDate = action.payload;
        },
        changeSendType: (state, action) => {
            state.sendType = action.payload;
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
    changeTitle,
    changeContent,
    changeType,
    changeStatus,
    changeSendType,
    changeSendDate,
    changeDataConfig
} = Notification.actions;
export const selectedRows = (state) => state.notification.selectedRows;
export const search = (state) => state.notification.search;
export const page = (state) => state.notification.page;
export const limit = (state) => state.notification.limit;
export const order = (state) => state.notification.order;
export const data = (state) => state.notification.data;
export const total = (state) => state.notification.total;
export const spinnerSearch = (state) => state.notification.spinnerSearch;
// FILTER
export const dynamicFilter = (state) => state.notification.dynamicFilter;
// CREATE
export const showModalCreate = (state) => state.notification.showModalCreate;
export const id = (state) => state.notification.id;
export const updateItem = (state) => state.notification.updateItem;
export const title = (state) => state.notification.title;
export const content = (state) => state.notification.content;
export const type = (state) => state.notification.type;
export const status = (state) => state.notification.status;
export const sendDate = (state) => state.notification.sendDate;
export const sendType = (state) => state.notification.sendType;
export const dataConfig = (state) => state.notification.dataConfig;

export const spinnerCreate = (state) => state.notification.spinnerCreate;
export const optionTypes = (state) => state.notification.optionTypes;
export default Notification.reducer;
