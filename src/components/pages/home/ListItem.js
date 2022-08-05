import { Link } from "react-router-dom";
import styles from "./ListItem.module.css";

export default function ListItem({ item }) {
  return (
    <div className={styles["list-item"]}>
      <Link to={`/catalog/${item._id}`}>
        <div className={styles["header"]}>
          <img
            className={styles["image"]}
            src={item.pictures[0]}
            alt={item.type}
          />
        </div>

        <div className={styles["content"]}>
          <span className={styles["name"]}>{item.name}</span>

          <div>
            <div className={styles["price"]}>
              Prices from <span>${item.cheepestPrice}</span>
            </div>

            <div className={styles["rating"]}>
              <span>{item.rating >= 4 ? "Excellent" : "Good"}</span>
              <button>{item.rating}</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
