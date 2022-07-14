import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../features/filter/filterSlice";

import styles from "./SearchTool.module.css";

import CalendarBox from "./CalendarBox";
import { useLoadContent } from "../../hooks/useLoadcontent";

export default function SearchTool() {
  const state = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const loadContent = useLoadContent();

  return (
    <div className={styles.search}>
      <h1 className={styles.title}>Search</h1>

      <div className={styles.searchtoolItem}>
        <label htmlFor="">Destination</label>
        <input
          type="text"
          placeholder={"Bali"}
          value={state.destination}
          onChange={(e) => dispatch(actions.setDestination(e.target.value))}
        />
      </div>

      <div className={styles.searchtoolItem}>
        <label htmlFor="">Chaekc-in Date</label>
        <CalendarBox style={"inlineCal"} />
      </div>

      <div className={styles.searchtoolItem}>
        <label htmlFor="">Options</label>

        <div className={styles.optionItem}>
          <span className={styles.optiontext}>
            Min price <small>per night</small>
          </span>
          <input
            className={styles.optionInput}
            type="number"
            value={state.minPrice}
            onChange={(e) => dispatch(actions.setMinPrice(e.target.value))}
          />
        </div>

        <div className={styles.optionItem}>
          <span className={styles.optiontext}>
            Max price <small>per night</small>
          </span>
          <input
            className={styles.optionInput}
            type="number"
            value={state.maxPrice}
            onChange={(e) => dispatch(actions.setMaxPrice(e.target.value))}
          />
        </div>

        <div className={styles.optionItem}>
          <span className={styles.optiontext}>Adult</span>
          <input
            className={styles.optionInput}
            min={1}
            placeholder={1}
            type="number"
            value={state.adults}
            onChange={(e) =>
              dispatch(actions.setAdults(Number(e.target.value)))
            }
          />
        </div>

        <div className={styles.optionItem}>
          <span className={styles.optiontext}>Children</span>
          <input
            className={styles.optionInput}
            min={0}
            placeholder={0}
            type="number"
            value={state.children}
            onChange={(e) =>
              dispatch(actions.setChildren(Number(e.target.value)))
            }
          />
        </div>

        <div className={styles.optionItem}>
          <span className={styles.optiontext}>Room</span>
          <input
            className={styles.optionInput}
            min={1}
            placeholder={1}
            type="number"
            value={state.rooms}
            onChange={(e) => dispatch(actions.setRooms(Number(e.target.value)))}
          />
        </div>
      </div>

      <button className={styles.searchBtn} onClick={async () => loadContent()}>
        Search
      </button>
    </div>
  );
}
