import { useState, useId, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

import ImageSelect from "../../ui/ImageSelect";
import { pushMessage } from "../../../features/slices/localSlice";
import countries from "../../../assets/countries.json";
import { useRequest } from "../../../hooks/useRequest";
import { useValidator } from "../hooks/useValidator";
import { hotelSchema } from "../../../schemas";

export default function NewHotel() {
  const handle = useId();
  const catalog = useRequest("catalog", handle);
  const imageService = useRequest("imageServices", "imagesUpload");
  const [pictures, setPictures] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "hotel",
      city: "",
      address: "",
      country: "",
      pictures: [],
      description: "",
      cheepestPrice: "",
      featured: false,
    },

    validationSchema: hotelSchema,

    onSubmit: (values) => {
      if (pictures.length === 0) {
        dispatch(
          pushMessage({ text: "Please select some images", type: "info" })
        );

        return;
      }

      catalog.create(values).then((res) => {
        if (res) {
          const hotelId = res._id;

          if (hotelId) {
            imageService.upload(pictures, hotelId).then((res) => {
              dispatch(
                pushMessage({
                  text: "Hotel created successfully",
                  type: "success",
                })
              );

              navigate("../hotels");
            });
          }
        }
      });
    },
  });

  const { getError, getClass } = useValidator(formik);

  useEffect(() => {
    return () => {
      catalog.cleaner();
      imageService.cleaner();
    };
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <section className={styles["grid-container"]}>
        <div className={styles["header"]}>
          <div className={styles["bread-crump"]}>
            <FontAwesomeIcon icon={faHotel} />
            <h1>Add New Hotel</h1>
          </div>

          <div>
            <Link to={"../hotels"} className={styles["action-btn"]}>
              <span>Cancel</span>
            </Link>
          </div>
        </div>

        <div className={styles["side"]}>
          <ImageSelect handleGetPictures={(files) => setPictures(files)} />
        </div>

        <div className={styles["content"]}>
          <div className={styles["item"]}>
            <label>Hotel name: </label>
            <input
              type="text"
              placeholder="example: Hilton"
              name="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={getClass("name")}
            />
            {getError("name")}
          </div>

          <div className={styles["item"]}>
            <label>Type: </label>
            <select
              name="type"
              id="featured"
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
            <label>Country: </label>
            <input
              list="country"
              name="country"
              placeholder="example: Bulgaria"
              value={formik.values.country}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={getClass("country")}
            />
            {getError("country")}

            <datalist id="country">
              {countries.map((x) => (
                <option value={x.name} key={x.code} />
              ))}
            </datalist>
          </div>

          <div className={styles["item"]}>
            <label>City: </label>
            <input
              type="text"
              placeholder="example: Sofia"
              name="city"
              value={formik.values.city}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={getClass("city")}
            />
            {getError("city")}
          </div>

          <div className={styles["item"]}>
            <label>Address: </label>
            <input
              type="text"
              placeholder="example: bul. Dondukov 1"
              name="address"
              value={formik.values.address}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={getClass("address")}
            />
            {getError("address")}
          </div>

          <div className={styles["item"]}>
            <label>Cheapest room price: </label>
            <input
              type="number"
              placeholder=""
              name="cheepestPrice"
              value={formik.values.cheepestPrice}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={getClass("cheepestPrice")}
            />
            {getError("cheepestPrice")}
          </div>

          <div className={styles["item-wide"]}>
            <label>Description: </label>
            <textarea
              name="description"
              id="description"
              rows="7"
              placeholder="Please provide detailed description of the property"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={getClass("description")}
            ></textarea>
            {getError("description")}
          </div>

          <div className={styles["item"]}>
            <label>Featured: </label>
            <select
              name="featured"
              id="featured"
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
