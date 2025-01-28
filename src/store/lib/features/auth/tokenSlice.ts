import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TokenState {
  tokenState: string | null;
}

const initialState: TokenState = {
  tokenState: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setTokenState: (state, action: PayloadAction<string>): void => {
      state.tokenState = action.payload;
    },
    removeToken: (state): void => {
      state.tokenState = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setTokenState, removeToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
