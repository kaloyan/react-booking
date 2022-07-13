import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
  minPrice: 0,
  maxPrice: 10000,
  results: [],
  adults: 1,
  children: 0,
  rooms: 1,
  startDate: null,
  endDate: null,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    clearFilter: (state) => {
      state.destination = "";
      state.minPrice = 0;
      state.maxPrice = 10000;
      state.results = [];
      state.adults = 1;
      state.children = 0;
      state.rooms = 1;
      state.startDate = null;
      state.endDate = null;
    },

    setDestination: (state, action) => {
      state.destination = action.payload;
    },

    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },

    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },

    setAdults: (state, action) => {
      state.adults = action.payload < 1 ? 1 : action.payload;
    },

    setChildren: (state, action) => {
      state.children = action.payload < 0 ? 0 : action.payload;
    },

    setRooms: (state, action) => {
      state.rooms = action.payload < 1 ? 1 : action.payload;
    },

    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },

    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },

    getResults: async (state) => {
      //todo
      // console.log("fetch results from server");
      // console.log(state);
    },
  },
});

export const {
  clearFilter,
  setDestination,
  setMinPrice,
  setMaxPrice,
  getResults,
  setAdults,
  setChildren,
  setRooms,
  setStartDate,
  setEndDate,
} = filterSlice.actions;

export default filterSlice.reducer;
