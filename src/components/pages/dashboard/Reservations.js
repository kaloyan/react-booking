import { useEffect, useState, useId } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { intervalToDuration } from "date-fns";

import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import ReservationView from "./ReservationView";
import { useRequest } from "../../../hooks/useRequest";

export default function Reservations() {
  const handle = useId();
  const reservations = useRequest("reservations", handle);
  const data = useSelector((state) => state.responses[handle]);

  const { id: ownerId } = useSelector((state) => state.responses.account);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    reservations.getByOwner(ownerId);
    return () => reservations.cleaner();
  }, []);

  const handleView = (e, id) => {
    e.preventDefault();
    setSelected(id);
  };

  const handleCloseView = () => {
    setSelected(null);
    reservations.getByOwner(ownerId);
  };

  return (
    <section className={styles["grid-container"]}>
      {selected && (
        <ReservationView resId={selected} closeHandler={handleCloseView} />
      )}

      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faBook} />
          <h1>Active Reservations ({data?.length})</h1>
        </div>
      </div>

      <div className={styles["table"]}>
        <div className={styles["table-head"]}>
          <div className={styles["table-span-2"]}>
            <span>Hotel</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Arrive at</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>rooms</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Days</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Price</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Actions</span>
          </div>
        </div>

        {/* Content */}
        {data?.map((x) => {
          return (
            <div key={x._id}>
              <div className={styles["table-span-2"]}>{x.hotel}</div>
              <div className={styles["table-span-1"]}>{x.arrive}</div>
              <div className={styles["table-span-1"]}>{x.rooms.join(", ")}</div>
              <div className={styles["table-span-1"]}>
                {
                  intervalToDuration({
                    start: new Date(x.arrive),
                    end: new Date(x.leave),
                  }).days
                }
              </div>
              <div className={styles["table-span-1"]}>${x.price}</div>
              <div className={styles["table-span-1"]}>
                <Link
                  to={`view/${x._id}`}
                  onClick={(e) => handleView(e, x._id)}
                  className={styles["action-btn"]}
                >
                  <span>View</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {data?.length == 0 && (
        <div className={styles["empty-box"]}>
          You dont have any reservations
        </div>
      )}
    </section>
  );
}
