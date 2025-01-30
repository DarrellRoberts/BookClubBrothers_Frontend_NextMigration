import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "./features/auth/tokenSlice";
import { editButtonReducer } from "./features/auth/editButtonsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { token: tokenReducer, editButtons: editButtonReducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
