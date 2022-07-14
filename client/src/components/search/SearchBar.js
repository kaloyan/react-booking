import styles from "./SearchBar.module.css";

import { useNavigate } from "react-router-dom";
import { useLoadContent } from "../../hooks/useLoadcontent";

import GuestsBox from "./GuestsBox";
import SeachBox from "./SeachBox";
import CalendarBox from "./CalendarBox";
export default function SearchBar() {
  const navigate = useNavigate();

  const loadContent = useLoadContent();

  const searchHandler = () => {
    // First load content from server into state
    loadContent();
    // Then navigate to /hotels route
    navigate("/hotels");
  };

  return (
    <div className={styles.searchBar}>
      <SeachBox />

      <CalendarBox />

      <GuestsBox />

      <div className={styles.searchItem}>
        <button onClick={searchHandler} className={styles.searchBtn}>
          Search
        </button>
      </div>
    </div>
  );
}
