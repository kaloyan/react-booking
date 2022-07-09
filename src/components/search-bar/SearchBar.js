import styles from "./SearchBar.module.css";

import GuestsBox from "./GuestsBox";
import SeachBox from "./SeachBox";
import CalendarBox from "./CalendarBox";

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <SeachBox />

      <CalendarBox />

      <GuestsBox />

      <div className={styles.searchItem}>
        <button className={styles.searchBtn}>Search</button>
      </div>
    </div>
  );
}
