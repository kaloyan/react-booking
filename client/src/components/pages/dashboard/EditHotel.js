import styles from "./Dashboard.module.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { uploadHotelImg } from "../../../services/firebaseSrv";
import { getOneHotel } from "../../../services/netReq";
import { pushMessage } from "../../../features/slices/localSlice";
import ImageBox from "../../ui/ImageBox";
import MessageBox from "../../ui/MessageBox";

export default function EditHotel() {
  const [pictures, setPictures] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams("id");

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
            formik.values.pictures = imgUrls;
            // const response = await createHotel(formik.values);
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

  useEffect(() => {
    const fetchHotel = async () => {
      const hotel = await getOneHotel(id);
      console.log(hotel);

      if (hotel?.response?.status == 400) {
        dispatch(
          pushMessage({
            text: "Server error",
            type: "error",
          })
        );
      } else {
        formik.setValues({
          name: hotel.name,
          title: hotel.title,
          type: hotel.type,
          city: hotel.city,
          address: hotel.address,
          distance: hotel.distance,
          pictures: hotel.pictures,
          description: hotel.description,
          cheepestPrice: hotel.cheepestPrice,
          featured: hotel.featured,
        });

        setPictures(hotel.pictures);
      }
    };

    fetchHotel();
  }, [id]);

  return (
    <form onSubmit={formik.handleSubmit}>
      {showMessage && <MessageBox />}

      <section className={styles["grid-container"]}>
        <div className={styles["header"]}>
          <h1>Edit Hotel</h1>

          <div>
            <NavLink to={"../hotels"} className={styles["action-btn"]}>
              <span>Cancel</span>
            </NavLink>
          </div>
        </div>

        <div className={styles["side"]}>
          <ImageBox handleGetPictures={handleGetPictures} images={pictures} />
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

          <div className={styles["item"]}>
            <label>Description: </label>
            <input
              type="text"
              placeholder="example: Best hotel in town"
              required
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>

          <div></div>

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
            <input type="submit" value="Save changes" />
          </div>
        </div>
      </section>
    </form>
  );
}
