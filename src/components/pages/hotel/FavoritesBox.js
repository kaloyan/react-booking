import { useFavorites } from "../../../hooks/useFavorites";
import styles from "./FavoritesBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function FavoritesBox({ id }) {
  const favorites = useFavorites(id);

  const handleToFavorites = () => {
    if (favorites.isActive) {
      favorites.remove();
    } else {
      favorites.save();
    }
  };

  return (
    <div className={styles["favbox"]} onClick={handleToFavorites}>
      <div
        className={`${styles["icon"]} ${favorites.isActive && styles["saved"]}`}
      >
        <FontAwesomeIcon icon={faStar} />
      </div>
      <span>
        {favorites.isActive ? "Remove from favorites" : "Add to favorited"}
      </span>
    </div>
  );
}
