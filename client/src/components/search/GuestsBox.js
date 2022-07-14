import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdults,
  setChildren,
  setRooms,
} from "../../features/filter/filterSlice";

import styles from "./SearchBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

export default function GuestsBox() {
  const [showOptions, setShowOptions] = useState(false);

  const { adults, children, rooms } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className={styles.searchItem}>
      <FontAwesomeIcon icon={faPerson} className={styles.icon} />
      <span
        onClick={() => setShowOptions(!showOptions)}
        className={styles.searchText}
      >
        {`${adults} adult - ${children} children - ${rooms} room`}
      </span>

      {showOptions && (
        <div className={styles.options}>
          <div className={styles.optionItem}>
            <span className={styles.optionText}>Adult</span>
            <div className={styles.counter}>
              <button
                disabled={adults <= 1}
                className={styles.optionsBtn}
                onClick={() => dispatch(setAdults(adults - 1))}
              >
                -
              </button>
              <span className={styles.optionsCountNumber}>{adults}</span>
              <button
                className={styles.optionsBtn}
                onClick={() => dispatch(setAdults(adults + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.optionItem}>
            <span className={styles.optionText}>Children</span>
            <div className={styles.counter}>
              <button
                disabled={children <= 0}
                className={styles.optionsBtn}
                onClick={() => dispatch(setChildren(children - 1))}
              >
                -
              </button>
              <span className={styles.optionsCountNumber}>{children}</span>
              <button
                className={styles.optionsBtn}
                onClick={() => dispatch(setChildren(children + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.optionItem}>
            <span className={styles.optionText}>Room</span>
            <div className={styles.counter}>
              <button
                disabled={rooms <= 1}
                className={styles.optionsBtn}
                onClick={() => dispatch(setRooms(rooms - 1))}
              >
                -
              </button>
              <span className={styles.optionsCountNumber}>{rooms}</span>
              <button
                className={styles.optionsBtn}
                onClick={() => dispatch(setRooms(rooms + 1))}
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
