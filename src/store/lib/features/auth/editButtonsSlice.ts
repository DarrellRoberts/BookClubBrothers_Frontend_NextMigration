import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface EditButtonState {
  showImage: boolean
  showUsername: boolean
  showCountry: boolean
  showGenre: boolean
  showEdit: boolean
  showCreate: boolean
  isRefresh: boolean
}

const initialState: EditButtonState = {
  showImage: false,
  showUsername: false,
  showCountry: false,
  showGenre: false,
  showEdit: false,
  showCreate: false,
  isRefresh: false,
}

export const editButtonSlice = createSlice({
  name: "editButtons",
  initialState,
  reducers: {
    setShowImage: (state): void => {
      state.showImage = !state.showImage
    },
    setShowUsername: (state): void => {
      state.showUsername = !state.showUsername
    },
    setShowCountry: (state): void => {
      state.showCountry = !state.showCountry
    },
    setShowGenre: (state): void => {
      state.showGenre = !state.showGenre
    },
    setShowEdit: (state): void => {
      state.showEdit = !state.showEdit
    },
    setShowCreate: (state): void => {
      state.showCreate = !state.showCreate
    },
    setIsRefresh: (state, action: PayloadAction<boolean>): void => {
      state.isRefresh = action.payload
    },
  },
})

export const {
  setShowImage,
  setShowUsername,
  setShowCountry,
  setShowGenre,
  setShowEdit,
  setShowCreate,
  setIsRefresh,
} = editButtonSlice.actions
export const editButtonReducer = editButtonSlice.reducer
