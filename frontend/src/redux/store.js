import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobSlice from "./jobslice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const customStorage = {
    getItem: (key) => {
        return Promise.resolve(window.localStorage.getItem(key));
    },
    setItem: (key, value) => {
        window.localStorage.setItem(key, value);
        return Promise.resolve(value);
    },
    removeItem: (key) => {
        window.localStorage.removeItem(key);
        return Promise.resolve();
    }
};

const authPersistConfig = {
    key: 'auth',
    storage: customStorage,
    blacklist: ['loading'] 
};

// Root config
const rootPersistConfig = {
    key: 'root',
    version: 1,
    storage: customStorage,
    blacklist: ['auth'] 
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer), 
    job: jobSlice,
    company: companySlice,
    application: applicationSlice
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;