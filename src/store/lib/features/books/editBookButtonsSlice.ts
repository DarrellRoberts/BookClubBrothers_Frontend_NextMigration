import { createSlice } from "@reduxjs/toolkit";

export interface EditBookButtonState {
  showDelete: boolean;
  showAuthor: boolean;
  showPublish: boolean;
  showPage: boolean;
  showDate: boolean;
  showGenre: boolean;
  showTitle: boolean;
  showBookImage: boolean;
}

const initialState: EditBookButtonState = {
  showDelete: false,
  showAuthor: false,
  showPublish: false,
  showPage: false,
  showDate: false,
  showGenre: false,
  showTitle: false,
  showBookImage: false,
};

export const editBookButtonSlice = createSlice({
  name: "editBookButtons",
  initialState,
  reducers: {
    setShowDelete: (state): void => {
      state.showDelete = !state.showDelete;
    },
    setShowAuthor: (state): void => {
      state.showAuthor = !state.showAuthor;
    },
    setShowPublish: (state): void => {
      state.showPublish = !state.showPublish;
    },
    setShowPage: (state): void => {
      state.showPage = !state.showPage;
    },
    setShowDate: (state): void => {
      state.showDate = !state.showDate;
    },
    setShowGenre: (state): void => {
      state.showGenre = !state.showGenre;
    },
    setShowTitle: (state): void => {
      state.showTitle = !state.showTitle;
    },
    setShowBookImage: (state): void => {
      state.showBookImage = !state.showBookImage;
    },
  },
});

export const {
  setShowDelete,
  setShowAuthor,
  setShowPublish,
  setShowPage,
  setShowDate,
  setShowGenre,
  setShowTitle,
  setShowBookImage,
} = editBookButtonSlice.actions;
export const editBookButtonReducer = editBookButtonSlice.reducer;
