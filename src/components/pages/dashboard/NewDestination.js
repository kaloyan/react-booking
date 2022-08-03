import styles from "./Dashboard.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { useState, useId } from "react";
import { uploadDest } from "../../../services/firebaseSrv";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../../hooks/useRequest";
import { useFormik } from "formik";
import ImageSelect from "../../ui/ImageSelect";

export default function NewDestination() {
  const [picture, setPicture] = useState([]);

  const handle = useId();
  const destinations = useRequest("destinations", handle);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      img: "",
      name: "",
      featured: false,
      description: "",
    },

    onSubmit: async (values) => {
      const pictureUrl = await uploadDest(picture);

      const data = {
        name: values.name,
        image: pictureUrl,
        description: values.description,
        featured: values.featured,
      };

      destinations.create(data).then(() => {
        destinations.cleaner();
        navigate("../destinations");
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <section className={styles["grid-container"]}>
        <div className={styles["header"]}>
          <div className={styles["bread-crump"]}>
            <FontAwesomeIcon icon={faMapPin} />
            <h1>New Destination</h1>
          </div>

          <div>
            <NavLink to={"../destinations"} className={styles["action-btn"]}>
              <span>Cancel</span>
            </NavLink>
          </div>
        </div>

        <div className={styles["side"]}>
          <ImageSelect
            handleGetPictures={(files) => setPicture(files[0])}
            single={true}
          />
        </div>

        <div className={styles["content"]}>
          <div className={styles["item"]}>
            <label>Destination name: </label>
            <input
              type="text"
              name="name"
              placeholder="example: London"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label>Description: </label>
            <input
              type="text"
              name="description"
              placeholder="example: Bring your umbrella"
              required
              value={formik.values.description}
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
            <input type="submit" value="Create Destination" />
          </div>
        </div>
      </section>
    </form>
  );
}
