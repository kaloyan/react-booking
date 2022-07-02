import styles from "./SearchBar.module.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faPerson } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

import { DateRange } from "react-date-range";
import { format } from "date-fns";

export default function SearchBar() {
  const [showOptions, setShowOptions] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [openDate, setOpenDate] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const toggleDate = () => {
    setOpenDate(!openDate);
  };

  const closeDate = () => {
    setOpenDate(false);
  };

  const handleOptions = (option, operation) => {
    setOptions((prev) => ({
      ...prev,
      [option]: operation == "inc" ? options[option] + 1 : options[option] - 1,
    }));
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchItem}>
        <FontAwesomeIcon icon={faBed} className={styles.icon} />
        <input
          type="text"
          placeholder="Where are you going?"
          className={styles.searchInput}
        />
      </div>

      <div
        className={styles.searchItem}
        onClick={toggleDate}
        onBlur={closeDate}
      >
        <FontAwesomeIcon icon={faCalendarDays} className={styles.icon} />
        <span className={styles.searchText}>{`${format(
          date[0].startDate,
          "MM/dd/yyyy"
        )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>

        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className={styles.date}
          />
        )}
      </div>

      <div className={styles.searchItem}>
        <FontAwesomeIcon icon={faPerson} className={styles.icon} />
        <span
          onClick={() => setShowOptions(!showOptions)}
          className={styles.searchText}
        >{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>

        {showOptions && (
          <div className={styles.options}>
            <div className={styles.optionItem}>
              <span className={styles.optionText}>Adult</span>
              <div className={styles.counter}>
                <button
                  disabled={options.adult <= 1}
                  className={styles.optionsBtn}
                  onClick={() => handleOptions("adult", "dec")}
                >
                  -
                </button>
                <span className={styles.optionsCountNumber}>
                  {options.adult}
                </span>
                <button
                  className={styles.optionsBtn}
                  onClick={() => handleOptions("adult", "inc")}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.optionItem}>
              <span className={styles.optionText}>Children</span>
              <div className={styles.counter}>
                <button
                  disabled={options.children <= 0}
                  className={styles.optionsBtn}
                  onClick={() => handleOptions("children", "dec")}
                >
                  -
                </button>
                <span className={styles.optionsCountNumber}>
                  {options.children}
                </span>
                <button
                  className={styles.optionsBtn}
                  onClick={() => handleOptions("children", "inc")}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.optionItem}>
              <span className={styles.optionText}>Room</span>
              <div className={styles.counter}>
                <button
                  disabled={options.room <= 1}
                  className={styles.optionsBtn}
                  onClick={() => handleOptions("room", "dec")}
                >
                  -
                </button>
                <span className={styles.optionsCountNumber}>
                  {options.room}
                </span>
                <button
                  className={styles.optionsBtn}
                  onClick={() => handleOptions("room", "inc")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.searchItem}>
        <button className={styles.searchBtn}>Search</button>
      </div>
    </div>
  );
}
