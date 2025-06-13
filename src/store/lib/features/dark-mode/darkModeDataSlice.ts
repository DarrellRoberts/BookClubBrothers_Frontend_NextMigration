import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  darkMode: false,
}

export const darkModeDataSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>): void => {
      state.darkMode = action.payload
    },
  },
})

export const { setDarkMode } = darkModeDataSlice.actions
export const darkModeReducer = darkModeDataSlice.reducer
