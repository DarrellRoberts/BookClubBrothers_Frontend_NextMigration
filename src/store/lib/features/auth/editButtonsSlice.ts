import { createSlice } from "@reduxjs/toolkit";

export interface EditButtonState {
  showImage: boolean;
  showUsername: boolean;
  showCountry: boolean;
  showGenre: boolean;
}

const initialState: EditButtonState = {
  showImage: false,
  showUsername: false,
  showCountry: false,
  showGenre: false,
};

export const editButtonSlice = createSlice({
  name: "editButtons",
  initialState,
  reducers: {
    setShowImage: (state): void => {
      state.showImage = !state.showImage;
    },
    setShowUsername: (state): void => {
      state.showUsername = !state.showUsername;
    },
    setShowCountry: (state): void => {
      state.showCountry = !state.showCountry;
    },
    setShowGenre: (state): void => {
      state.showGenre = !state.showGenre;
    },
  },
});

export const { setShowImage, setShowUsername, setShowCountry, setShowGenre } =
  editButtonSlice.actions;
export const editButtonReducer = editButtonSlice.reducer;
