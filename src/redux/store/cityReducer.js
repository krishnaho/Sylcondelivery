import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WEBSITE_API_URL } from "../../config/index";

const initialState = {
    city_data: [],
    isSuccess: false,
    message: "",
    loading: false,
};

export const getEveryCities = createAsyncThunk("store/getEveryCities", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/get-every-cities", formData);
        
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});

export const orderDelivered = createAsyncThunk("store/orderDelivered", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/order-delivered", formData);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});

const citySlice = createSlice({
    name: "city",
    initialState: initialState,
    extraReducers: {
        [getEveryCities.pending]: (state,) => {
            state.loading = true;
        },
        [getEveryCities.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.city_data = payload;
            state.isSuccess = true;
        },
        [getEveryCities.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },

    },
});


export const { cityCurrentTenant } = citySlice.actions;

export default citySlice.reducer;
