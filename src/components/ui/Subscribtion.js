import { useRef } from "react";
import { useDispatch } from "react-redux";
import { pushMessage } from "../../features/slices/localSlice";
import styles from "./Subscribtion.module.css";

export default function Subscribtion() {
  const emailRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubscribe = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    dispatch(
      pushMessage({
        text: `${email} is now subscribed to our newsletter.`,
        type: "success",
      })
    );

    emailRef.current.value = "";
  };

  return (
    <form className={styles["container"]} onSubmit={handleSubscribe}>
      <h1 className={styles["title"]}>Subscribe to our newsletter</h1>

      <span className={styles["description"]}>
        Sign up and we'll send the best deals to you
      </span>

      <div className={styles["input-container"]}>
        <input
          type="email"
          required
          className={styles.emailInput}
          placeholder="Your email"
          ref={emailRef}
        />

        <button className={styles["subscribe-btn"]} type="submit">
          Subscribe
        </button>
      </div>
    </form>
  );
}
