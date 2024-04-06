import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WEBSITE_API_URL } from "../../config/index";

const initialState = {
    order_data: [],
    accepted_order: [],
    pickedup_order: [],
    single_order: [],
    single_returned_order: [],
    pickedup_return_order: [],


    accepted_return_order: [],

    order_history: [],
    isSuccess: false,
    message: "",
    loading: false,
};

export const getNewOrders = createAsyncThunk("store/getNewOrders", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/get-new-orders", formData);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});


export const getAcceptedOrders = createAsyncThunk("store/getAcceptedOrders", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/get-accepted-orders", formData);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});
export const getReturnedAcceptedOrders = createAsyncThunk("store/getReturnedAcceptedOrders", 
async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/get-accepted-returned-orders", formData);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});
export const getPickedUpOrders = createAsyncThunk("store/getPickedUpOrders", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/get-pickedup-orders", formData);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});
export const getPickedReturnUpOrders = createAsyncThunk("store/getPickedReturnUpOrders", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/get-pickedup-returned-orders", formData);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});

export const newOrderAction = createAsyncThunk("store/newOrderAction", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/new-order-action", formData);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});

export const pickedupOrder = createAsyncThunk("store/pickedupOrder", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/pickedup-order", formData);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});
export const pickedReturnupOrder = createAsyncThunk("store/pickedReturnupOrder", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/pickedup-return-order", formData);
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
export const orderDeliveredReturned = createAsyncThunk("store/orderDeliveredReturned", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/order-delivered-returned", formData);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});



export const getSingleOrder = createAsyncThunk("store/getSingleOrder", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/get-single-parnter-order", formData);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});
export const getSingleReturnOrder = createAsyncThunk("store/getSingleReturnOrder", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/get-single-returned-parnter-order", formData);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});



export const getOrderHistory = createAsyncThunk("store/getOrderHistory", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/get-order-history", formData);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});


const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    extraReducers: {
        [getNewOrders.pending]: (state,) => {
            state.loading = true;
        },
        [getNewOrders.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.order_data = payload;
            state.isSuccess = true;
        },
        [getNewOrders.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },

        [getAcceptedOrders.pending]: (state,) => {
            state.loading = true;
        },
        [getAcceptedOrders.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.accepted_order = payload;
            state.isSuccess = true;
        },
        [getAcceptedOrders.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
        [getReturnedAcceptedOrders.pending]: (state,) => {
            state.loading = true;
        },
        [getReturnedAcceptedOrders.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.accepted_return_order = payload;
            state.isSuccess = true;
        },
        [getReturnedAcceptedOrders.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },

        [getPickedUpOrders.pending]: (state,) => {
            state.loading = true;
        },
        [getPickedUpOrders.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.pickedup_order = payload;
            state.isSuccess = true;
        },
        [getPickedUpOrders.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
        [getPickedReturnUpOrders.pending]: (state,) => {
            state.loading = true;
        },
        [getPickedReturnUpOrders.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.pickedup_return_order = payload;
            state.isSuccess = true;
        },
        [getPickedReturnUpOrders.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },


        [getSingleOrder.pending]: (state,) => {
            state.loading = true;
        },
        [getSingleOrder.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.single_order = payload;
            state.isSuccess = true;
        },
        [getSingleOrder.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
        [getSingleReturnOrder.pending]: (state,) => {
            state.loading = true;
        },
        [getSingleReturnOrder.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.single_returned_order = payload;
            state.isSuccess = true;
        },
        [getSingleReturnOrder.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },

        [getOrderHistory.pending]: (state,) => {
            state.loading = true;
        },
        [getOrderHistory.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.order_history = payload;
            state.isSuccess = true;
        },
        [getOrderHistory.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
    },
});


export const { userCurrentTenant } = userSlice.actions;

export default userSlice.reducer;
