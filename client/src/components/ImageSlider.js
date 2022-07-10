import styles from "./ImageSlider.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function ImageSlider({ slideHandler, closeHandler, imgSrc }) {
  return (
    <>
      <div className={styles.slider}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={styles.closeBtn}
          onClick={closeHandler}
        />
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className={styles.arrowBtn}
          onClick={() => slideHandler("prev")}
        />

        <div className={styles.sliderWrapper}>
          <img className={styles.sliderImage} src={imgSrc} alt="image" />
        </div>

        <FontAwesomeIcon
          icon={faCircleArrowRight}
          className={styles.arrowBtn}
          onClick={() => slideHandler("next")}
        />
      </div>
    </>
  );
}
