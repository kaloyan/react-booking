import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Header.module.css";
import SearchBar from "../ui/search/SearchBar";

export default function Header(props) {
  const { account } = useSelector((state) => state.responses);

  return (
    <div
      className={`${styles["header"]} ${props.compact && styles["compact"]}`}
    >
      <div className={styles["container"]}>
        {!props.compact && (
          <>
            <h1 className={styles["title"]}>Adventure is worthwhile</h1>

            <p className={styles["description"]}>
              discover new places with us, adventure awaits
            </p>

            <SearchBar />

            <div>
              <Link to="/register">
                {!account?.username && (
                  <span className={styles["header-link"]}>
                    Sign in / Register
                  </span>
                )}
              </Link>
            </div>
          </>
        )}

        <div>{props.children}</div>
      </div>
    </div>
  );
}
