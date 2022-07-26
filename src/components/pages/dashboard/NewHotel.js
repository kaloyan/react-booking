import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { uploadHotelImages } from "../../../utils/helpers";
import { createHotel, updateHotel } from "../../../services/netRequest";
import { pushMessage } from "../../../features/slices/localSlice";
import ImageBox from "../../ui/ImageBox";
import MessageBox from "../../ui/MessageBox";
import countries from "../../../assets/countries.json";

export default function NewHotel() {
  const [pictures, setPictures] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useDispatch();

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
        // first upload content to database and get the ID of the hotel
        const newHotel = await createHotel(formik.values);
        const hotelId = newHotel._id;
        // next upload all images to firebase store and update image list on the database
        await uploadHotelImages(pictures, hotelId);

        setShowMessage(false);
        navigate("../hotels");
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
            <Link to={"../hotels"} className={styles["action-btn"]}>
              <span>Cancel</span>
            </Link>
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
            <label>Country: </label>
            <input
              list="country"
              name="country"
              required
              placeholder="example: Bulgaria"
              value={formik.values.country}
              onChange={formik.handleChange}
            />
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
              placeholder="example: bul. Dondukov 1"
              required
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label>Cheapest room price: </label>
            <input
              type="number"
              placeholder=""
              required
              name="cheepestPrice"
              value={formik.values.cheepestPrice}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item-wide"]}>
            <label>Description: </label>
            <textarea
              name="description"
              id="description"
              rows="7"
              required
              placeholder="Please provide detailed description of the property"
              value={formik.values.description}
              onChange={formik.handleChange}
            ></textarea>
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
