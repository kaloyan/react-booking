import styles from "./Hotel.module.css";

import { useState } from "react";

import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";
import Subscription from "../components/Subscribtion";
import Footer from "../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Hotel() {
  const [imgIndex, setImgIndex] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);

  const sliderHandler = (idx) => {
    setImgIndex(idx);
    setOpenSlider(true);
  };

  const closeHandler = () => {
    setOpenSlider(false);
  };

  const slideHandler = (direction) => {
    let idx = direction == "next" ? imgIndex + 1 : imgIndex - 1;

    if (idx < 0) {
      idx = images.length - 1;
    } else if (idx > images.length - 1) {
      idx = 0;
    }

    setImgIndex(idx);
  };

  const images = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/334096260.jpg?k=a628011df426a415ef2680fca4b8fd1ee1fb4ca7e82e23feb64844b4dd2db93f&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/334096262.jpg?k=a335fe67967c2e97fb2dd353403e379a2eac1b032410eeae70edac7a62269354&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/334096263.jpg?k=176f52ed1e36400c7731bb16868e3bcf592cdc74f4fa55826c5d48d26ec1953a&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/334096272.jpg?k=a9ae20bc9ebde46988bd9625d5a9e31824b483ea181025d6e7ef55d20c1644c3&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/334096274.jpg?k=96fbf05fb3bed591058f95b50620d6d21145be1ba155ac66ba60fe0717938832&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/334096276.jpg?k=e511cd09c3ec90978c53d26868175d12f94687e0498dd63d272ac9da8c7a086b&o=&hp=1",
    },
  ];

  return (
    <>
      <Header compact={true} />

      <div className={styles.container}>
        {openSlider && (
          <ImageSlider
            slideHandler={slideHandler}
            closeHandler={closeHandler}
            imgSrc={images[imgIndex].src}
          />
        )}

        <div className={styles.wrapper}>
          <button className={styles.bookBtn}>Reserve or book Now!</button>

          <h1 className={styles.title}>Grand Hotel</h1>

          <div className={styles.address}>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton St. 125 New York</span>
          </div>

          <span className={styles.distance}>
            Excellent location: 500m from center
          </span>

          <span className={styles.highlight}>
            Book a stay over $120 at this property and get a free airport taxi
          </span>

          <div className={styles.gallery}>
            {images.map((image, idx) => (
              <div key={idx} className={styles.imgWrapper}>
                <img
                  src={image.src}
                  alt="hotel"
                  className={styles.hotelImage}
                  onClick={() => sliderHandler(idx)}
                />
              </div>
            ))}
          </div>

          <div className={styles.details}>
            <div className={styles.detailsText}>
              <h1>Stay in the heart of Myrtle Beach</h1>
              <p>
                Located 2.4 km from Myrtle Beach, Myrtle Beach Getaway 1 has
                accommodations in Myrtle Beach with an outdoor pool, free WiFi
                and an ATM. This property has a balcony. The air-conditioned
                vacation home consists of 1 separate bedroom, 1 bathroom with a
                hairdryer and free toiletries, and a seating area. There's a
                dining area and a kitchen complete with a dishwasher, a
                microwave and a fridge. Cycling can be enjoyed nearby. Broadway
                at the Beach is 2.7 km from the vacation home, while Myrtle
                Beach Convention Center is 3.5 km from the property. The nearest
                airport is Myrtle Beach International Airport, 9.7 km from
                Myrtle Beach Getaway 1. Myrtle Beach Getaway 1 has been
                welcoming Booking.com guests since Jan 5, 2022
              </p>
            </div>

            <div className={styles.detailsPrice}>
              <h1>Perfect for 5-night stay</h1>

              <span>Top Location: Highly rated by recent guests (9.0)</span>

              <h2>
                <b>$520</b> (5 nights)
              </h2>

              <button>Reserve or book Now!</button>
            </div>
          </div>
        </div>

        <Subscription />

        <Footer />
      </div>
    </>
  );
}
