import styles from "./AccountTool.module.css";
import { doLogout } from "../../services/netReq";
import { logout } from "../../features/slices/accountSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";

export default function AccountTool(props) {
  const [openMenu, setOpenMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    await doLogout();
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={styles.dropdown}>
      <button
        onClick={() => setOpenMenu((state) => !state)}
        onBlur={() => setOpenMenu(false)}
        className={styles.dropbtn}
      >
        <FontAwesomeIcon icon={faUser} className={styles.avatar} />
        {props.username}
        <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
      </button>
      <div
        className={`${styles["dropdown-content"]} ${
          openMenu && styles["show"]
        }`}
      >
        <span className={styles.menuItem}> {props.email}</span>
        <Link to={"/dashboard"} onMouseDown={() => navigate("/dashboard")}>
          Dashboard
        </Link>
        <Link to={"/logout"} onMouseDown={handleLogout}>
          logout
        </Link>
      </div>
    </div>
  );
}
