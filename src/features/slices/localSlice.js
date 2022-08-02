import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  favorites: [],
  messages: [],
  showSpinner: false,
  filters: {
    destination: "",
    minRating: "",
    properyType: "",
    maxPrice: "",
    limit: 8,
    offset: 0,
  },
};

export const localSlice = createSlice({
  name: "local",
  initialState,
  reducers: {
    getFavorites: (state) => {
      try {
        const favString = localStorage.getItem("bookink_favs");

        if (favString) {
          state.favorites = JSON.parse(favString);
        } else {
          state.favorites = [];
        }
      } catch (err) {
        console.log(err);
      }
    },

    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      localStorage.setItem("bookink_favs", JSON.stringify(state.favorites));
    },

    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((x) => x.id !== action.payload);
      localStorage.setItem("bookink_favs", JSON.stringify(state.favorites));
    },

    pushMessage: (state, action) => {
      state.messages.push({
        id: uuid(),
        text: action.payload.text,
        type: action.payload.type,
      });
    },

    removeMessage: (state, action) => {
      state.messages = state.messages.filter((x) => x.id !== action.payload);
    },

    setSpinner: (state, action) => {
      state.showSpinner = action.payload;
    },

    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const {
  getFavorites,
  addFavorite,
  removeFavorite,
  pushMessage,
  removeMessage,
  setSpinner,
  setFilters,
} = localSlice.actions;

export default localSlice.reducer;
