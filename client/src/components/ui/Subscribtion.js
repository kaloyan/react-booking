import styles from "./Subscribtion.module.css";

export default function Subscribtion() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Save time, save money!</h1>

      <span className={styles.description}>
        Sign up and we'll send the best deals to you
      </span>

      <div className={styles.inputContainer}>
        <input
          type="email"
          className={styles.emailInput}
          placeholder="Your email"
        />

        <button className={styles.subscribeBtn}>Subscribe</button>
      </div>
    </div>
  );
}
