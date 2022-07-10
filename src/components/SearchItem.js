import styles from "./SearchItem.module.css";

export default function SearchItem() {
  return (
    <div className={styles.item}>
      <img
        src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="hotel"
        className={styles.image}
      />

      <div className={styles.description}>
        <h1 className={styles.title}>Tower Street Apartments</h1>

        <span className={styles.distance}>500m from center</span>
        <span className={styles.taxiOp}>Free airport taxi</span>
        <span className={styles.subtitle}>
          Studio aprtment with air conditioning
        </span>
        <span className={styles.features}>
          Entire studio * 1 bedroom * 23 sm2 * 1 full bde
        </span>
        <span className={styles.cancelOp}>Free cancellation</span>
        <span className={styles.cancelSubtitle}>
          You can cancel later, so lock in this great price today
        </span>
      </div>

      <div className={styles.details}>
        <div className={styles.rating}>
          <span>Excellent</span>
          <button>4.9</button>
        </div>

        <div className={styles.detailText}>
          <span className={styles.price}>$120</span>
          <span className={styles.taxOps}>Includes taxes and fees</span>
          <button className={styles.checkBtn}>See availability</button>
        </div>
      </div>
    </div>
  );
}
