import "bear-react-carousel/dist/index.css";
import styles from "./PictureBox.module.css";

import BearCarousel, { BearSlideItem } from "bear-react-carousel";
import { useRef } from "react";

export default function PictureBox({ pictures }) {
  const carouselRef = useRef(null);

  const carouselData = pictures.map((image, i) => {
    return {
      key: i,
      children: <BearSlideItem imageUrl={image} />,
    };
  });

  const smallCarouselData = pictures.map((image, i) => {
    return {
      key: i,
      children: (
        <BearSlideItem
          imageUrl={image}
          onClick={() => carouselRef.current.goToActualIndex(i + 1)}
        />
      ),
    };
  });

  return (
    <section className={styles["gallery"]}>
      <BearCarousel
        className={styles["carousel"]}
        data={carouselData}
        isEnableLoop
        isEnableNavButton
        isEnablePagination
        spaceBetween={20}
        ref={carouselRef}
        aspectRatio={{ widthRatio: 16, heightRatio: 9 }}
      />

      <BearCarousel
        className={styles["carousel-small"]}
        data={smallCarouselData}
        isEnableNavButton
        spaceBetween={20}
        staticHeight="100px"
        isEnableLoop
        slidesPerView={7}
      />
    </section>
  );
}
