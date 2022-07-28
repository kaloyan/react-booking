import styles from "./Reserve.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcPaypal, faCcVisa } from "@fortawesome/free-brands-svg-icons";

export default function StepThree({ formik, state, totalPrice }) {
  return (
    <div className={styles["step"]} style={{ left: state }}>
      <h3>Checkout</h3>

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
