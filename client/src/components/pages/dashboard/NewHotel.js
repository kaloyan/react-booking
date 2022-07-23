import styles from "./Dashboard.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { uploadHotelImg } from "../../../services/firebaseSrv";
import { createHotel } from "../../../services/netReq";
import { pushMessage } from "../../../features/slices/localSlice";
import ImageBox from "../../ui/ImageBox";
import MessageBox from "../../ui/MessageBox";

export default function NewHotel() {
  const [pictures, setPictures] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      type: "hotel",
      city: "",
      address: "",
      distance: "",
      pictures: [],
      description: "",
      cheepestPrice: 1,
      featured: false,
    },

    onSubmit: async (values) => {
      if (pictures.length < 1) {
        dispatch(
          pushMessage({
            text: "Please select some images",
            type: "info",
          })
        );

        return;
      }

      setShowMessage(true);

      try {
        Promise.all(pictures.map((x) => uploadHotelImg(x))).then(
          async (imgUrls) => {
            // console.log(imgUrls);
            formik.values.pictures = imgUrls;

            // console.log(formik.values);

            const response = await createHotel(formik.values);

            // console.log(response);
            setShowMessage(false);

            navigate("../hotels");
          }
        );
      } catch (err) {
        setShowMessage(false);

        dispatch(
          pushMessage({
            text: err,
            type: "error",
          })
        );
      }
    },
  });

  const navigate = useNavigate();

  const handleGetPictures = (files) => {
    // const files = Array.from(e.target.files);
    setPictures(files);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {showMessage && <MessageBox />}

      <section className={styles["grid-container"]}>
        <div className={styles["header"]}>
          <h1>Add New Hotel</h1>

          <div>
            <NavLink to={"../hotels"} className={styles["action-btn"]}>
              <span>Cancel</span>
            </NavLink>
          </div>
        </div>

        <div className={styles["side"]}>
          <ImageBox handleGetPictures={handleGetPictures} />
        </div>

        <div className={styles["content"]}>
          <div className={styles["item"]}>
            <label>Hotel name: </label>
            <input
              type="text"
              placeholder="example: Hilton"
              name="name"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label>Title: </label>
            <input
              type="text"
              placeholder="example: Spa & Wellness"
              required
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </div>

          <div className={`${styles["item"]} ${styles["grid-col-span-2"]}`}>
            <label>Description: </label>
            <textarea
              name="description"
              id="description"
              // cols="70"
              rows="6"
              required
              placeholder="example: Best hotel in town"
              value={formik.values.description}
              onChange={formik.handleChange}
            ></textarea>
          </div>

          <div className={styles["item"]}>
            <label>Type: </label>
            <select
              name="type"
              id="featured"
              required
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <option value="hotel">Hotel</option>
              <option value="villa">Villa</option>
              <option value="resort">Resort</option>
              <option value="apartment">Apartment</option>
              <option value="cabin">Cabin</option>
            </select>
          </div>

          <div className={styles["item"]}>
            <label>City: </label>
            <input
              type="text"
              placeholder="example: Paris"
              required
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label>Address: </label>
            <input
              type="text"
              placeholder="example: Downing Street 10"
              required
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label>Distance: </label>
            <input
              type="text"
              placeholder="example: 500m from airport"
              required
              name="distance"
              value={formik.values.distance}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label>Cheapest price: </label>
            <input
              type="number"
              placeholder="example: 500m from airport"
              required
              name="cheepestPrice"
              value={formik.values.cheepestPrice}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label>Featured: </label>
            <select
              name="featured"
              id="featured"
              required
              value={formik.values.featured}
              onChange={formik.handleChange}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>

          <div></div>

          <div></div>
          <div className={styles["item"]}>
            <input type="submit" value="Create Hotel" />
          </div>
        </div>
      </section>
    </form>
  );
}
