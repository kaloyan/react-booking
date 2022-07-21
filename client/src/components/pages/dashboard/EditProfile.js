import styles from "./Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { uploadAvatar } from "../../../services/firebaseSrv";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const account = useSelector((state) => state.account);

  const [username, setUsername] = useState(account.username);
  const [email, setEmail] = useState(account.email);
  const [avatar, setAvatar] = useState(account.avatar);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (avatar !== null) {
      const result = await uploadAvatar(avatar);
      console.log(result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className={styles["grid-container"]}>
        <div className={styles["header"]}>
          <h1>Edit Profile</h1>

          <div>
            <NavLink to={"../profile"} className={styles["action-btn"]}>
              <span>Cancel</span>
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
          <div>
            <label htmlFor="avatar" className={styles["file-upload"]}>
              Upload picture
            </label>
            <input
              type="file"
              id="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
        </div>

        <div className={styles["content"]}>
          <div className={styles["item"]}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="phone">Phone number: </label>
            <input type="tel" id="phone" />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="address">Address: </label>
            <input type="address" id="address" />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="gender">Gender: </label>
            <select name="gender" id="gender">
              <option value="">-- Prefer not to say --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <hr />

          <h4>Change password</h4>

          <div></div>

          <div className={`${styles["item"]}`}>
            <label htmlFor="oldpass">Current password </label>
            <input type="password" id="oldpass" />
          </div>

          <div></div>

          <div className={styles["item"]}>
            <label htmlFor="newpass">New password </label>
            <input type="password" id="newpass" />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="repass">Repeat new password </label>
            <input type="password" id="repass" />
          </div>

          <hr />

          <div className={styles["item"]}>
            <input type="submit" value="Save settings" />
          </div>

          <hr />

          <h4>Danger zone</h4>
          <div></div>
          <div className={styles["item"]}>
            <input
              type="button"
              className={styles["delete-btn"]}
              value="Delete account"
            />
          </div>

          <p>* Account cannot be restored</p>
        </div>
      </section>
    </form>
  );
}
