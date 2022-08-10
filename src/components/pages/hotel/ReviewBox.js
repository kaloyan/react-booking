import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRequest } from "../../../hooks/useRequest";
import { useFormik } from "formik";
import { reviewSchema } from "../../../schemas";
import { useValidator } from "../hooks/useValidator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./ReviewBox.module.css";

export default function ReviewBox({ hotelId }) {
  const reviews = useRequest("reviews", hotelId);
  const data = useSelector((state) => state.responses[hotelId]);
  const allowed = useRequest("reviews", `${hotelId}-canpost`);
  const canPost = useSelector((state) => state.responses[`${hotelId}-canpost`]);
  const { account } = useSelector((state) => state.responses);
  const [showReviewBox, setShowReviewBox] = useState(false);

  useEffect(() => {
    reviews.getByHotel(hotelId);
    return () => reviews.cleaner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelId]);

  useEffect(() => {
    if (account?.role === "user") {
      allowed.canPost(hotelId);
    }

    return () => allowed.cleaner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: "",
    },

    validationSchema: reviewSchema,

    onSubmit: (values) => {
      reviews.create(hotelId, values).then((res) => {
        allowed.canPost(hotelId);
      });
    },
  });

  const makeStarts = (num) => {
    const count = Number(num);
    const stars = [];

    for (let i = 0; i < count; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }

    return stars;
  };

  const { getError, getClass } = useValidator(formik);

  return (
    <div className={styles["container"]}>
      <h1 className={styles["title"]}>Reviews:</h1>

      {data?.length === 0 && (
        <div className={styles["empty"]}>
          <h1>no reviews yet</h1>
        </div>
      )}

      {data?.length > 0 &&
        data.map((x) => (
          <div key={x._id} className={styles["review-item"]}>
            <div className={styles["raing-stars"]}>{makeStarts(x.rating)}</div>

            <blockquote>
              <p>{x.comment}</p>
            </blockquote>
          </div>
        ))}

      {canPost && (
        <>
          {!showReviewBox && (
            <div className={styles["review-btn"]}>
              <button onClick={() => setShowReviewBox(true)}>
                Write review
              </button>
            </div>
          )}

          {showReviewBox && (
            <>
              <form
                className={styles["review-form"]}
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label htmlFor="comment">Write a comment:</label>
                  <textarea
                    name="comment"
                    id="comment"
                    rows="6"
                    value={formik.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={getClass("comment")}
                  ></textarea>
                  {getError("comment")}
                </div>

                <div>
                  <label htmlFor="rating">Rate hotel:</label>

                  <select
                    name="rating"
                    id="rating"
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={getClass("rating")}
                  >
                    <option value="">---</option>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                  </select>
                  {getError("rating")}

                  <button type="submit">Post review</button>
                </div>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
}
