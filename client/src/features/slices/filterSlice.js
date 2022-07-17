import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
  minPrice: "",
  maxPrice: "",
  results: {
    items: [],
    status: "idle", // 'idle, 'loading', 'succeeded', 'failed'
    error: null,
  },
  adults: 1,
  children: 0,
  rooms: 1,
  startDate: "",
  endDate: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    clearFilter: (state) => {
      state.destination = "";
      state.minPrice = 0;
      state.maxPrice = 10000;
      state.results.items = [];
      state.results.status = "idle";
      state.results.error = null;
      state.adults = 1;
      state.children = 0;
      state.rooms = 1;
      state.startDate = "";
      state.endDate = "";
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

    setStatus: (state, action) => {
      state.results.status = action.payload;
    },

    setError: (state, action) => {
      state.results.error = action.payload;
    },

    setResult: (state, action) => {
      state.results.items = action.payload;
    },
  },
});

export const {
  clearFilter,
  setDestination,
  setMinPrice,
  setMaxPrice,
  setAdults,
  setChildren,
  setRooms,
  setStartDate,
  setEndDate,
  setStatus,
  setError,
  setResult,
} = filterSlice.actions;

export default filterSlice.reducer;
