import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Forms.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { useRequest } from "../../hooks/useRequest";
import { useValidator } from "./hooks/useValidator";
import { registerSchema } from "../../schemas";
import { storageTool } from "../../utils/helpers";
import { removeRedirect } from "../../features/slices/localSlice";

export default function Login() {
  const handle = "account";
  const user = useRequest("user", handle);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { redirect } = useSelector((state) => state.local);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      repass: "",
      email: "",
      role: "user",
    },

    onSubmit: async (values) => {
      user
        .register({
          username: values.username,
          email: values.email,
          password: values.password,
          rePass: values.repass,
          role: values.role,
        })
        .then((res) => {
          if (res) {
            const urlTo = redirect || "/";

            storageTool.set("role", res.role);
            dispatch(removeRedirect());

            navigate(urlTo);
          }
        });
    },

    validationSchema: registerSchema,
  });

  const { getError, getClass } = useValidator(formik);

  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper"]}>
        <h1 className={styles["header"]}>
          <FontAwesomeIcon icon={faUserPlus} />
          <span>Register</span>
        </h1>

        <form onSubmit={formik.handleSubmit} className={styles["form"]}>
          <label htmlFor="username" className={styles["label"]}>
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="John Doe"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={getClass("username")}
          />
          {getError("username")}

          <label htmlFor="email" className={styles["label"]}>
            Email
          </label>
          <input
            name="email"
            id="email"
            placeholder="john.doe@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={getClass("email")}
          />
          {getError("email")}

          <label htmlFor="password" className={styles["label"]}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={getClass("password")}
          />
          {getError("password")}

          <label htmlFor="repass" className={styles["label"]}>
            Retype password
          </label>
          <input
            type="password"
            name="repass"
            id="repass"
            value={formik.values.repass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={getClass("repass")}
          />
          {getError("repass")}

          <label htmlFor="role" className={styles["label"]}>
            Register as:
          </label>
          <select
            name="role"
            id="role"
            className={styles["input"]}
            value={formik.values.role}
            onChange={formik.handleChange}
          >
            <option value="user">Tourist</option>
            <option value="owner">Hotel owner</option>
          </select>

          <input
            type="submit"
            name="submit"
            value="Register"
            className={styles["submit"]}
            disabled={formik.isSubmitting}
          />

          <div className={styles["info-box"]}>
            Already have account? <Link to={"/login"}>Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
