import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookFormData {
  author: string;
  title: string;
  yearPublished: number;
  pages: number;
  imageURL: string;
  genre: string[];
}

export interface RandomiseEditState {
  formData: BookFormData;
}

const initialState: RandomiseEditState = {
  formData: {
    author: "",
    title: "",
    yearPublished: 0,
    pages: 0,
    imageURL: "",
    genre: [],
  },
};

export const randomiseEditSlice = createSlice({
  name: "randomiseEdit",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<BookFormData>): void => {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = randomiseEditSlice.actions;
export const randomiseEditReducer = randomiseEditSlice.reducer;
