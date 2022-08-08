// useFavorites hook

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../features/slices/localSlice";

export const useFavorites = (id) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.local);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(favorites.some((x) => x === id));
  }, [id, favorites]);

  const save = () => {
    dispatch(addFavorite(id));
  };

  const remove = () => {
    dispatch(removeFavorite(id));
  };

  return { save, remove, isActive };
};
