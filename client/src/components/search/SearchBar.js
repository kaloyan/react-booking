import styles from "./SearchBar.module.css";

import { useNavigate } from "react-router-dom";

import GuestsBox from "./GuestsBox";
import SeachBox from "./SeachBox";
import CalendarBox from "./CalendarBox";
export default function SearchBar() {
  const navigate = useNavigate();

  const searchHandler = () => {
    navigate("/hotels");
  };

  return (
    <div className={styles.searchBar}>
      <SeachBox />

      <CalendarBox style={"boxCal"} />

      <GuestsBox />

      <div className={styles.searchItem}>
        <button onClick={searchHandler} className={styles.searchBtn}>
          Search
        </button>
      </div>
    </div>
  );
}
