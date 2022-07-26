import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAccount, getUserCounts } from "../../../services/netRequest";

export default function Profile() {
  const [user, setUser] = useState({});
  const [hotelsCount, setHotelsCount] = useState(0);
  const [reservationsCount, setReservationsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAccount();
      setUser(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      if (user?.role == "owner" || user?.role == "user") {
        const response = await getUserCounts(user.id);
        setHotelsCount(response.hotels);
        setReservationsCount(response.reservations);
      }
    };

    fetchCount();
  }, [user]);

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
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className={styles["avatar"]} />
          ) : (
            <FontAwesomeIcon icon={faUser} className={styles["avatar"]} />
          )}
        </div>
      </div>

      <div className={styles["content"]}>
        <div className={styles["item"]}>
          <label>Username: </label>
          <span type="text">{user.username}</span>
        </div>

        <div className={styles["item"]}>
          <label>Email: </label>
          <span type="email">{user.email}</span>
        </div>

        <div className={styles["item"]}>
          <label>Phone number: </label>
          <span>{user.phone || <em>Not specified</em>}</span>
        </div>

        <div className={styles["item"]}>
          <label>Address: </label>
          <span>{user.address || <em>Not specified</em>}</span>
        </div>

        <div className={styles["item"]}>
          <label>Gender: </label>
          <span>{user.gender || <em>Not specified</em>}</span>
        </div>

        <div className={styles["item"]}>
          <label>Birthday: </label>
          <span>{user.birthday || <em>Not specified</em>}</span>
        </div>

        <hr />

        {user.role === "admin" && (
          <div className={styles["item"]}>
            <label>Role: </label>
            <span>Administrator</span>
          </div>
        )}

        {user.role === "user" && (
          <div className={styles["item"]}>
            <label>My reservations: </label>
            <span>{reservationsCount}</span>
          </div>
        )}

        {user.role === "owner" && (
          <div className={styles["item"]}>
            <label>My hotels: </label>
            <span>{hotelsCount}</span>
          </div>
        )}
      </div>
    </section>
  );
}
