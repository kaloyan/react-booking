import { useContext } from "react";
import { ReservationContext } from "./ReservationContext";

import styles from "./Reserve.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";

export default function StepTwo() {
  const { formState, formik, rooms } = useContext(ReservationContext);
  const state = formState.step2;

  return (
    <div className={styles["step"]} style={{ left: state }}>
      <div className={styles["header"]}>
        <FontAwesomeIcon icon={faBed} />
        <span>Select your rooms</span>
      </div>

      <div className={styles["content"]}>
        {rooms?.map((x) => (
          <div key={x._id} className={styles["room-item"]}>
            <div>
              <div className={styles["bold"]}>{x.title}</div>
              <div>{x.description}</div>
              <div>
                Max people:
                <span className={styles["bold"]}>{x.maxPeople}</span>
              </div>
              <div>
                Price: <span className={styles["bold"]}>{x.price}</span>
              </div>
            </div>

            <div className={styles["selectors"]}>
              {x.roomNumbers.map((r, i) => (
                <div key={i}>
                  <div>{r}</div>
                  <input
                    type="checkbox"
                    data-room={x._id}
                    name="rooms"
                    value={r}
                    onChange={formik.handleChange}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
