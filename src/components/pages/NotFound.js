import styles from "./Error.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SearchBar from "../ui/search/SearchBar";

export default function NotFound({ error }) {
  const title = error?.title || "404 - Page not found";
  const message =
    error?.message || "Sorry, we can't find what you're looking for";

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    //document.title = `404 - Not found`;
  }, []);

  return (
    <section className={styles["container"]}>
      <div>
        <div className={styles["error-message"]}>{title}</div>
        <span>{message}</span>
        <div className={styles["search-box"]}>
          <SearchBar />
        </div>
        <div>
          <input type="button" value="Go Back" onClick={() => navigate(-1)} />
        </div>
      </div>
    </section>
  );
}
