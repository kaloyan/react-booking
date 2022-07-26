import { Link } from "react-router-dom";
import styles from "./SearchItem.module.css";

export default function SearchItem({ data }) {
  return (
    <div className={styles.item}>
      <img src={data.pictures[0]} alt={data.name} className={styles.image} />

      <div className={styles.description}>
        <h1 className={styles.title}>{data.name}</h1>

        <span className={styles.distance}>{data.distance}</span>
        <span className={styles.taxiOp}>Free airport taxi</span>
        <span className={styles.subtitle}>
          Studio aprtment with air conditioning
        </span>
        <span className={styles.features}>{data.description}</span>
        <span className={styles.cancelOp}>Free cancellation</span>
        <span className={styles.cancelSubtitle}>
          You can cancel later, so lock in this great price today
        </span>
      </div>

      <div className={styles.details}>
        <div className={styles.rating}>
          <span>Excellent</span>
          <button>{data.rating}</button>
        </div>

        <div className={styles.detailText}>
          <span className={styles.price}>${data.cheepestPrice}</span>
          <span className={styles.taxOps}>Includes taxes and fees</span>
          <Link to={`/catalog/${data._id}`}>
            <button className={styles.checkBtn}>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
