import { useState, useEffect, useId } from "react";
import { useSelector } from "react-redux";

import styles from "./ReservationView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRequest } from "../../../hooks/useRequest";

export default function ReservationView({ resId, closeHandler }) {
  const handle = useId();
  const reservations = useRequest("reservations", handle);
  const data = useSelector((state) => state.responses[handle]);

  useEffect(() => {
    reservations.get(resId);
    return () => reservations.cleaner();
  }, []);

  const [confirmDel, setConfermDel] = useState(false);

  const handleRemove = async () => {
    reservations.delete(data._id).then((success) => {
      if (success) {
        reservations.cleaner();
        closeHandler();
      }
    });
  };

  return (
    <div className={styles["backdrop"]}>
      <section className={styles["container"]}>
        <div className={styles["content"]}>
          {data && (
            <>
              <div className={styles["header"]}>
                <h1>Reservation Info</h1>
              </div>

              <div className={styles["block"]}>
                <div className={styles["row"]}>
                  <em>Hotel</em>
                  <span>{data?.hotel?.name}</span>
                  <img src={data?.hotel?.image} alt="<no image>" />
                </div>
              </div>

              <div className={styles["block"]}>
                <div className={styles["row"]}>
                  <em>Guest</em>
                  <span>{data?.guest?.name}</span>
                  {data?.guest?.image ? (
                    <img src={data?.guest?.image} alt="<no image>" />
                  ) : (
                    <FontAwesomeIcon icon={faUser} />
                  )}
                </div>

                <div className={styles["row"]}>
                  <em htmlFor="">Contacts: </em>

                  <div>
                    <em htmlFor="">email: </em>
                    <span>
                      <a href={`mailto:${data?.guest?.email}`}>
                        {data?.guest?.email || "<not set>"}
                      </a>
                    </span>
                  </div>
                </div>

                <div className={styles["row"]}>
                  <div></div>

                  <div>
                    <em htmlFor="">phone: </em>
                    <span>
                      <a href={`tel:${data?.guest?.phone}`}>
                        {data?.guest?.phone || "<not set>"}
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles["block"]}>
                <div className={styles["row"]}>
                  <em htmlFor="">Arrives at:</em>
                  <span>{data?.arrive}</span>
                </div>

                <div className={styles["row"]}>
                  <em htmlFor="">Leaves at:</em>
                  <span>{data?.leave}</span>
                </div>

                <div className={styles["row"]}>
                  <em htmlFor="">Reserved rooms:</em>
                  <span>{data?.rooms?.join(", ")}</span>
                </div>

                <div className={styles["row"]}>
                  <em htmlFor="">Payd price:</em>
                  <span>${data?.price}</span>
                </div>

                <div className={styles["row"]}>
                  <em htmlFor="">Comment:</em>
                  <span>{data?.comment}</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles["controls"]}>
          {!confirmDel ? (
            <button
              className={styles["cancel"]}
              type="button"
              onClick={() => setConfermDel(true)}
            >
              Cancel reservation
            </button>
          ) : (
            <button
              className={styles["remove"]}
              type="button"
              onClick={handleRemove}
            >
              Are you shure you want to cancel?
            </button>
          )}

          <button type="button" onClick={closeHandler}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
}
