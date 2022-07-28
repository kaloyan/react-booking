import styles from "./Reserve.module.css";

export default function StepTwo({ state, formik, rooms }) {
  const validateSelect = (e) => {
    //!TODO - validate input

    // console.log(e.target.value);

    formik.handleChange(e);
  };

  return (
    <div className={styles["step"]} style={{ left: state }}>
      <h3>Select your rooms:</h3>

      <div className={styles["content"]}>
        {rooms?.map((x) => (
          <div key={x._id} className={styles["room-item"]}>
            <div>
              <div className={styles["bold"]}>{x.title}</div>
              <div>{x.description}</div>
              <div>
                Max people:{" "}
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
                    onChange={validateSelect}
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
