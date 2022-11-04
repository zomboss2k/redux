// Nơi đây để quản lý states quản lý thông tin

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
