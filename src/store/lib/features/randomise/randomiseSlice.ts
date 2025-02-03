import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RandomiseState {
  showRandom: boolean;
  index: number;
}

const initialState: RandomiseState = {
  showRandom: true,
  index: 0,
};

export const randomiseSlice = createSlice({
  name: "randomise",
  initialState,
  reducers: {
    setShowRandom: (state): void => {
      state.showRandom = !state.showRandom;
    },
    setIndex: (state, action: PayloadAction<number>): void => {
      state.index = action.payload;
    },
  },
});

export const { setShowRandom, setIndex } = randomiseSlice.actions;
export const randomiseReducer = randomiseSlice.reducer;
