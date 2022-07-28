import styles from "./Reserve.module.css";
import { useState } from "react";
import { useFormik } from "formik";
import { createReservation } from "../../../../services/netRequest";
import { useDispatch } from "react-redux";
import { pushMessage } from "../../../../features/slices/localSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import statesArray from "./states.json";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Progress from "./Progress";
import { useEffect } from "react";

export default function Reserve({ close, rooms, hotelId }) {
  const [step, setStep] = useState(0);
  const [canContinue, setCanContinue] = useState(false);
  const [formState, setFormState] = useState(statesArray[0]);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  const handleNext = () => {
    setFormState(statesArray[step + 1]);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setFormState(statesArray[step - 1]);
    setStep((s) => s - 1);
  };

  const handleReserve = async (data) => {
    const reservation = {
      hotel: data.hotel,
      rooms: data.rooms.map(Number),
      arrive: data.arrive,
      leave: data.leave,
      price: totalPrice,
      comment: `Paid with ${data.payment}.`,
    };

    try {
      const response = await createReservation(reservation);

      close();

      if (!response._id) {
        throw "Server error.";
      }
    } catch (err) {
      dispatch(
        pushMessage({
          tetx: err,
          type: "error",
        })
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      arrive: "",
      leave: "",
      rooms: [],
      price: 0,
      payment: "",
      days: 0,
      hotel: hotelId,
    },

    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const calcResult = () => {
    let roomPrices = [];

    for (const room of formik.values.rooms) {
      let num = Number(room);

      for (const item of rooms) {
        if (item.roomNumbers.includes(num)) {
          roomPrices.push(item.price);
        }
      }
    }

    // console.log(roomPrices);
    const allRoomsPrice = roomPrices.reduce((acc, x) => acc + x, 0);
    const price = allRoomsPrice * formik.values.days;

    // formik.values.price = totalprice;
    setTotalPrice(price);
  };

  useEffect(() => {
    if (step == 0) {
      setCanContinue(formik.values.days > 0);
    }

    if (step == 1) {
      setCanContinue(formik.values.rooms.length > 0);
    }

    if (step == 2) {
      calcResult();
    }
  }, [step, formik.values]);

  return (
    <div className={styles["backdrop"]}>
      <section className={styles["container"]}>
        <Progress state={formState.progress} />

        <form
          className={styles["form-container"]}
          onSubmit={formik.handleSubmit}
        >
          <StepOne state={formState.step1} formik={formik} />
          <StepTwo state={formState.step2} formik={formik} rooms={rooms} />
          <StepThree
            state={formState.step3}
            formik={formik}
            totalPrice={totalPrice}
          />
        </form>

        <div className={styles["btn-box"]}>
          <button
            type="button"
            className={styles["cancel-btn"]}
            onClick={close}
          >
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
            type="button"
            className={styles["submin-btn"]}
            style={{ display: step < 2 ? "none" : "inline" }}
            onClick={() => handleReserve(formik.values)}
            disabled={formik.values.payment == "" || totalPrice == 0}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
}
