// useFavorites hook

import { storageTool } from "../utils/helpers";

export const useFavorites = () => {
  //todo

  const getSaved = () => {
    const myFavorites = storageTool.get("favorites");

    //todo
  };

  const checkCurrent = (id) => {
    //todo
  };

  const save = (id) => {
    //todo
  };

  const load = (items) => {
    //todo
  };

  return { getSaved, checkCurrent, save, load };
};
