import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  role: "guest",
  messages: [],
  status: "idle",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },

    logout: (state) => {
      state.username = "";
      state.email = "";
      state.role = "guest";
      state.status = "idle";
      state.messages = [];
    },
  },
});

export const { setAccount, logout } = accountSlice.actions;

export default accountSlice.reducer;
