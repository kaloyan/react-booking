import { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { setStartDate, setEndDate } from "../../features/slices/filterSlice";

import styles from "./SearchBar.module.css";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

export default function CalendarBox(props) {
  const [openDate, setOpenDate] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.filter);

  const toggleDate = () => {
    setOpenDate(!openDate);
  };

  const closeDate = () => {
    setOpenDate(false);
  };

  const handleSelectdate = (selection) => {
    dispatch(setStartDate(format(selection.startDate, "MM/dd/yyy")));
    dispatch(setEndDate(format(selection.endDate, "MM/dd/yyy")));
  };

  return (
    <div className={styles.searchItem} onClick={toggleDate} onBlur={closeDate}>
      <FontAwesomeIcon icon={faCalendarDays} className={styles.icon} />
      <span className={styles.searchText}>
        {`${state.startDate} to ${state.endDate}`}
      </span>

      {openDate && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => handleSelectdate(item.selection)}
          moveRangeOnFirstSelection={false}
          ranges={[
            {
              startDate: new Date(state.startDate),
              endDate: new Date(state.endDate),
              key: "selection",
            },
          ]}
          className={styles[props.style]}
        />
      )}
    </div>
  );
}
