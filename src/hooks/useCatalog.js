import { useDispatch } from "react-redux";
import { useRequest } from "./useRequest";
import { useSearchParams } from "react-router-dom";
import { setFilters } from "../features/slices/localSlice";

export const useCatalog = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const catalog = useRequest("catalog", "catalog");
  const dispatch = useDispatch();

  const query = async () => {
    const destination = searchParams.get("dest");
    const maxPrice = searchParams.get("price");
    const minRating = searchParams.get("rating");
    const properyType = searchParams.get("type");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    const params = {};
    if (destination) params.dest = destination;
    if (maxPrice) params.price = maxPrice;
    if (minRating) params.rating = minRating;
    if (properyType) params.type = properyType;
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;

    const queryString = new URLSearchParams(params).toString();
    const query = encodeURI(`query?${queryString}`);

    const res = await catalog.filter(query);

    if (res) {
      dispatch(
        setFilters({
          destination: destination || "",
          minRating: minRating || "",
          properyType: properyType || "",
          maxPrice: maxPrice || "",
          limit: limit || 8,
          offset: offset || 0,
        })
      );

      return query;
    } else {
      return false;
    }
  };

  return { query };
};
