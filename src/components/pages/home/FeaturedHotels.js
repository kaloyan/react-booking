import styles from "./FeaturedHotels.module.css";

import { useEffect, useId } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRequest } from "../../../hooks/useRequest";

export default function FeaturedHotels() {
  const handle = useId();
  const catalog = useRequest("catalog", handle);
  const data = useSelector((state) => state.responses[handle]);

  useEffect(() => {
    catalog.featuredHotels();
    return () => catalog.cleaner();
  }, []);

  return (
    <div className={styles["list"]}>
      {!data ? (
        <div>Loading please wait</div>
      ) : (
        <>
          {data.map((item) => (
            <div key={item._id} className={styles["item"]}>
              <img
                className={styles["image"]}
                src={item.pictures[0]}
                alt={item.type}
              />
              <span className={styles["name"]}>{item.name}</span>
              <span className={styles["city"]}>{item.city}</span>
              <span className={styles["price"]}>
                Starting from ${item.cheepestPrice}
              </span>

              <div className={styles["rating"]}>
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
