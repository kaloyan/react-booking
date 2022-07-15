import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/netReq";
import { useDispatch } from "react-redux";
import { setAccount } from "../../../features/account/accountSlice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const response = await login({ username, password });

    if (response?.status == "OK") {
      setError(null);
      dispatch(setAccount(response));
      navigate("/");
    } else {
      setError(response.response.data);
      // console.log(response?.response?.data);
    }
  };

  return (
    <div className={styles.login}>
      <form onSubmit={loginHandler} className={styles.container}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          className={styles.input}
          type="text"
          name="username"
          id="username"
          placeholder="John Doe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" className={styles.label}>
          password
        </label>
        <input
          className={styles.input}
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="submit"
          name="submit"
          value="Login"
          className={styles.submit}
        />

        {error && <div className={styles.errorBox}>{error.message}</div>}
      </form>
    </div>
  );
}
