// Custom hook - useLoadContent

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setResult, setError } from "../features/filter/filterSlice";

export const useLoadContent = () => {
  const state = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return async () => {
    const url = "http://localhost:3000/api/v1/hotels";

    dispatch(setStatus("loading"));

    let query = "?limit=10";
    if (state.destination != "") query += `&city=${state.destination}`;
    if (state.minPrice > 0) query += `&min=${state.minPrice}`;
    if (state.maxPrice < 10000) query += `&max=${state.maxPrice}`;

    try {
      const response = await axios.get(url + query);
      dispatch(setResult(response.data));
      dispatch(setStatus("succeeded"));
    } catch (err) {
      dispatch(setError(err));
      dispatch(setStatus("failed"));
    }
  };
};
