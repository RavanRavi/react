import { configureStore } from "@reduxjs/toolkit";
import avatarReducer from "./slices/avatarSlice";

export const store = configureStore({
  reducer: {
    avatars: avatarReducer,
  },
});
