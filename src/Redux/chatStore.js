import { configureStore } from "@reduxjs/toolkit";
import chatReducer from './chatSlice'
import authenticationReducer from './authenticationSlice'

export const chatStore = configureStore({
    reducer:{
        chat :chatReducer,
        authentication:authenticationReducer
    }
})