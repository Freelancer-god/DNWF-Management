/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


import { fetchAdd, fetchDelete, fetchDeleteMulti, fetchGetByID, fetchGetList, fetchUpdate, fetchUpdateStatus, } from './API';
import { clog, formatFilterDynamicToTerm, tt } from '../../utils';
import { formatGetIDAndTitleBFSubmit } from "./formatData";
import { showSuccess } from '../../components/dialogs';
import { PAGE_LIMIT } from '../../CONSTANT';


const cleanForm = (state) => {
    state.name = '';
    state.email = '';
    state.username = '';
    state.status = 0;
    state.password = null;
    state.roleId = null;
    state.role = null
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
    const { id, name, email, username, status, role } = action.payload;
    clog("role", role)
    state.updateItem = action.payload;
    state.id = id;
    state.name = name
    state.email = email
    state.username = username
    state.status = status
    state.roleId = role?.id;
    state.role = role;
    state.password = null

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
    dynamicFilter: [
    ],

    // CREATE
    id: null,
    updateItem: null,
    name: '',
    email: '',
    username: '',
    roleId: null,
    role: null,
    password: null,
    status: 0,

    spinnerCreate: false,
    showModalCreate: false,

};

// API Call
export const getData = createAsyncThunk(
    'CustomerList/getData_EmployeeList',
    async (_, { getState }) => {
        const {
            search, order, dynamicFilter, page, limit,
        } = getState().customerList;
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
    'CustomerList/getItemByID_EmployeeList',
    async (_) => {
        const { id } = _;
        const response = await fetchGetByID({ id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickGetItemByID = createAsyncThunk(
    'CustomerList/quickGetItemByID_EmployeeList',
    async (_) => {
        const { id } = _;
        const response = await fetchGetByID({ id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const create = createAsyncThunk(
    'CustomerList/create_EmployeeList',
    async (_, { getState, dispatch }) => {
        const {
            name,
            email,
            username,
            password,
            status,
            roleId
        } = _ || getState().customerList;
        const response = await fetchAdd({
            name,
            email,
            username,
            role_id: roleId,
            password,
            status
        });
        dispatch(refresh());
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickCreate = createAsyncThunk(
    'CustomerList/quickCreate_EmployeeList',
    async (_, { getState, dispatch }) => {
        const { name } = _ || getState().CustomerList;
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
    'CustomerList/update_EmployeeList',
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
        } = _ || getState().customerList;
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

export const updateStatus = createAsyncThunk(
    'CustomerList/updateStatus_EmployeeList',
    async (_, { getState, dispatch }) => {
        clog("getState()", getState())
        const { id } = _ || getState().customerList;
        const { status } = _;
        const response = await fetchUpdateStatus({
            id, status,
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
    'CustomerList/quickUpdate_EmployeeList',
    async (_, { getState }) => {
        const { id, name } = _ || getState().CustomerList;
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
    'CustomerList/deleteItem_EmployeeList',
    async (_, { getState, dispatch }) => {
        const { selectedRows } = getState().customerList;
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
    'CustomerList/deleteMulti_EmployeeList',
    async (_, { getState, dispatch }) => {
        const { selectedRows } = _ || getState().CustomerList;
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

export const CustomerList = createSlice({
    name: 'CustomerList',
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
        changeEmail: (state, action) => {
            state.email = action.payload;
        },
        changePassword: (state, action) => {
            state.password = action.payload;
        },
        changeUsername: (state, action) => {
            state.username = action.payload;
        },
        changeRoleId: (state, action) => {
            state.roleId = action.payload;
        },
        changeStatus: (state, action) => {
            state.status = action.payload;
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
            .addCase(updateStatus.pending, (state) => {
                state.spinnerSearch = true;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.spinnerSearch = false;
                state.selectedRows = [];
                if (action.payload) {
                    showSuccess(tt('Đổi trạng thái thành công'));
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
    changeEmail,
    changePassword,
    changeUsername,
    changeRoleId,
    changeStatus
} = CustomerList.actions;
export const selectedRows = (state) => state.customerList.selectedRows;
export const search = (state) => state.customerList.search;
export const page = (state) => state.customerList.page;
export const limit = (state) => state.customerList.limit;
export const order = (state) => state.customerList.order;
export const data = (state) => state.customerList.data;
export const total = (state) => state.customerList.total;
export const spinnerSearch = (state) => state.customerList.spinnerSearch;
// FILTER
export const dynamicFilter = (state) => state.customerList.dynamicFilter;
// CREATE
export const showModalCreate = (state) => state.customerList.showModalCreate;
export const id = (state) => state.customerList.id;
export const updateItem = (state) => state.customerList.updateItem;
export const name = (state) => state.customerList.name;
export const email = (state) => state.customerList.email;
export const password = (state) => state.customerList.password;
export const username = (state) => state.customerList.username;
export const roleId = (state) => state.customerList.roleId;
export const role = (state) => state.customerList.role;
export const status = (state) => state.customerList.status;

export const spinnerCreate = (state) => state.customerList.spinnerCreate;
export default CustomerList.reducer;
