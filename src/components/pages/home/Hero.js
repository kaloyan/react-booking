import styles from "./Hero.module.css";
import { getHeroImage } from "../../../utils/helpers";
import { useEffect, useState } from "react";

export default function Hero(props) {
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(getHeroImage());
  }, []);

  return (
    <div className={styles["hero"]}>
      <img src={image} alt="" />

      {props.children}
    </div>
  );
}
