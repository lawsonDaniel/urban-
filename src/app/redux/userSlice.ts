import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  value: any
}

const initialState: UserState = {
  value: null,
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onLoginSuccess: (state, action: PayloadAction<string>) =>{
        state.value = action.payload
    },
    onLogout: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { onLoginSuccess,onLogout } = counterSlice.actions

export default counterSlice.reducer