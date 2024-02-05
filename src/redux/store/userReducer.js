import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WEBSITE_API_URL } from "../../config/index";

const initialState = {
    user_data: [],
    isSuccess: false,
    message: "", 
    loading: false,
};

export const loginDeliveryPartner = createAsyncThunk("store/loginDeliveryPartner", async (formData) => {
    try { 
        const response = await axios.post(WEBSITE_API_URL + "/login-delivery-partner", formData);
        if (response.data.success && response.data.data.deliveryGuy) {
            localStorage.setItem('user_id', response.data.data.id);
            localStorage.setItem('auth_token', response.data.data.auth_token)
            localStorage.setItem("userLogin", true)
        } else if (response.data.success) {
            localStorage.setItem('user_id', response.data.data.id);
            localStorage.setItem('auth_token', response.data.data.auth_token)
            // localStorage.setItem("userLogin", true)
        }

        const persist = {
            user: response.data.data
        };
        if(window.ReactNativeWebView){
            const response = {
                type : 'state',
                data : persist
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(response));
        }
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
});
    
export const userRegister = createAsyncThunk("store/userRegister", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/user-register", formData);
        if (response.data.success) {
            localStorage.setItem('user_id', response.data.data.id);
            localStorage.setItem('auth_token', response.data.data.auth_token)
        }
        return response.data;
    } catch (error) {
        console.log('error2', error);
        throw error;
    }
});


export const getUserProfile = createAsyncThunk("store/getUserProfile", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/get-user-profile", formData);
        if (response.data.success) {
            localStorage.setItem('user_id', response.data.data.id);
            localStorage.setItem('auth_token', response.data.data.auth_token)
        }
        return response.data;
    } catch (error) {
        console.log('error2', error);
        throw error;
    }
});

export const getUserData = createAsyncThunk("store/getUserData", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/get-user-data", formData);
        return response.data;
    } catch (error) {
        console.log('error2', error);
        throw error;
    }
});


export const updateUserData = createAsyncThunk("store/updateUserData", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/update-user-data", formData);
        return response.data;
    } catch (error) {
        console.log('error2', error);
        throw error;
    }
});
 

export const deliveryParnterRegister = createAsyncThunk("store/deliveryParnterRegister", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/delivery-parnter-register", formData);
        if (response.data.success && response.data.data.deliveryGuy) {
            localStorage.setItem('user_id', response.data.data.id);
            localStorage.setItem('auth_token', response.data.data.auth_token)
            localStorage.setItem("userLogin", true)
        } else if (response.data.success) {
            localStorage.setItem('user_id', response.data.data.id);
            localStorage.setItem('auth_token', response.data.data.auth_token)
            // localStorage.setItem("userLogin", true)
        }
        console.log(response, 'sss')
        return response.data;
    } catch (error) {
        console.log('error2', error);
        throw error;
    }
});

export const deliveryParnterUpdate = createAsyncThunk("store/deliveryParnterUpdate", async (formData) => {
    try {
        const response = await axios.post(WEBSITE_API_URL + "/delivery-parnter-update", formData);
        return response.data;
    } catch (error) {
        console.log('error2', error);
        throw error;
    }
});

// logout
export const logoutUser = createAsyncThunk("store/logoutUser", () => {
    try {
        const data = null;
        return data;
    } catch (error) {
        console.log('error3', error)
        throw error;
    }
});


const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        userCurrentTenant: (state, action) => {
            state.tenant = action.payload;
        },
        logoutUser: (state) => {
            state.user_data = [];
            state.isSuccess = false;
            state.contact = '';
        },
    },  
    extraReducers: {
        [loginDeliveryPartner.pending]: (state,) => {
            state.loading = true;
        },
        [loginDeliveryPartner.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user_data = payload;
            state.isSuccess = true;
        },
        [loginDeliveryPartner.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
        // user register
        [userRegister.pending]: (state,) => {
            state.loading = true;
        },
        [userRegister.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user_data = payload;
            state.isSuccess = true;
        },
        [userRegister.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },

        // user profile
        [getUserProfile.pending]: (state,) => {
            state.loading = true;
        },
        [getUserProfile.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user_data = payload;
            state.isSuccess = true;
        },
        [getUserProfile.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },


        [updateUserData.pending]: (state,) => {
            state.loading = true;
        },
        [updateUserData.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user_data = payload;
            state.isSuccess = true;
        },
        [updateUserData.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },


        [getUserData.pending]: (state,) => {
            state.loading = true;
        },
        [getUserData.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user_edit = payload;
            state.isSuccess = true;
        },
        [getUserData.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },


        [deliveryParnterRegister.pending]: (state,) => {
            state.loading = true;
        },
        [deliveryParnterRegister.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user_data = payload;
            state.isSuccess = true;
        },
        [deliveryParnterRegister.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },

        [deliveryParnterUpdate.pending]: (state,) => {
            state.loading = true;
        },
        [deliveryParnterUpdate.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user_data = payload;
            state.isSuccess = true;
        },
        [deliveryParnterUpdate.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },

    },
});


export const { userCurrentTenant } = userSlice.actions;

export default userSlice.reducer;
