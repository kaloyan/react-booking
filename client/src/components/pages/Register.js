import styles from "./Forms.module.css";

import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/netReq";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { setAccount } from "../../features/slices/accountSlice";
import { pushMessage } from "../../features/slices/localSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      repass: "",
      email: "",
      role: "user",
    },
    onSubmit: async (values) => {
      if (values.password !== values.repass) {
        dispatch(
          pushMessage({
            text: "Passwords don't match",
            type: "error",
          })
        );
        return;
      }

      try {
        const response = await register({
          username: values.username,
          password: values.password,
          email: values.email,
          role: values.role,
          rePass: values.repass,
        });

        if (response?.status == "OK") {
          dispatch(setAccount(response));
          navigate("/dashboard/messages");
        } else {
          dispatch(
            pushMessage({
              text: response.response?.data?.message,
              type: "error",
            })
          );
        }
      } catch (err) {
        dispatch(
          pushMessage({
            text: err,
            type: "error",
          })
        );
      }
    },
  });

  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper"]}>
        <h1 className={styles["title"]}>Register</h1>

        <form onSubmit={formik.handleSubmit} className={styles["form"]}>
          <label htmlFor="username" className={styles["label"]}>
            Username
          </label>
          <input
            className={styles["input"]}
            type="text"
            name="username"
            id="username"
            placeholder="John Doe"
            required
            minLength={3}
            maxLength={20}
            value={formik.values.username}
            onChange={formik.handleChange}
          />

          <label htmlFor="email" className={styles["label"]}>
            Email
          </label>
          <input
            className={styles["input"]}
            type="email"
            name="email"
            id="email"
            placeholder="john@example.com"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <label htmlFor="password" className={styles["label"]}>
            Password
          </label>
          <input
            className={styles["input"]}
            type="password"
            name="password"
            id="password"
            required
            minLength={3}
            placeholder="must be at least 3 characters long"
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <label htmlFor="repass" className={styles["label"]}>
            Retype password
          </label>
          <input
            className={styles["input"]}
            type="password"
            name="repass"
            id="repass"
            required
            minLength={3}
            placeholder="type same password again"
            value={formik.values.repass}
            onChange={formik.handleChange}
          />

          <label htmlFor="role" className={styles["label"]}>
            Register as:{" "}
          </label>
          <select
            name="role"
            id="role"
            className={styles["input"]}
            value={formik.values.role}
            onChange={formik.handleChange}
          >
            <option value="user">Traveler</option>
            <option value="owner">Hotel owner</option>
          </select>

          <input
            type="submit"
            name="submit"
            value="Register"
            className={styles["submit"]}
          />

          <div className={styles["infoBox"]}>
            Already have account? <Link to={"/login"}>Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
