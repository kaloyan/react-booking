import { Link } from "react-router-dom";
import styles from "./CatalogItem.module.css";

export default function CatalogItem({ data: item }) {
  return (
    <div className={styles["item"]}>
      <div>
        <img
          src={item.pictures[0]}
          alt={item.name}
          className={styles["image"]}
        />

        <div className={styles["rating"]}>
          Rating: <span>{item.rating >= 4 ? "Excellent" : "Good"}</span>
          <button>{item.rating}</button>
        </div>
      </div>

      <div className={styles["description"]}>
        <h2 className={styles["title"]}>{item.name}</h2>
        <h3>
          {item.city}, {item.country}
        </h3>

        <span className={styles["cancel-subtitle"]}>
          You can cancel later, so lock in this great price today
        </span>

        <div>
          <span className={styles["features"]}>
            {item.description.substring(0, 400)} ...
            <Link to={`/catalog/${item._id}`}> see more</Link>
          </span>
        </div>
      </div>

      <div className={styles["details"]}>
        <div className={styles["detail-text"]}>
          <span className={styles["price"]}>${item.cheepestPrice}</span>
          <span className={styles["tax-ops"]}>Includes taxes and fees</span>
        </div>

        <div>
          <Link to={`/catalog/${item._id}`}>
            <button className={styles["check-btn"]}>
              See rooms availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
