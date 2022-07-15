import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./filter/filterSlice";
import accountSlice from "./account/accountSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    account: accountSlice,
  },
});
