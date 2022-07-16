import { useDispatch, useSelector } from "react-redux";
import { setDestination } from "../../features/slices/filterSlice";

import styles from "./SearchBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";

export default function SeachBox() {
  const { destination } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className={styles.searchItem}>
      <FontAwesomeIcon icon={faBed} className={styles.icon} />
      <input
        type="text"
        placeholder="Where are you going?"
        className={styles.searchInput}
        value={destination}
        onChange={(e) => dispatch(setDestination(e.target.value))}
      />
    </div>
  );
}
