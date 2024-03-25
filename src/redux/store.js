import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './users'

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducers = combineReducers({
    userData: userReducer
});

const persistedReducer = persistReducer(persistConfig,reducers);

const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
});

export default Store