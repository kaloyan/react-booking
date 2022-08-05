import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Forms.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { useRequest } from "../../hooks/useRequest";
import { useValidator } from "./hooks/useValidator";
import { storageTool } from "../../utils/helpers";
import { loginSchema } from "../../schemas";
import { removeRedirect } from "../../features/slices/localSlice";

export default function Login() {
  const handle = "account";
  const user = useRequest("user", handle);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { redirect } = useSelector((state) => state.local);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      user.login(values).then((res) => {
        if (res) {
          const urlTo = redirect || "";

          storageTool.set("role", res.role);
          dispatch(removeRedirect());

          navigate(urlTo);
        }
      });
    },

    validationSchema: loginSchema,
  });

  const { getError, getClass } = useValidator(formik);

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
