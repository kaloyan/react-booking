import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const responsesSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    setResponse: (state, action) => {
      state[action.payload.handle] = action.payload.data;
    },

    delResponse: (state, action) => {
      delete state[action.payload];
    },
  },
});

export const { setResponse, delResponse } = responsesSlice.actions;

export default responsesSlice.reducer;
