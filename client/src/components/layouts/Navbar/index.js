import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAccount, doLogout } from "../../../services/netReq";
import { setAccount, logout } from "../../../features/account/accountSlice";

export default function Navbar() {
  const { username, email } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAcount = async () => {
      const response = await getAccount();
      // console.log(response);
      dispatch(setAccount(response));
    };

    checkAcount();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    await doLogout();
    dispatch(logout());
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to={"/"}>
          <span className={styles.logo}>Travel Agency</span>
        </NavLink>

        <ul className={styles.navItems}>
          {username ? (
            <>
              <li className={styles.item}>
                <NavLink
                  to={"/"}
                  onClick={handleLogout}
                  className={styles.navLink}
                >
                  {username} [{email}]
                </NavLink>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
