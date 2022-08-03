import { useContext } from "react";
import { ReservationContext } from "./ReservationContext";

import styles from "./Reserve.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Controls() {
  const { formik, close, handleNext, handleBack, step, canContinue } =
    useContext(ReservationContext);

  return (
    <div className={styles["btn-box"]}>
      <button type="button" className={styles["cancel-btn"]} onClick={close}>
        Cancel
      </button>

      <div></div>

      <div>
        <button
          type="button"
          style={{ display: step < 1 ? "none" : "inline" }}
          onClick={handleBack}
        >
          Back
        </button>
      </div>

      <button
        type="button"
        style={{ display: step > 1 ? "none" : "inline" }}
        onClick={handleNext}
        disabled={!canContinue}
      >
        Next
      </button>

      <button
        type="submit"
        className={styles["submin-btn"]}
        style={{ display: step < 2 ? "none" : "inline" }}
        disabled={formik.values.payment === ""}
      >
        <FontAwesomeIcon icon={faCartShopping} />
        Book Now
      </button>
    </div>
  );
}
