import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "./features/auth/tokenSlice";
import { editButtonReducer } from "./features/auth/editButtonsSlice";
import { randomiseReducer } from "./features/randomise/randomiseSlice";
import { editBookButtonReducer } from "./features/books/editBookButtonsSlice";
import { bookFormDataReducer } from "./features/books/bookFormDataSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      token: tokenReducer,
      editButtons: editButtonReducer,
      randomise: randomiseReducer,
      editBookButtons: editBookButtonReducer,
      bookFormData: bookFormDataReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
