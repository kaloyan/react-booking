import styles from "./Reserve.module.css";

export default function Progress({ state }) {
  return (
    <div className={styles["step-row"]}>
      <div className={styles["progress"]} style={{ width: state[0] }}></div>

      <div className={styles["step-col"]}>
        <span className={styles[state[1]]}>Dates</span>
      </div>
      <div className={styles["step-col"]}>
        <span className={styles[state[2]]}>Rooms</span>
      </div>
      <div className={styles["step-col"]}>
        <span className={styles[state[3]]}>Checkout</span>
      </div>
    </div>
  );
}
