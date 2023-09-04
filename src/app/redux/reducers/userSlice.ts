import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  authUser: any;
  setAuthType:any;
  
}

const initialState: IAuthState = {
  authUser: {},
  setAuthType: {}
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      state.authUser = action.payload;
    },
    setAuthType: (state, action: PayloadAction<any>) => {
      state.setAuthType = action.payload;
    },
    deAuth: (state, action: PayloadAction<any>) => {
      state.authUser = null;
      state.setAuthType = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, deAuth, setAuthType } = authSlice.actions;

export const authReducer = authSlice.reducer;