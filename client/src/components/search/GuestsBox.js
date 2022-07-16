import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdults,
  setChildren,
  setRooms,
} from "../../features/slices/filterSlice";

import styles from "./GuestBox.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

export default function GuestsBox() {
  const { adults, children, rooms } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className={styles["search-item"]}>
      <div>
        <h3>
          <FontAwesomeIcon icon={faPerson} className={styles["icon"]} />
          <span className={styles["search-text"]}>
            {`${adults} adult - ${children} children - ${rooms} room`}
          </span>
        </h3>
      </div>
      <div className={styles["options"]}>
        <div className={styles["option-item"]}>
          <span>Adult</span>
          <div className={styles["counter"]}>
            <button
              type="button"
              disabled={adults <= 1}
              className={styles["option-btn"]}
              onClick={() => dispatch(setAdults(adults - 1))}
            >
              -
            </button>
            <span>{adults}</span>
            <button
              type="button"
              className={styles["option-btn"]}
              onClick={() => dispatch(setAdults(adults + 1))}
            >
              +
            </button>
          </div>
        </div>

        <div className={styles["option-item"]}>
          <span>Children</span>
          <div className={styles["counter"]}>
            <button
              type="button"
              disabled={children <= 0}
              className={styles["option-btn"]}
              onClick={() => dispatch(setChildren(children - 1))}
            >
              -
            </button>
            <span>{children}</span>
            <button
              type="button"
              className={styles["option-btn"]}
              onClick={() => dispatch(setChildren(children + 1))}
            >
              +
            </button>
          </div>
        </div>

        <div className={styles["option-item"]}>
          <span>Room</span>
          <div className={styles["counter"]}>
            <button
              type="button"
              disabled={rooms <= 1}
              className={styles["option-btn"]}
              onClick={() => dispatch(setRooms(rooms - 1))}
            >
              -
            </button>
            <span>{rooms}</span>
            <button
              type="button"
              className={styles["option-btn"]}
              onClick={() => dispatch(setRooms(rooms + 1))}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
