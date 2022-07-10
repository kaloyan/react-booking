import styles from "./SearchTool.module.css";

import CalendarBox from "./CalendarBox";

export default function SearchTool() {
  return (
    <div className={styles.search}>
      <h1 className={styles.title}>Search</h1>

      <div className={styles.searchtoolItem}>
        <label htmlFor="">Destination</label>
        <input type="text" placeholder={"Bali"} />
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
          <input className={styles.optionInput} type="number" />
        </div>

        <div className={styles.optionItem}>
          <span className={styles.optiontext}>
            Max price <small>per night</small>
          </span>
          <input className={styles.optionInput} type="number" />
        </div>

        <div className={styles.optionItem}>
          <span className={styles.optiontext}>Adult</span>
          <input
            className={styles.optionInput}
            min={1}
            placeholder={1}
            type="number"
          />
        </div>

        <div className={styles.optionItem}>
          <span className={styles.optiontext}>Children</span>
          <input
            className={styles.optionInput}
            min={0}
            placeholder={0}
            type="number"
          />
        </div>

        <div className={styles.optionItem}>
          <span className={styles.optiontext}>Room</span>
          <input
            className={styles.optionInput}
            min={1}
            placeholder={1}
            type="number"
          />
        </div>
      </div>

      <button className={styles.searchBtn}>Search</button>
    </div>
  );
}
