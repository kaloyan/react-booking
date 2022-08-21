import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";

import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { pushMessage } from "../../../features/slices/localSlice";
import { useRequest } from "../../../hooks/useRequest";

export default function Profile() {
  const { id } = useParams("id");
  const user = useRequest("user", id);
  const data = useSelector((state) => state.responses[id]);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      role: "",
    },

    onSubmit: (values) => {
      const update = {
        role: values.role,
      };

      user.update(id, update).then(() => {
        dispatch(
          pushMessage({
            text: "User's profile updated successfully",
            type: "success",
          })
        );
      });
    },
  });

  useEffect(() => {
    // window.scrollTo(0, 0);

    if (id) {
      user.getById(id);
    }

    return () => user.cleaner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data?.role) {
      formik.values.role = data.role;
    }
  }, [data]);

  return (
    <form className={styles["grid-container"]} onSubmit={formik.handleSubmit}>
      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faIdCard} />
          <h1>Profile of {data?.username}</h1>
        </div>

        <div>
          <Link to={-1} className={styles["action-btn"]}>
            <span>Back</span>
          </Link>
        </div>
      </div>

      <div className={styles["side"]}>
        <div>
          {data?.avatar ? (
            <img src={data.avatar} alt="avatar" className={styles["avatar"]} />
          ) : (
            <FontAwesomeIcon icon={faUser} className={styles["avatar"]} />
          )}
        </div>
      </div>

      <div className={styles["content"]}>
        <div className={styles["item"]}>
          <label>Username: </label>
          <span type="text">{data?.username}</span>
        </div>

        <div className={styles["item"]}>
          <label>Email: </label>
          <span type="email">{data?.email}</span>
        </div>

        <div className={styles["item"]}>
          <label>Phone number: </label>
          <span>{data?.phone || <em>Not specified</em>}</span>
        </div>

        <div className={styles["item"]}>
          <label>Address: </label>
          <span>{data?.address || <em>Not specified</em>}</span>
        </div>

        <div className={styles["item"]}>
          <label>Gender: </label>
          <span>{data?.gender || <em>Not specified</em>}</span>
        </div>

        <div className={styles["item"]}>
          <label>Birthday: </label>
          <span>{data?.birthday || <em>Not specified</em>}</span>
        </div>

        <hr />

        <div className={styles["item"]}>
          <label>Change role: </label>

          <select
            name="role"
            id="role"
            value={formik.values.role}
            onChange={formik.handleChange}
          >
            <option value="admin">Administrator</option>
            <option value="user">Tourist</option>
            <option value="owner">Hotel owner</option>
          </select>
        </div>

        <div className={styles["item"]}>
          <input type="submit" value="Save" />
        </div>
      </div>
    </form>
  );
}
