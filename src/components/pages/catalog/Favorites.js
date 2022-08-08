import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRequest } from "../../../hooks/useRequest";
import CatalogItem from "./CatalogItem";
import styles from "./Favorites.module.css";

export default function Favorites() {
  const catalog = useRequest("catalog", "favorites");
  const { favorites } = useSelector((state) => state.local);
  const data = useSelector((state) => state.responses["favorites"]);

  useEffect(() => {
    if (favorites?.length > 0) {
      catalog.getFavs(favorites);
    }

    return () => catalog.cleaner();
  }, [favorites]);

  return (
    <div className={styles["list-container"]}>
      <h1>Your favorites hotels</h1>

      {data?.length > 0 && (
        <>
          {data.map((x) => (
            <CatalogItem key={x._id} data={x} />
          ))}
        </>
      )}
    </div>
  );
}
