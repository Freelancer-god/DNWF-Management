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
    'VehicleInsuranceManager/getData_VehicleManager',
    async (_, { getState }) => {
        const {
            search, order, dynamicFilter, page, limit,
        } = getState().vehicleInsuranceManager;
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
    'VehicleInsuranceManager/getDriverForms',
    async (_) => {
        const { vehicle_id } = _;
        const response = await getDriverCurrentSubmitedForms({ vehicle_id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);

export const VehicleInsuranceManager = createSlice({
    name: 'VehicleInsuranceManager',
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

} = VehicleInsuranceManager.actions;
export const selectedRows = (state) => state.vehicleInsuranceManager.selectedRows;
export const search = (state) => state.vehicleInsuranceManager.search;
export const page = (state) => state.vehicleInsuranceManager.page;
export const limit = (state) => state.vehicleInsuranceManager.limit;
export const order = (state) => state.vehicleInsuranceManager.order;
export const data = (state) => state.vehicleInsuranceManager.data;
export const total = (state) => state.vehicleInsuranceManager.total;
export const spinnerSearch = (state) => state.vehicleInsuranceManager.spinnerSearch;
// FILTER
export const dynamicFilter = (state) => state.vehicleInsuranceManager.dynamicFilter;
// CREATE
export const showModalCreate = (state) => state.vehicleInsuranceManager.showModalCreate;
export const id = (state) => state.vehicleInsuranceManager.id;
export const updateItem = (state) => state.vehicleInsuranceManager.updateItem;

export const vehicleExpandedKeys = (state) => state.vehicleInsuranceManager.vehicleExpandedKeys;
export const vehicleAutoExpandParent = (state) => state.vehicleInsuranceManager.vehicleAutoExpandParent;
export const vehicleCheckedKeys = (state) => state.vehicleInsuranceManager.vehicleCheckedKeys;
export const vehicleSelectedKeys = (state) => state.vehicleInsuranceManager.vehicleSelectedKeys;

export const spinnerCreate = (state) => state.vehicleInsuranceManager.spinnerCreate;
export default VehicleInsuranceManager.reducer;

export const vehicleFormsSelector = (state) => state.vehicleInsuranceManager.vehicleForms;
