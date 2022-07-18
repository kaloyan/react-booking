import styles from "./Forms.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const { username, email, role } = useSelector((state) => state.account);

  const [formState, setFormState] = useState(false);
  const [cUsername, setcUsername] = useState(username);
  const [cEmail, setcEmail] = useState(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("save changes");
  };

  return (
    <section className={styles["container"]}>
      <h1>My Profile</h1>

      <form className={styles["form"]} onSubmit={handleSubmit}>
        <div className={styles["row"]}>
          <div className={styles["item"]}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={cUsername}
              onChange={(e) => setcUsername(e.target.value)}
            />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              value={cEmail}
              onChange={(e) => setcEmail(e.target.value)}
            />
          </div>
        </div>

        <div className={styles["row"]}>
          <div className={styles["item"]}>
            <label htmlFor="phone">Phone number: </label>
            <input type="tel" id="phone" />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="address">Address: </label>
            <input type="address" id="address" />
          </div>
        </div>

        <div className={styles["row"]}>
          <div className={styles["item"]}>
            <label htmlFor="gender">Gender: </label>
            <select name="gender" id="gender">
              <option value="">-- Prefet not to say --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className={styles["row"]}>
          <div className={styles["item"]}>
            {/* <img src="" alt="" /> */}
            <FontAwesomeIcon icon={faUser} className={styles["avatar"]} />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="avatar">Profile picture: </label>
            <input type="file" id="avatar" />
          </div>
        </div>

        <hr />
        <div className={styles["row"]}>
          <h4>Change password</h4>
        </div>

        <div className={styles["row"]}>
          <div className={styles["item"]}>
            <label htmlFor="oldpass">Current password </label>
            <input type="password" id="oldpass" />
          </div>
        </div>

        <div className={styles["row"]}>
          <div className={styles["item"]}>
            <label htmlFor="newpass">New password </label>
            <input type="password" id="newpass" />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="repass">Repeat new password </label>
            <input type="password" id="repass" />
          </div>
        </div>

        <hr />

        <div className={styles["row"]}>
          <div className={styles["item"]}>
            <input type="submit" value="Save settings" disabled={!formState} />
          </div>
        </div>

        <hr />
        <div className={styles["row"]}>
          <h4>Danger zone</h4>
        </div>

        <div className={styles["row"]}>
          <div className={styles["item"]}>
            <input
              type="button"
              className={styles["delete"]}
              value="Delete account"
            />
          </div>
        </div>
      </form>
    </section>
  );
}
