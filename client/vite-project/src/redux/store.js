import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import questionReducer from './questionSlice';
import examReducer from './examSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        questions: questionReducer,
        exams: examReducer,
    },
});

export default store;