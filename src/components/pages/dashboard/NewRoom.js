import styles from "./Dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOwnHotels } from "../../../services/netReq";
import { useFormik } from "formik";

export default function NewRoom() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {},

    onSubmit: (values) => {
      console.log(values);

      navigate("../newroom");
    },
  });

  useEffect(() => {
    const fetchHotels = async () => {
      const hotels = await getOwnHotels();
      setHotels(hotels);
    };

    fetchHotels();
  }, []);

  return (
    <form className={styles["grid-container"]} onSubmit={formik.handleSubmit}>
      <div className={styles["header"]}>
        <h1>Add new rooms:</h1>

        <div>
          <Link to={"../hotels"} className={styles["action-btn"]}>
            <span>Cancel</span>
          </Link>
        </div>
      </div>

      <div className={styles["content"]}>
        <div className={styles["item"]}>
          <label>Select hotel: </label>
          <select
            name="hotel"
            value={formik.values.hotel}
            onChange={formik.handleChange}
          >
            {hotels?.map((x) => (
              <option value={x._id} key={x._id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles["item"]}>
          <label>Price: </label>
          <input
            type="number"
            name="price"
            required
            value={formik.values.price}
            onChange={formik.handleChange}
          />
        </div>

        <div className={styles["item"]}>
          <label>Room title: </label>
          <input
            type="text"
            name="title"
            required
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>

        <div className={styles["item"]}>
          <label>Room description: </label>
          <input
            type="text"
            name="description"
            required
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>

        <div className={styles["item"]}>
          <label>Max people: </label>
          <input
            type="number"
            name="maxpeople"
            required
            value={formik.values.maxpeople}
            onChange={formik.handleChange}
          />
        </div>

        <div className={styles["item"]}>
          <input
            type="submit"
            className={styles["foo"]}
            value="Save & Add new"
          />
        </div>
      </div>
    </form>
  );
}
