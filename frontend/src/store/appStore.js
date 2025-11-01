import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/store-slices/userSlice";

export const store = configureStore({
    reducer: {
        userReducer
    }
});