import styles from "./SearchBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function SeachBox() {
  const [destination, setDestination] = useState("");

  return (
    <div className={styles.searchItem}>
      <FontAwesomeIcon icon={faBed} className={styles.icon} />
      <input
        type="text"
        placeholder="Where are you going?"
        className={styles.searchInput}
        onChange={(e) => setDestination(e.target.value)}
      />
    </div>
  );
}
