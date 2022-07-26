import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  email: "",
  role: "guest",
  messages: [],
  address: "",
  avatar: "",
  gender: "",
  createdAt: "",
  updatedAt: "",
  phone: "",
  hotels: [],
  reservations: [],
  status: "loggedout",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.messages = action.payload.messages;
      state.address = action.payload.address;
      state.avatar = action.payload.avatar;
      state.gender = action.payload.gender;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.phone = action.payload.phone;
      state.hotels = action.payload.hotels;
      state.reservations = action.payload.reservations;
      state.status = "loggedin";
    },

    logout: (state) => {
      state.username = "";
      state.email = "";
      state.role = "guest";
      state.status = "loggedout";
      state.messages = [];
      state.address = "";
      state.avatar = "";
      state.gender = "";
      state.createdAt = "";
      state.updatedAt = "";
      state.phone = "";
      state.hotels = "";
      state.reservations = "";
    },
  },
});

export const { setAccount, logout } = accountSlice.actions;

export default accountSlice.reducer;
