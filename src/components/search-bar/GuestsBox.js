import { useState } from "react";
import styles from "./SearchBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

export default function GuestsBox() {
  const [showOptions, setShowOptions] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOptions = (option, operation) => {
    setOptions((prev) => ({
      ...prev,
      [option]: operation === "inc" ? options[option] + 1 : options[option] - 1,
    }));
  };

  return (
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
              <span className={styles.optionsCountNumber}>{options.adult}</span>
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
              <span className={styles.optionsCountNumber}>{options.room}</span>
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
  );
}
