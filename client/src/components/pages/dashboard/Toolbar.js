import styles from "./Toolbar.module.css";
import { NavLink } from "react-router-dom";

export default function Toolbar() {
  const setActive = ({ isActive }) => (isActive ? styles.activeLink : "");

  return (
    <section className={styles["container"]}>
      <ul className={styles["menu"]}>
        <li>
          <NavLink to={"profile"} className={setActive}>
            Account
          </NavLink>
        </li>
        <li>
          <NavLink to={"messages"} className={setActive}>
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink to={"users"} className={setActive}>
            All Users
          </NavLink>
        </li>
        <li>
          <NavLink to={"reservations"} className={setActive}>
            Reservations
          </NavLink>
        </li>
        <li>
          <NavLink to={"my-hotels"} className={setActive}>
            My hotels
          </NavLink>
        </li>
        <li>
          <NavLink to={"add-hotel"} className={setActive}>
            Add new hotel
          </NavLink>
        </li>
        <li>
          <NavLink to={"destinations"} className={setActive}>
            Destinations
          </NavLink>
        </li>
        <li>
          <NavLink to={"my-reservations"} className={setActive}>
            My reservations
          </NavLink>
        </li>
      </ul>
    </section>
  );
}
