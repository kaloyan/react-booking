import styles from "./Dashboard.module.css";

import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useRequest } from "../../../hooks/useRequest";
import { useId } from "react";

import ImageSelect from "../../ui/ImageSelect";

export default function EditDestination() {
  const [picture, setPicture] = useState([]);
  const { id } = useParams("id");

  const handle = useId();
  const destinations = useRequest("destinations", handle);
  const data = useSelector((state) => state.responses[handle]);

  useEffect(() => {
    if (id) {
      destinations.get(id);
    }

    return () => destinations.cleaner();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      img: "",
      featured: false,
      description: "",
    },

    onSubmit: (values) => {
      // console.log(values);
      // console.log(picture);

      //   const pictureUrl = await uploadDest(picture);
      //   const pictureUrl = picture.name;

      const newData = {
        name: values.name,
        // image: pictureUrl,
        description: values.description,
        featured: values.featured,
      };

      destinations.update(id, newData).then(() => {
        navigate("../destinations");
      });
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data.name,
        img: data.image,
        featured: data.featured,
        description: data.description,
      });
    }
  }, [data]);

  const navigate = useNavigate();

  const handleGetPictures = (files) => {
    // const files = Array.from(e.target.files);
    setPicture(files[0]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <section className={styles["grid-container"]}>
        <div className={styles["header"]}>
          <div className={styles["bread-crump"]}>
            <FontAwesomeIcon icon={faLocationDot} />
            <h1>Edit Destination</h1>
          </div>

          <div>
            <NavLink to={"../destinations"} className={styles["action-btn"]}>
              <span>Cancel</span>
            </NavLink>
          </div>
        </div>

        <div className={styles["side"]}>
          <ImageSelect
            handleGetPictures={handleGetPictures}
            pictures={[formik.values.img]}
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
            <input type="submit" value="Save changes" />
          </div>
        </div>
      </section>
    </form>
  );
}
