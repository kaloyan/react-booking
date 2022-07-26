import styles from "./Modal.module.css";

export default function Modal(props) {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["dialog"]}>
        <div>{props.message}</div>

        <div className={styles["controls"]}>
          <button type="button" onClick={props.acceptHandler}>
            Yes
          </button>
          <button type="button" onClick={props.closeHandler}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
