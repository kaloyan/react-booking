import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./AccountTool.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRequest } from "../../hooks/useRequest";
import { storageTool } from "../../utils/helpers";

export default function AccountTool() {
  const [openMenu, setOpenMenu] = useState(false);

  const handle = "account";
  const user = useRequest("user", handle);
  const data = useSelector((state) => state.responses[handle]);

  const navigate = useNavigate();

  useEffect(() => {
    user.get();
  }, []);

  const handleLogout = async (e) => {
    user.logout().then(() => {
      user.cleaner();
      storageTool.remove("role");
      navigate("/");
    });
  };

  return (
    <div className={styles["dropdown"]}>
      <button
        onClick={() => setOpenMenu((state) => !state)}
        onBlur={() => setOpenMenu(false)}
        className={styles["dropbtn"]}
      >
        {data?.avatar ? (
          <img src={data?.avatar} alt="avatar" className={styles["thumb"]} />
        ) : (
          <FontAwesomeIcon icon={faUser} className={styles["avatar"]} />
        )}

        {data?.username}
        <FontAwesomeIcon icon={faCaretDown} className={styles["icon"]} />
      </button>
      <div
        className={`${styles["dropdown-content"]} ${
          openMenu && styles["show"]
        }`}
      >
        <span> {data?.email}</span>
        <Link
          to={"/dashboard"}
          onMouseDown={() => navigate("/dashboard/profile")}
        >
          Dashboard
        </Link>
        <Link to={"/logout"} onMouseDown={handleLogout}>
          logout
        </Link>
      </div>
    </div>
  );
}
