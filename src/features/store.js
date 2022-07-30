import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./slices/filterSlice";
import accountSlice from "./slices/accountSlice";
import localSlice from "./slices/localSlice";
import responsesSlice from "./slices/responsesSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    account: accountSlice,
    local: localSlice,
    responses: responsesSlice,
  },
});
