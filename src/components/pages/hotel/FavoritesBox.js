import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFavorites } from "../../../hooks/useFavorites";

import styles from "./FavoritesBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function FavoritesBox() {
  const location = useLocation();
  const favorites = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const itemId = location.pathname.split("/").pop();
  // console.log(itemId);

  useEffect(() => {
    //todo
    const isSaved = favorites.checkCurrent(itemId);
    // console.log(isSaved);
    setIsFavorite(isSaved);
  }, []);

  const handleToFavorites = () => {
    //todo
    console.log("click");
  };

  return (
    <div className={styles["favbox"]} onClick={handleToFavorites}>
      <div className={`${styles["icon"]} ${isFavorite && styles["saved"]}`}>
        <FontAwesomeIcon icon={faStar} />
      </div>
      <span>{isFavorite ? "Remove from favorites" : "Add to favorited"}</span>
    </div>
  );
}
