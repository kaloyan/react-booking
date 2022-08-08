import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "./Navbar.module.css";
import AccountTool from "../ui/AccountTool";
import FavoriteBox from "../ui/FavoriteBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookAtlas } from "@fortawesome/free-solid-svg-icons";
import { useRequest } from "../../hooks/useRequest";

export default function Navbar() {
  const [menuStyle, setMenuStyle] = useState(styles["navbar"]);

  const handle = "account";
  const user = useRequest("user", handle);
  const data = useSelector((state) => state.responses[handle]);

  useEffect(() => {
    user.get();

    const handleScroll = () => {
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

  const setActive = (prop) => (prop.isActive ? styles["active-link"] : "");

  return (
    <div className={menuStyle}>
      <div className={styles["nav-container"]}>
        <div className={styles["brand"]}>
          <NavLink to={"/"}>
            <FontAwesomeIcon icon={faBookAtlas} />
            <span className={styles["logo"]}>ReactBooking</span>
          </NavLink>
        </div>

        <ul className={styles["header-list"]}>
          <NavLink to={"/catalog/query?type=hotel"}>
            <span>Hotels</span>
          </NavLink>

          <NavLink to={"/catalog/query?type=apartment"}>
            <span>Apartments</span>
          </NavLink>

          <NavLink to={"/catalog/query?type=resort"}>
            <span>Resorts</span>
          </NavLink>

          <NavLink to={"/catalog/query?type=villa"}>
            <span>Villas</span>
          </NavLink>

          <NavLink to={"/catalog/query?type=cabin"}>
            <span>Cabins</span>
          </NavLink>
        </ul>

        <ul className={styles["nav-items"]}>
          <FavoriteBox />

          {data?.username ? (
            <AccountTool />
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
