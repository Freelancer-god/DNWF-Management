/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    fetchAdd, fetchDelete, fetchDeleteMulti, fetchGetByID, fetchGetList, fetchUpdate, getDriverCurrentSubmitedForms,
} from './API';
import { clog, formatFilterDynamicToTerm, tt } from '../../utils';
import { formatGetIDAndTitleBFSubmit } from './formatData';
import { showSuccess } from '../../components/dialogs';
import { PAGE_LIMIT } from '../../CONSTANT';

const cleanForm = (state) => {
    state.tripExpandedKeys = [];
    state.tripAutoExpandParent = true;
    state.tripCheckedKeys = [];
    state.tripSelectedKeys = [];
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
    const {
        permission_groups, id, display_name, description,
    } = action.payload;
    state.updateItem = action.payload;
    state.id = id;
    state.roleName = display_name;
    state.roleDescription = description;

    state.systemExpandedKeys = [];
    state.systemAutoExpandParent = true;
    state.systemCheckedKeys = permission_groups?.he_thong?.map(({ id }) => id);
    state.systemSelectedKeys = [];

    state.tripExpandedKeys = [];
    state.tripAutoExpandParent = true;
    state.tripCheckedKeys = permission_groups?.trip?.map(({ id }) => id);
    state.tripSelectedKeys = [];

    state.supportExpandedKeys = [];
    state.supportAutoExpandParent = true;
    state.supportCheckedKeys = permission_groups?.ho_tro?.map(({ id }) => id);
    state.supportSelectedKeys = [];

    state.customerExpandedKeys = [];
    state.customerAutoExpandParent = true;
    state.customerCheckedKeys = permission_groups?.nguoi_dung?.map(({ id }) => id);
    state.customerSelectedKeys = [];

    state.vehiclesExpandedKeys = [];
    state.vehiclesAutoExpandParent = true;
    state.vehiclesCheckedKeys = permission_groups?.phuong_tien?.map(({ id }) => id);
    state.vehiclesSelectedKeys = [];

    state.tripExpandedKeys = [];
    state.tripAutoExpandParent = true;
    state.tripCheckedKeys = permission_groups?.quan_ly_chuyen_di?.map(({ id }) => id);
    state.tripSelectedKeys = [];

    state.notificationExpandedKeys = [];
    state.notificationAutoExpandParent = true;
    state.notificationCheckedKeys = permission_groups?.thong_bao?.map(({ id }) => id);
    state.notificationSelectedKeys = [];

    state.spinnerCreate = false;
};

const initialState = {
    // LIST
    search: '',
    page: 1,
    limit: PAGE_LIMIT, // 25
    data: [],
    order: { order: 'updated_at', sort: 'desc' },
    total: 0,
    selectedRows: [],
    spinnerSearch: false,

    // FILTER
    dynamicFilter: [
        {
            id: '0_1',
            value: '0_1',
            groupId: '0',
            label: tt('Đang diễn ra'),
            data: [
                {
                    id: 'status_2',
                    field: 'trips.status',
                    cond: 'is',
                    value: 2,
                },
                {
                    id: 'status_3',
                    field: 'trips.status',
                    cond: 'is',
                    value: 3,
                },
                {
                    id: 'status_4',
                    field: 'trips.status',
                    cond: 'is',
                    value: 4,
                },
                {
                    id: 'status_5',
                    field: 'trips.status',
                    cond: 'is',
                    value: 5,
                },
                {
                    id: 'status_6',
                    field: 'trips.status',
                    cond: 'is',
                    value: 6,
                },
            ],
        }],

    // CREATE
    id: null,
    updateItem: null,
    roleName: '',
    roleDescription: '',

    tripExpandedKeys: [],
    tripAutoExpandParent: true,
    tripCheckedKeys: [],
    tripSelectedKeys: [],

    spinnerCreate: false,
    showModalCreate: false,

    tripForms: {},

};

// API Call
export const getData = createAsyncThunk(
    'TripManager/getData_TripManager',
    async (_, { getState }) => {
        const {
            search, order, dynamicFilter, page, limit,
        } = getState().tripManager;
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

export const getTripForms = createAsyncThunk(
    'TripManager/getDriverForms',
    async (_) => {
        const { trip_id } = _;
        const response = await getDriverCurrentSubmitedForms({ trip_id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);

export const TripManager = createSlice({
    name: 'TripManager',
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

        changeDriverAutoExpandParent: (state, action) => {
            state.tripAutoExpandParent = action.payload;
        },
        changeDriverCheckedKeys: (state, action) => {
            state.tripCheckedKeys = action.payload;
        },
        changeDriverExpandedKeys: (state, action) => {
            state.tripExpandedKeys = action.payload;
        },
        changeDriverSelectedKeys: (state, action) => {
            state.tripSelectedKeys = action.payload;
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
                    // const formatedData = action.payload.data.map((item) => {
                    //   let cover = null;
                    //   // loop het tat ca medias de tim media co type la cover
                    //   for (let i = 0; i < item.medias.length; i++) {
                    //     if (item.medias[i].type === 'cover') {
                    //       cover = item.medias[i];
                    //       break;
                    //     }
                    //   }
                    //   item.cover = cover;
                    //   return item;
                    // });
                    state.data = action.payload.data;
                    state.total = action.payload.total;
                }
                state.spinnerSearch = false;
            })

            .addCase(getTripForms.fulfilled, (state, action) => {
                if (action.payload) {
                    clog('action.payload', action.payload);
                    state.tripForms[action.meta.arg.trip_id] = action.payload;
                }
                state.spinnerCreate = false;
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
    changeRoleDescription,
    changeRoleName,
    changeUpdateItem,
    changeShowModalCreate,
    initUpdate,
    initCreate,
    changeSpinnerCreate,
    initCreateWithoutShowModal,
    initUpdateWithoutShowModal,
    initDuplicate,
    changeOrder,

    changeDriverAutoExpandParent,
    changeDriverCheckedKeys,
    changeDriverExpandedKeys,
    changeDriverSelectedKeys,

} = TripManager.actions;
export const selectedRows = (state) => state.tripManager.selectedRows;
export const search = (state) => state.tripManager.search;
export const page = (state) => state.tripManager.page;
export const limit = (state) => state.tripManager.limit;
export const order = (state) => state.tripManager.order;
export const data = (state) => state.tripManager.data;
export const total = (state) => state.tripManager.total;
export const spinnerSearch = (state) => state.tripManager.spinnerSearch;
// FILTER
export const dynamicFilter = (state) => state.tripManager.dynamicFilter;
// CREATE
export const showModalCreate = (state) => state.tripManager.showModalCreate;
export const id = (state) => state.tripManager.id;
export const updateItem = (state) => state.tripManager.updateItem;

export const tripExpandedKeys = (state) => state.tripManager.tripExpandedKeys;
export const tripAutoExpandParent = (state) => state.tripManager.tripAutoExpandParent;
export const tripCheckedKeys = (state) => state.tripManager.tripCheckedKeys;
export const tripSelectedKeys = (state) => state.tripManager.tripSelectedKeys;

export const spinnerCreate = (state) => state.tripManager.spinnerCreate;
export default TripManager.reducer;

export const tripFormsSelector = (state) => state.tripManager.tripForms;
