import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export default function UsersList() {
  return (
    <div className={styles["grid-container"]}>
      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faUsers} />

          <h1>Manage users</h1>
        </div>
      </div>

      <div className={styles["table"]}>
        <div>users</div>
      </div>
    </div>
  );
}
