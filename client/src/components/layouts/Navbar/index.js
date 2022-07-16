import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAccount } from "../../../services/netReq";
import { setAccount } from "../../../features/account/accountSlice";
import AccountTool from "../../ui/AccountTool";

export default function Navbar() {
  const { username, email } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAcount = async () => {
      const response = await getAccount();
      dispatch(setAccount(response));
    };

    checkAcount();
  }, []);

  const setActive = ({ isActive }) => (isActive ? styles.activeLink : "");

  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to={"/"}>
          <span className={styles.logo}>Travel Agency</span>
        </NavLink>

        <ul className={styles.navItems}>
          {username ? (
            <AccountTool username={username} email={email} />
          ) : (
            <>
              <li>
                <NavLink to={"/login"} className={setActive}>
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink to={"/register"} className={setActive}>
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
