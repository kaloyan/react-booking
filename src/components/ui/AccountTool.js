import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./AccountTool.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useRequest } from "../../hooks/useRequest";
import { storageTool } from "../../utils/helpers";

export default function AccountTool() {
  const [openMenu, setOpenMenu] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const handle = "account";
  const user = useRequest("user", handle);
  const data = useSelector((state) => state.responses[handle]);

  const navigate = useNavigate();

  useEffect(() => {
    user.get();
  }, []);

  useEffect(() => {
    if (data?.messages) {
      const count = data.messages.reduce(
        (acc, x) => (x.unread ? acc + 1 : acc),
        0
      );

      setMessageCount(count);
    }
  }, [data]);

  const handleLogout = async (e) => {
    user.logout().then(() => {
      user.cleaner();
      storageTool.remove("role");
      navigate("/");
    });
  };

  return (
    <section className={styles["container"]}>
      {messageCount > 0 && (
        <Link to="/dashboard/messages" className={styles["mail-link"]}>
          <div className={styles["mail-box"]} data-content={messageCount}>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
        </Link>
      )}

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
    </section>
  );
}
