import styles from "./FeaturedHotels.module.css";

import { useFetch } from "../../hooks/useFetch.js";

export default function FeaturedHotels() {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/v1/hotels?featured=true&limit=3"
  );

  return (
    <div className={styles.list}>
      {loading ? (
        <div>Loading please wait</div>
      ) : (
        <>
          {data.map((item) => (
            <div key={item._id} className={styles.item}>
              <img
                className={styles.image}
                src={item.pictures[0]}
                alt={item.type}
              />
              <span className={styles.name}>{item.name}</span>
              <span className={styles.city}>{item.city}</span>
              <span className={styles.price}>
                Starting from ${item.cheepestPrice}
              </span>

              <div className={styles.rating}>
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
