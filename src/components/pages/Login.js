import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";

import styles from "./Forms.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { useRequest } from "../../hooks/useRequest";
import { loginSchema } from "../../schemas";

export default function Login() {
  const handle = "account";
  const user = useRequest("user", handle);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values, actions) => {
      user.login(values).then((success) => {
        if (success) {
          navigate("/");
        }
      });
    },

    validationSchema: loginSchema,
  });

  const navigate = useNavigate();

  const getClass = (element) => {
    return formik.errors[element] && formik.touched[element]
      ? styles["input-error"]
      : "";
  };

  const getError = (element) => {
    return (
      formik.errors[element] &&
      formik.touched[element] && (
        <span className={styles["error-message"]}>
          {formik.errors[element]}
        </span>
      )
    );
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper"]}>
        <h1 className={styles["header"]}>
          <FontAwesomeIcon icon={faRightToBracket} />
          <span>Sign in</span>
        </h1>

        <form onSubmit={formik.handleSubmit} className={styles["form"]}>
          <label htmlFor="email" className={styles["label"]}>
            Email address:
          </label>
          <input
            name="email"
            id="email"
            placeholder="Example: john.doe@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={getClass("email")}
          />
          {getError("email")}

          <label htmlFor="password" className={styles["label"]}>
            Your password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={getClass("password")}
          />
          {getError("password")}

          <input
            type="submit"
            name="submit"
            value="Login"
            disabled={formik.isSubmitting}
            className={styles["submit"]}
          />

          <div className={styles["info-box"]}>
            Dont't have account? <Link to={"/register"}>Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
