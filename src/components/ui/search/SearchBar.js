import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestination,
  setStartDate,
  setEndDate,
} from "../../../features/slices/filterSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCaretUp,
  faCaretDown,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import GuestsBox from "./GuestsBox";
import { useLoadContent } from "../../../hooks/useLoadcontent";

export default function SearchBar() {
  const navigate = useNavigate();
  const loadContent = useLoadContent();

  const { destination, startDate, endDate } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const [openSearch, setOpenSearch] = useState(false);

  const searchHandler = (e) => {
    e.preventDefault();
    loadContent();
    navigate("/catalog");
  };

  const toggleOpenSearch = (e) => {
    setOpenSearch((state) => !state);
  };

  const setDateStart = (e) => {
    dispatch(setStartDate(e.target.value));
  };

  const setDateEnd = (e) => {
    dispatch(setEndDate(e.target.value));
  };

  return (
    <form
      className={`${styles["search-tool"]} ${openSearch && styles["visible"]}`}
      onSubmit={searchHandler}
    >
      <div className={styles["container"]}>
        <button
          type="button"
          onClick={toggleOpenSearch}
          className={styles["close-btn"]}
        >
          {openSearch ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </button>

        <input
          type="search"
          className={styles["search-box"]}
          placeholder="Where do you want to go today?"
          value={destination}
          onChange={(e) => dispatch(setDestination(e.target.value))}
        />

        <button type="submit" className={styles["search-btn"]}>
          <FontAwesomeIcon icon={faMagnifyingGlass} /> {openSearch && "Search"}
        </button>
      </div>

      <div
        className={`${styles["wrapper"]} ${openSearch && styles["visible"]}`}
      >
        <div className={styles["date-box"]}>
          <h3>
            <FontAwesomeIcon icon={faCalendar} /> Arrivals
          </h3>

          <input type="date" value={startDate} onChange={setDateStart} />

          <h3>
            <FontAwesomeIcon icon={faCalendar} /> Leaving
          </h3>
          <input type="date" value={endDate} onChange={setDateEnd} />
        </div>

        <GuestsBox />
      </div>

      <div className={styles.searchItem}></div>
    </form>
  );
}
