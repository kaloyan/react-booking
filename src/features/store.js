import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./slices/filterSlice";
import accountSlice from "./slices/accountSlice";
import localSlice from "./slices/localSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    account: accountSlice,
    local: localSlice,
  },
});
