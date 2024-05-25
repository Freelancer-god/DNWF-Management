import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { fetchGetAllPermissions } from './API';
import { clog } from '../../utils';

const perDic = {};
if (document.getElementById('myPermission') && document.getElementById('myPermission').value) {
    const pers = JSON.parse(document.getElementById('myPermission').value);
    pers.forEach(({ name, id }) => {
        perDic[name] = { name, id };
    });
}
const initialState = {
    permission: perDic,
};

// API Call
export const getData = createAsyncThunk(
    'Permissions/getData_Permissions',
    async () => {
        const response = await fetchGetAllPermissions();
        clog(response);
        return response;
    },
);
export const Permissions = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        updatePermissions: (state, action) => {
            state.permission = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {

            })
            .addCase(getData.fulfilled, (state, action) => {
                if (action.payload) {
                    state.permission = action.payload || [];
                }
            });
    },
});

export const {
    updatePermissions,
} = Permissions.actions;
export const permission = (state) => state.permissions.permission;
export default Permissions.reducer;
export const PermissionsContext = React.createContext();
