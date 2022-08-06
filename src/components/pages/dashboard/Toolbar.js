import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Toolbar.module.css";

export default function Toolbar() {
  const { account } = useSelector((state) => state.responses);
  const [role, setRole] = useState(account);

  useEffect(() => {
    if (account?.role) setRole(account.role);
  }, [account]);

  const setActive = ({ isActive }) => (isActive ? styles.activeLink : "");

  return (
    <section className={styles["container"]}>
      <ul className={styles["menu"]}>
        <li>
          <NavLink to={"profile"} className={setActive}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to={"messages"} className={setActive}>
            Messages
          </NavLink>
        </li>

        {role === "admin" && (
          <>
            <li>
              <NavLink to={"users"} className={setActive}>
                All Users
              </NavLink>
            </li>

            <li>
              <NavLink to={"destinations"} className={setActive}>
                Destinations
              </NavLink>
            </li>
          </>
        )}

        {role === "owner" && (
          <>
            <li>
              <NavLink to={"hotels"} className={setActive}>
                My hotels
              </NavLink>
            </li>

            <li>
              <NavLink to={"reservations"} className={setActive}>
                Reservations
              </NavLink>
            </li>
          </>
        )}

        {role === "user" && (
          <>
            <li>
              <NavLink to={"reservations"} className={setActive}>
                My reservations
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </section>
  );
}
