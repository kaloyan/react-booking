import styles from "./Login.module.css";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();

    console.log(username, password);
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
      </form>
    </div>
  );
}
