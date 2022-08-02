import { configureStore } from "@reduxjs/toolkit";

import localSlice from "./slices/localSlice";
import responsesSlice from "./slices/responsesSlice";

export const store = configureStore({
  reducer: {
    local: localSlice,
    responses: responsesSlice,
  },
});
