import { useState, useEffect, useId } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { ReservationContext } from "./ReservationContext";
import { useRequest } from "../../../../hooks/useRequest";
import { pushMessage } from "../../../../features/slices/localSlice";

import styles from "./Reserve.module.css";
import statesArray from "./states.json";
import Progress from "./Progress";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Controls from "./Controls";

export default function Reserve({ close, rooms, hotelId }) {
  const [step, setStep] = useState(0);
  const [canContinue, setCanContinue] = useState(false);
  const [formState, setFormState] = useState(statesArray[0]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handle = useId();
  const reservations = useRequest("reservations", handle);
  const dispatch = useDispatch();

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

    onSubmit: (values) => {
      const reservation = {
        hotel: values.hotel,
        rooms: values.rooms.map(Number),
        arrive: values.arrive,
        leave: values.leave,
        price: totalPrice,
        comment: `Paid with ${values.payment}.`,
      };

      reservations
        .create(reservation)
        .then((res) => {
          dispatch(
            pushMessage({
              text: "Reservation created successfull",
              type: "success",
            })
          );
        })
        .catch((err) => {
          //err
        })
        .finally(() => {
          reservations.cleaner();
          close();
        });
    },
  });

  useEffect(() => {
    if (step === 0) {
      setCanContinue(formik.values.days > 0);
    }

    if (step === 1) {
      setCanContinue(formik.values.rooms.length > 0);
    }

    if (step === 2) {
      calculateTotalPrice();
    }
  }, [step, formik.values]);

  const handleNext = () => {
    setFormState(statesArray[step + 1]);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setFormState(statesArray[step - 1]);
    setStep((s) => s - 1);
  };

  const calculateTotalPrice = () => {
    let roomPrices = [];

    for (const room of formik.values.rooms) {
      let num = Number(room);

      for (const item of rooms) {
        if (item.roomNumbers.includes(num)) {
          roomPrices.push(item.price);
        }
      }
    }

    const allRoomsPrice = roomPrices.reduce((acc, x) => acc + x, 0);
    const price = allRoomsPrice * formik.values.days;

    setTotalPrice(price);
  };

  const context = {
    formik,
    formState,
    totalPrice,
    step,
    rooms,
    canContinue,
    close,
    handleBack,
    handleNext,
  };

  return (
    <div className={styles["backdrop"]}>
      <ReservationContext.Provider value={context}>
        <section className={styles["container"]}>
          <Progress />

          <form
            className={styles["form-container"]}
            onSubmit={formik.handleSubmit}
          >
            <StepOne />
            <StepTwo />
            <StepThree />

            <Controls />
          </form>
        </section>
      </ReservationContext.Provider>
    </div>
  );
}
