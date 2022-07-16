import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./slices/filterSlice";
import accountSlice from "./slices/accountSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    account: accountSlice,
  },
});
