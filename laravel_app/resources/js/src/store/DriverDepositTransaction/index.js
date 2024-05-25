/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


import { fetchAdd, fetchConfirm, fetchDelete, fetchDeleteMulti, fetchGetByID, fetchGetList, fetchUpdate, } from './API';
import { clog, formatFilterDynamicToTerm, tt } from '../../utils';
import { formatGetIDAndTitleBFSubmit } from "./formatData";
import { showSuccess } from '../../components/dialogs';
import { PAGE_LIMIT } from '../../CONSTANT';


const cleanForm = (state) => {
    state.total = 0;
    state.driverId = null;
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
    const { id, driver_id, total } = action.payload;
    clog("role", role)
    state.updateItem = action.payload;
    state.id = id;
    state.driverId = driver_id
    state.totalVnd = total

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
    driverId: null,
    totalVnd: 50000,

    spinnerCreate: false,
    showModalCreate: false,

};

// API Call
export const getData = createAsyncThunk(
    'DriverDepositTransaction/getData_EmployeeList',
    async (_, { getState }) => {
        const {
            search, order, dynamicFilter, page, limit,
        } = getState().driverDepositTransaction;
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
    'DriverDepositTransaction/getItemByID_EmployeeList',
    async (_) => {
        const { id } = _;
        const response = await fetchGetByID({ id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickGetItemByID = createAsyncThunk(
    'DriverDepositTransaction/quickGetItemByID_EmployeeList',
    async (_) => {
        const { id } = _;
        const response = await fetchGetByID({ id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const create = createAsyncThunk(
    'DriverDepositTransaction/create_EmployeeList',
    async (_, { getState, dispatch }) => {
        const {
            driverId,
            totalVnd,
        } = _ || getState().driverDepositTransaction;
        const response = await fetchAdd({
            driver_id: driverId,
            total: totalVnd,
        });
        dispatch(refresh());
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickCreate = createAsyncThunk(
    'DriverDepositTransaction/quickCreate_EmployeeList',
    async (_, { getState, dispatch }) => {
        const { name } = _ || getState().DriverDepositTransaction;
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
    'DriverDepositTransaction/update_EmployeeList',
    async (_, { getState, dispatch }) => {
        clog("getState()", getState())
        const {
            id,
            name,
            email,
            username,
            roleId,
            password,
            status
        } = _ || getState().driverDepositTransaction;
        clog("status", status)
        const response = await fetchUpdate({
            id,
            name,
            email,
            username,
            role_id: roleId,
            password,
            status
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
    'DriverDepositTransaction/quickUpdate_EmployeeList',
    async (_, { getState }) => {
        const { id, name } = _ || getState().DriverDepositTransaction;
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
    'DriverDepositTransaction/deleteItem_EmployeeList',
    async (_, { getState, dispatch }) => {
        const { selectedRows } = getState().driverDepositTransaction;
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
    'DriverDepositTransaction/deleteMulti_EmployeeList',
    async (_, { getState, dispatch }) => {
        const { selectedRows } = _ || getState().DriverDepositTransaction;
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

export const confirmRequest = createAsyncThunk(
    'DriverDepositTransaction/confirm_driverDepositTransaction',
    async (_, { getState, dispatch }) => {
        const { id } = _;
        const { status } = _;
        const { notes } = _;
        const response = await fetchConfirm(
            {
                id,
                status,
                notes,
            });
        dispatch(getData())
        clog('confirm', response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);

export const DriverDepositTransaction = createSlice({
    name: 'DriverDepositTransaction',
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
        changeDriverId: (state, action) => {
            state.driverId = action.payload;
        },
        changeTotalVnd: (state, action) => {
            state.totalVnd = action.payload;
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
                    state.selectedRows = []
                }
                state.spinnerSearch = false;
            })
            .addCase(getItemByID.pending, (state) => {
                state.spinnerCreate = true;
            })
            .addCase(getItemByID.fulfilled, (state, action) => {
                if (action.payload) {
                    clog("action.payload", action.payload);
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
            })
            .addCase(confirmRequest
                .pending, (state) => {
                    state.spinnerSearch = true;
                })
            .addCase(confirmRequest
                .fulfilled, (state, action) => {
                    state.spinnerSearch = false;
                    if (action.payload) {
                        showSuccess(tt('Xác nhận thành công'));
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
    changeDriverId,
    changeTotalVnd,
} = DriverDepositTransaction.actions;
export const selectedRows = (state) => state.driverDepositTransaction.selectedRows;
export const search = (state) => state.driverDepositTransaction.search;
export const page = (state) => state.driverDepositTransaction.page;
export const limit = (state) => state.driverDepositTransaction.limit;
export const order = (state) => state.driverDepositTransaction.order;
export const data = (state) => state.driverDepositTransaction.data;
export const total = (state) => state.driverDepositTransaction.total;
export const spinnerSearch = (state) => state.driverDepositTransaction.spinnerSearch;
// FILTER
export const dynamicFilter = (state) => state.driverDepositTransaction.dynamicFilter;
// CREATE
export const showModalCreate = (state) => state.driverDepositTransaction.showModalCreate;
export const id = (state) => state.driverDepositTransaction.id;
export const updateItem = (state) => state.driverDepositTransaction.updateItem;
export const driverId = (state) => state.driverDepositTransaction.driverId;
export const totalVnd = (state) => state.driverDepositTransaction.totalVnd;

export const spinnerCreate = (state) => state.driverDepositTransaction.spinnerCreate;
export default DriverDepositTransaction.reducer;
