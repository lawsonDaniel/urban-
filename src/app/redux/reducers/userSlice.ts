"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: any;
}

const initialState: UserState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onLoginSuccess: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    onLogout: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { onLoginSuccess, onLogout } = userSlice.actions;

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
