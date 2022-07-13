import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/filterSlice";

import styles from "./SearchTool.module.css";

import CalendarBox from "./CalendarBox";

export default function SearchTool() {
  const {
    destination,
    minPrice,
    maxPrice,
    adults,
    children,
    rooms,
    startDate,
    endDate,
  } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className={styles.search}>
      <h1 className={styles.title}>Search</h1>

      <div className={styles.searchtoolItem}>
        <label htmlFor="">Destination</label>
        <input
          type="text"
          placeholder={"Bali"}
          value={destination}
          onChange={(e) => dispatch(actions.setDestination(e.target.value))}
        />
      </div>

      <div className={styles.searchtoolItem}>
        <label htmlFor="">Chaekc-in Date</label>
        <CalendarBox />
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
            value={minPrice}
            onChange={(e) =>
              dispatch(actions.setMinPrice(Number(e.target.value)))
            }
          />
        </div>

        <div className={styles.optionItem}>
          <span className={styles.optiontext}>
            Max price <small>per night</small>
          </span>
          <input
            className={styles.optionInput}
            type="number"
            value={maxPrice}
            onChange={(e) =>
              dispatch(actions.setMaxPrice(Number(e.target.value)))
            }
          />
        </div>

        <div className={styles.optionItem}>
          <span className={styles.optiontext}>Adult</span>
          <input
            className={styles.optionInput}
            min={1}
            placeholder={1}
            type="number"
            value={adults}
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
            value={children}
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
            value={rooms}
            onChange={(e) => dispatch(actions.setRooms(Number(e.target.value)))}
          />
        </div>
      </div>

      <button
        className={styles.searchBtn}
        onClick={async () => await dispatch(await actions.getResults())}
      >
        Search
      </button>
    </div>
  );
}
