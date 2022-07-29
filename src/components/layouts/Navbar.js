import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAccount } from "../../services/netRequest";
import { setAccount } from "../../features/slices/accountSlice";
import AccountTool from "../ui/AccountTool";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookAtlas } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { username, email, avatar } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAcount = async () => {
      const response = await getAccount();
      dispatch(setAccount(response));
    };

    checkAcount();
  }, []);

  const setActive = ({ isActive }) => (isActive ? styles.activeLink : "");

  const [menuStyle, setMenuStyle] = useState(styles["navbar"]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (window.scrollY < 106) {
        setMenuStyle(styles["navbar"]);
      } else if (window.scrollY < 500) {
        setMenuStyle(`${styles["navbar"]} ${styles["hiden"]}`);
      } else {
        setMenuStyle(`${styles["navbar"]} ${styles["sticky"]}`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={menuStyle}>
      <div className={styles["nav-container"]}>
        <div className={styles["brand"]}>
          <NavLink to={"/"}>
            <FontAwesomeIcon icon={faBookAtlas} />
            <span className={styles["logo"]}>ReactBooking</span>
          </NavLink>
        </div>

        <ul className={styles["navItems"]}>
          {username ? (
            <AccountTool user={{ username, email, avatar }} />
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
