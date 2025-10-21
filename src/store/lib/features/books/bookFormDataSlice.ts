import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ShortBook, type Book } from "@/types/BookInterface"

export interface BookState {
  formData: Book
  anthologyFormData: ShortBook
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
      rating: 0,
    },
    title: "",
    yearPublished: 0,
  },
  anthologyFormData: {
    shortStories: [
      {
        scoreRatings: {
          raterId: [],
          rating: [],
        },
        commentInfo: {
          commentId: [],
          comments: [],
        },
        parentId: null,
        title: "",
        author: "",
        pages: 0,
        _id: null,
      },
    ],
  },
}

export const bookFormDataSlice = createSlice({
  name: "bookFormData",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Book>): void => {
      state.formData = action.payload
    },
  },
})

export const { setFormData } = bookFormDataSlice.actions
export const bookFormDataReducer = bookFormDataSlice.reducer
