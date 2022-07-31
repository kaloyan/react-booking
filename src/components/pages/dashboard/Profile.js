import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { useRequest } from "../../../hooks/useRequest";

export default function Profile() {
  const handle = "account";
  const user = useRequest("user", handle);
  const data = useSelector((state) => state.responses[handle]);

  const counts = useRequest("user", "counts");
  const dataCount = useSelector((state) => state.responses["counts"]);

  useEffect(() => {
    user.get();
  }, []);

  useEffect(() => {
    if (data) {
      counts.counts(data.id);
    }
    return () => counts.cleaner();
  }, [data]);

  return (
    <section className={styles["grid-container"]}>
      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faIdCard} />
          <h1>My Profile</h1>
        </div>

        <div>
          <Link to={"edit"} className={styles["action-btn"]}>
            <span>Edit</span>
          </Link>
        </div>
      </div>

      <div className={styles["side"]}>
        <div>
          {data?.avatar ? (
            <img src={data.avatar} alt="avatar" className={styles["avatar"]} />
          ) : (
            <FontAwesomeIcon icon={faUser} className={styles["avatar"]} />
          )}
        </div>
      </div>

      <div className={styles["content"]}>
        <div className={styles["item"]}>
          <label>Username: </label>
          <span type="text">{data?.username}</span>
        </div>

        <div className={styles["item"]}>
          <label>Email: </label>
          <span type="email">{data?.email}</span>
        </div>

        <div className={styles["item"]}>
          <label>Phone number: </label>
          <span>{data?.phone || <em>Not specified</em>}</span>
        </div>

        <div className={styles["item"]}>
          <label>Address: </label>
          <span>{data?.address || <em>Not specified</em>}</span>
        </div>

        <div className={styles["item"]}>
          <label>Gender: </label>
          <span>{data?.gender || <em>Not specified</em>}</span>
        </div>

        <div className={styles["item"]}>
          <label>Birthday: </label>
          <span>{data?.birthday || <em>Not specified</em>}</span>
        </div>

        <hr />

        {data?.role === "admin" && (
          <div className={styles["item"]}>
            <label>Role: </label>
            <span>Administrator</span>
          </div>
        )}

        {data?.role === "user" && (
          <div className={styles["item"]}>
            <label>My reservations: </label>
            <span>{dataCount?.reservations}</span>
          </div>
        )}

        {data?.role === "owner" && (
          <div className={styles["item"]}>
            <label>My hotels: </label>
            <span>{dataCount?.hotels}</span>
          </div>
        )}
      </div>
    </section>
  );
}
