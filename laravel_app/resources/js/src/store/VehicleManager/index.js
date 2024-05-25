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
    state.vehicleExpandedKeys = [];
    state.vehicleAutoExpandParent = true;
    state.vehicleCheckedKeys = [];
    state.vehicleSelectedKeys = [];
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

    state.spinnerCreate = false;
};

const initialState = {
    // LIST
    search: '',
    page: 1,
    limit: PAGE_LIMIT, // 25
    data: [],
    order: { order: 'created_at', sort: 'asc' },
    total: 0,
    selectedRows: [],
    spinnerSearch: false,

    // FILTER
    dynamicFilter: [],

    // CREATE
    id: null,
    updateItem: null,
    roleName: '',
    roleDescription: '',

    vehicleExpandedKeys: [],
    vehicleAutoExpandParent: true,
    vehicleCheckedKeys: [],
    vehicleSelectedKeys: [],

    spinnerCreate: false,
    showModalCreate: false,

    vehicleForms: {},

};

// API Call
export const getData = createAsyncThunk(
    'VehicleManager/getData_VehicleManager',
    async (_, { getState }) => {
        const {
            search, order, dynamicFilter, page, limit,
        } = getState().vehicleManager;
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
    'VehicleManager/getDriverForms',
    async (_) => {
        const { vehicle_id } = _;
        const response = await getDriverCurrentSubmitedForms({ vehicle_id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);

export const VehicleManager = createSlice({
    name: 'VehicleManager',
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
            state.vehicleAutoExpandParent = action.payload;
        },
        changeDriverCheckedKeys: (state, action) => {
            state.vehicleCheckedKeys = action.payload;
        },
        changeDriverExpandedKeys: (state, action) => {
            state.vehicleExpandedKeys = action.payload;
        },
        changeDriverSelectedKeys: (state, action) => {
            state.vehicleSelectedKeys = action.payload;
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
                    state.vehicleForms[action.meta.arg.vehicle_id] = action.payload;
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

} = VehicleManager.actions;
export const selectedRows = (state) => state.vehicleManager.selectedRows;
export const search = (state) => state.vehicleManager.search;
export const page = (state) => state.vehicleManager.page;
export const limit = (state) => state.vehicleManager.limit;
export const order = (state) => state.vehicleManager.order;
export const data = (state) => state.vehicleManager.data;
export const total = (state) => state.vehicleManager.total;
export const spinnerSearch = (state) => state.vehicleManager.spinnerSearch;
// FILTER
export const dynamicFilter = (state) => state.vehicleManager.dynamicFilter;
// CREATE
export const showModalCreate = (state) => state.vehicleManager.showModalCreate;
export const id = (state) => state.vehicleManager.id;
export const updateItem = (state) => state.vehicleManager.updateItem;

export const vehicleExpandedKeys = (state) => state.vehicleManager.vehicleExpandedKeys;
export const vehicleAutoExpandParent = (state) => state.vehicleManager.vehicleAutoExpandParent;
export const vehicleCheckedKeys = (state) => state.vehicleManager.vehicleCheckedKeys;
export const vehicleSelectedKeys = (state) => state.vehicleManager.vehicleSelectedKeys;

export const spinnerCreate = (state) => state.vehicleManager.spinnerCreate;
export default VehicleManager.reducer;

export const vehicleFormsSelector = (state) => state.vehicleManager.vehicleForms;
