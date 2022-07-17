import styles from "./FeaturedHotels.module.css";
import { useEffect, useState } from "react";
import { featuredHotels } from "../../services/netReq";

export default function FeaturedHotels() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await featuredHotels();
      setData(response);
    };

    getData();
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
