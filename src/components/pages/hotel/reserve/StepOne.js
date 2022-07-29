import { useRef } from "react";
import { format, intervalToDuration, compareAsc, add } from "date-fns";
import styles from "./Reserve.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

export default function StepOne({ state, formik }) {
  const arriveRef = useRef(null);
  const leaveRef = useRef(null);

  const arriveMinDate = add(new Date(), { days: 1 });
  const leaveMinDate = add(arriveMinDate, { days: 1 });

  const handleValidate = (e) => {
    if (e.target.id == "arrive" && e.target.value !== "") {
      const date = new Date(e.target.value);
      leaveRef.current.min = format(add(date, { days: 1 }), "yyy-MM-dd");
    }

    // compare dates
    if (arriveRef.current.value !== "" && leaveRef.current.value !== "") {
      // if arrive date is bigger than leave date - move the second

      const result = compareAsc(
        new Date(arriveRef.current.value),
        new Date(leaveRef.current.value)
      );

      // console.log(result);
      if (result > -1) {
        formik.values.leave = "";
        leaveRef.current.value = "";
        return;
      }

      const duration = intervalToDuration({
        start: new Date(arriveRef.current.value),
        end: new Date(leaveRef.current.value),
      });

      formik.values.days = duration.days;
    } else {
      formik.values.days = 0;
    }

    formik.handleChange(e);
  };

  return (
    <div className={styles["step"]} style={{ left: state }}>
      <div className={styles["header"]}>
        <FontAwesomeIcon icon={faCalendarDays} />
        <span>Select dates</span>
      </div>

      <div className={styles["date-select"]}>
        <div>
          <label htmlFor="arrive">Please select date when you arrive:</label>
          <input
            type="date"
            id="arrive"
            name="arrive"
            ref={arriveRef}
            min={format(arriveMinDate, "yyy-MM-dd")}
            value={formik.values.arrive}
            onChange={handleValidate}
          />
        </div>

        <div>
          <label htmlFor="leave">Please select date when you leave:</label>
          <input
            type="date"
            id="leave"
            name="leave"
            ref={leaveRef}
            min={format(leaveMinDate, "yyy-MM-dd")}
            value={formik.values.leave}
            onChange={handleValidate}
          />
        </div>

        {formik.values.days > 0 && (
          <div>
            <label htmlFor="">
              You will stay: {formik.values.days} day
              {formik.values.days > 1 ? "s" : ""}.
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
