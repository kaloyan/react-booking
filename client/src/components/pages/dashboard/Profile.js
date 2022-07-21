import styles from "./Dashboard.module.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const account = useSelector((state) => state.account);

  return (
    <section className={styles["grid-container"]}>
      <div className={styles["header"]}>
        <h1>My Profile</h1>
        <div>
          <NavLink to={"edit"} className={styles["action-btn"]}>
            <span>Edit</span>
          </NavLink>
        </div>
      </div>

      <div className={styles["side"]}>
        <div>
          {account.avatar ? (
            <img
              src={account.avatar}
              alt="avatar"
              className={styles["avatar"]}
            />
          ) : (
            <FontAwesomeIcon icon={faUser} className={styles["avatar"]} />
          )}
        </div>
      </div>

      <div className={styles["content"]}>
        <div className={styles["item"]}>
          <label>Username: </label>
          <span type="text">{account.username}</span>
        </div>

        <div className={styles["item"]}>
          <label>Email: </label>
          <span type="email">{account.email}</span>
        </div>

        <div className={styles["item"]}>
          <label>Phone number: </label>
          <span>{account.phone || <em>Not specified</em>}</span>
        </div>

        <div className={styles["item"]}>
          <label>Address: </label>
          <span>{account.address || <em>Not specified</em>}</span>
        </div>

        <div className={styles["item"]}>
          <label>Gender: </label>
          <span>{account.gender || <em>Not specified</em>}</span>
        </div>

        <hr />

        {account.role == "admin" && (
          <div className={styles["item"]}>
            <label>Role: </label>
            <span>Administrator</span>
          </div>
        )}

        {account.role == "user" && (
          <div className={styles["item"]}>
            <label>My reservations: </label>
            <span>{account.reservations.length}</span>
          </div>
        )}

        {account.role == "owner" && (
          <div className={styles["item"]}>
            <label>My hotels: </label>
            <span>{account.hotels.length}</span>
          </div>
        )}
      </div>
    </section>
  );
}
