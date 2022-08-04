import styles from "./Error.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Error(props) {
  const title = props.error?.title || "Server error";
  const message = props.error?.message || "something went wrong";
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `404 - Not found`;
  }, []);

  return (
    <section className={styles["container"]}>
      <div>
        <div className={styles["error-message"]}>{title}</div>
        <span>{message}</span>
        <div>
          <FontAwesomeIcon icon={faExclamationCircle} />
        </div>
        <div>
          <input type="button" value="Go Back" onClick={() => navigate(-1)} />
        </div>
      </div>
    </section>
  );
}
