import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import commentsSlice from "./commentsSlice";
import newsSlice from "./newsSlice";

const rootReducer = combineReducers({
    news: newsSlice,
    comments: commentsSlice,
})

export const store = configureStore({
    reducer: rootReducer
})