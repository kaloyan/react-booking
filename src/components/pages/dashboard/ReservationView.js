import styles from "./ReservationView.module.css";
import { useState, useEffect } from "react";
import {
  getOneReservation,
  deleteReservation,
} from "../../../services/netRequest";
import { useDispatch } from "react-redux";
import { pushMessage } from "../../../features/slices/localSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function ReservationView({ resId, closeHandler }) {
  const [reservation, setReservation] = useState(null);
  const [confirmDel, setConfermDel] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      // console.log(resId);
      await deleteReservation(reservation._id);
      closeHandler();
      navigate("remove");
    } catch (err) {
      console.log(err);
      dispatch(
        pushMessage({
          text: err,
          type: "error",
        })
      );
    }
  };

  useEffect(() => {
    const getOne = async () => {
      const response = await getOneReservation(resId);
      setReservation(response);
    };

    if (resId) {
      getOne();
    }
  }, [resId]);

  return (
    <div className={styles["backdrop"]}>
      <section className={styles["container"]}>
        <div className={styles["content"]}>
          {reservation && (
            <>
              <div className={styles["header"]}>
                <h1>Reservation Info</h1>
              </div>

              <div className={styles["block"]}>
                <div className={styles["row"]}>
                  <em>Hotel</em>
                  <span>{reservation.hotel.name}</span>
                  <img src={reservation.hotel.image} alt="<no image>" />
                </div>
              </div>

              <div className={styles["block"]}>
                <div className={styles["row"]}>
                  <em>Guest</em>
                  <span>{reservation.guest.name}</span>
                  {reservation.guest.image ? (
                    <img src={reservation.guest.image} alt="<no image>" />
                  ) : (
                    <FontAwesomeIcon icon={faUser} />
                  )}
                </div>

                <div className={styles["row"]}>
                  <em htmlFor="">Contacts: </em>

                  <div>
                    <em htmlFor="">email: </em>
                    <span>
                      <a href={`mailto:${reservation.guest.email}`}>
                        {reservation.guest.email || "<not set>"}
                      </a>
                    </span>
                  </div>
                </div>

                <div className={styles["row"]}>
                  <div></div>

                  <div>
                    <em htmlFor="">phone: </em>
                    <span>
                      <a href={`tel:${reservation.guest.phone}`}>
                        {reservation.guest.phone || "<not set>"}
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles["block"]}>
                <div className={styles["row"]}>
                  <em htmlFor="">Arrives at:</em>
                  <span>{reservation.arrive}</span>
                </div>

                <div className={styles["row"]}>
                  <em htmlFor="">Leaves at:</em>
                  <span>{reservation.leave}</span>
                </div>

                <div className={styles["row"]}>
                  <em htmlFor="">Reserved rooms:</em>
                  <span>{reservation.rooms.join(", ")}</span>
                </div>

                <div className={styles["row"]}>
                  <em htmlFor="">Payd price:</em>
                  <span>${reservation.price}</span>
                </div>

                <div className={styles["row"]}>
                  <em htmlFor="">Comment:</em>
                  <span>{reservation.comment}</span>
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
