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
  const { account } = useSelector((state) => state.responses);

  useEffect(() => {
    reservations.get(resId);
    return () => reservations.cleaner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [confirmDel, setConfermDel] = useState(false);

  const handleRemove = async () => {
    reservations.delete(data._id).then((res) => {
      if (res) {
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
                  <img src={data?.hotel?.image} alt="hotel" />
                </div>
              </div>

              <div className={styles["block"]}>
                <div className={styles["row"]}>
                  <em>{account?.role === "owner" ? "Guest" : "Hotel owner"}</em>
                  <span>
                    {account?.role === "owner"
                      ? data?.guest?.name
                      : data?.owner?.name}
                  </span>

                  {account?.role === "owner" &&
                    (data?.guest?.image ? (
                      <img src={data?.guest?.image} alt="guest" />
                    ) : (
                      <FontAwesomeIcon icon={faUser} />
                    ))}

                  {account?.role === "user" &&
                    (data?.owner?.avatar ? (
                      <img src={data?.owner?.avatar} alt="hotel owber" />
                    ) : (
                      <FontAwesomeIcon icon={faUser} />
                    ))}
                </div>

                <div className={styles["row"]}>
                  <em htmlFor="">Contacts: </em>

                  <div>
                    <em htmlFor="">email: </em>
                    <span>
                      {account?.role === "owner" && (
                        <a href={`mailto:${data?.guest?.email}`}>
                          {data?.guest?.email || "<not set>"}
                        </a>
                      )}

                      {account?.role === "user" && (
                        <a href={`mailto:${data?.owner?.email}`}>
                          {data?.owner?.email || "<not set>"}
                        </a>
                      )}
                    </span>
                  </div>
                </div>

                <div className={styles["row"]}>
                  <div></div>

                  <div>
                    <em htmlFor="">phone: </em>
                    <span>
                      {account?.role === "owner" && (
                        <a href={`tel:${data?.guest?.phone}`}>
                          {data?.guest?.phone || "<not set>"}
                        </a>
                      )}

                      {account?.role === "user" && (
                        <a href={`tel:${data?.owner?.phone}`}>
                          {data?.owner?.phone || "<not set>"}
                        </a>
                      )}
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
