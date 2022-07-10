import { useState } from "react";

import styles from "./SearchBar.module.css";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range";
import { format } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

export default function CalendarBox() {
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

  return (
    <div className={styles.searchItem} onClick={toggleDate} onBlur={closeDate}>
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
  );
}
