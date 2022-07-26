import styles from "./Dashboard.module.css";

export default function UsersList() {
  return (
    <div className={styles["grid-container"]}>
      <div className={styles["header"]}>
        <h1>Manage users</h1>
      </div>

      <div className={styles["table"]}>
        <div>users</div>
      </div>
    </div>
  );
}
