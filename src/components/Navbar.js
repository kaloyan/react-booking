import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <span className={styles.logo}>Travel Agency</span>

        <ul className={styles.navItems}>
          <li className={styles.item}>
            <NavLink to={"/login"} className={styles.navLink}>
              Login
            </NavLink>
          </li>

          <li className="item">
            <NavLink to={"/login"} className={styles.navLink}>
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
