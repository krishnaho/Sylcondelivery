import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./store/userReducer";
import orderReducer from "./store/orderReducer";
import cityReducer from "./store/cityReducer";
import profileReducer from "./store/profileReducer";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const reducers = combineReducers({
    user: userReducer,
    order: orderReducer,
    city: cityReducer,
    profile: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware(),
});

export const persistor = persistStore(store);
