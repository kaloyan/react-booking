import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./FavoriteBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

export default function FavoriteBox() {
  const { favorites } = useSelector((state) => state.local);

  return (
    <>
      {favorites?.length > 0 && (
        <Link to="/catalog/favorites" className={styles["container"]}>
          <div className={styles["icon"]} data-content={favorites.length}>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </Link>
      )}
    </>
  );
}
