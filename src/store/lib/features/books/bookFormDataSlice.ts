import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type Book } from "@/types/BookInterface";

export interface BookState {
  formData: Book;
}

const initialState: BookState = {
  formData: {
    author: "",
    commentInfo: {
      comments: [],
    },
    dateOfMeeting: "",
    actualDateOfMeeting: "",
    reviewImageURL: "",
    genre: [],
    imageURL: "",
    pages: 0,
    read: false,
    scoreRatings: {
      rating: [],
    },
    title: "",
    yearPublished: 0,
  },
};

export const bookFormDataSlice = createSlice({
  name: "bookFormData",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Book>): void => {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = bookFormDataSlice.actions;
export const bookFormDataReducer = bookFormDataSlice.reducer;
