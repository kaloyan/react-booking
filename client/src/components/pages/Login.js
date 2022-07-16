import styles from "../../assets/Forms.module.css";

import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/netReq";
import { useDispatch } from "react-redux";
import { setAccount } from "../../features/slices/accountSlice";
import { useFormik } from "formik";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      error: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await login({
          email: values.email,
          password: values.password,
        });

        if (response?.status == "OK") {
          values.error = "";
          dispatch(setAccount(response));
          navigate("/");
        } else {
          values.error = response.response.data.message;
        }
      } catch (err) {
        console.log("Error: ", err);
      }
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Sign in</h1>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            Email address:
          </label>
          <input
            className={styles.input}
            type="email"
            name="email"
            id="email"
            placeholder="john@example.com"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <label htmlFor="password" className={styles.label}>
            Your password:
          </label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            required
            minLength={3}
            onChange={formik.handleChange}
          />

          <input
            type="submit"
            name="submit"
            value="Login"
            className={styles.submit}
          />

          {formik.values.error && (
            <div className={styles.errorBox}>{formik.values.error}</div>
          )}

          <div className={styles.infoBox}>
            Dont't have account? <Link to={"/register"}>Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
