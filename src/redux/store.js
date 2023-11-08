import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./adminUserSlice"

export default configureStore({
    reducer:{
        user:userSlice
    }
})