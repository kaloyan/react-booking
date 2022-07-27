import styles from "./BookBox.module.css";

export default function PriceBox({ showReserve }) {
  return (
    <div className={styles["book-box"]}>
      <h1>Perfect for 5-night stay</h1>

      <span>Top Location: Highly rated by recent guests (9.0)</span>

      <h2>
        <b>$520</b> (5 nights)
      </h2>

      <button type="button" onClick={() => showReserve(true)}>
        Reserve room Now!
      </button>
    </div>
  );
}
