import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { storageTool } from "../../utils/helpers";

const favoritesKey = "catalog_favs";

const initialState = {
  favorites: storageTool.get(favoritesKey) || [],
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
  redirect: "",
};

export const localSlice = createSlice({
  name: "local",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      storageTool.set(favoritesKey, state.favorites);
    },

    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((x) => x !== action.payload);
      storageTool.set(favoritesKey, state.favorites);
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

    setRedirect: (state, action) => {
      state.redirect = action.payload;
    },

    removeRedirect: (state) => {
      state.redirect = "";
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  pushMessage,
  removeMessage,
  setSpinner,
  setFilters,
  setRedirect,
  removeRedirect,
} = localSlice.actions;

export default localSlice.reducer;
