import styles from "./SearchBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";

export default function SeachBox() {
  return (
    <div className={styles.searchItem}>
      <FontAwesomeIcon icon={faBed} className={styles.icon} />
      <input
        type="text"
        placeholder="Where are you going?"
        className={styles.searchInput}
      />
    </div>
  );
}
