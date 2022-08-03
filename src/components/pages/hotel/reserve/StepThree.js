import { useContext } from "react";
import { ReservationContext } from "./ReservationContext";

import styles from "./Reserve.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcPaypal, faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

export default function StepThree() {
  const { formState, formik, totalPrice } = useContext(ReservationContext);
  const state = formState.step3;

  return (
    <div className={styles["step"]} style={{ left: state }}>
      <div className={styles["header"]}>
        <FontAwesomeIcon icon={faCartPlus} />
        <span>Checkout</span>
      </div>

      <div className={styles["info-box"]}>
        <div className={styles["checkout-info"]}>
          <h2>Your selection:</h2>
          <div>
            Arrive at: <span>{formik.values.arrive}</span>
          </div>

          <div>
            Leave at: <span>{formik.values.leave}</span>
          </div>

          <div>
            You will stay: <span name="days">{formik.values.days}</span> days.
          </div>

          <div>
            Rooms: <span>{formik.values.rooms.join(", ")}</span>
          </div>
        </div>

        <h1>
          Total price: $ <span>{totalPrice}</span>
        </h1>

        <div className={styles["payment"]}>
          Pay with:
          <span>
            <input
              type="radio"
              name="payment"
              id="paypal"
              value="paypal"
              onChange={formik.handleChange}
            />
            <label htmlFor="paypal">
              <FontAwesomeIcon icon={faCcPaypal} /> PayPal
            </label>
          </span>
          <span>
            <input
              type="radio"
              name="payment"
              id="ccard"
              value="ccard"
              onChange={formik.handleChange}
            />
            <label htmlFor="ccard">
              <FontAwesomeIcon icon={faCcVisa} /> Card
            </label>
          </span>
        </div>
      </div>
    </div>
  );
}
