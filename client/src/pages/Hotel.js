import styles from "./Hotel.module.css";

import { useState } from "react";

import { useFetch } from "../hooks/useFetch.js";

import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";
import Subscription from "../components/Subscribtion";
import Footer from "../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

export default function Hotel() {
  const location = useLocation();

  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/v1${location.pathname}`
  );

  const [openSlider, setOpenSlider] = useState(false);

  const sliderHandler = (idx) => {
    setOpenSlider(true);
  };

  const closeHandler = () => {
    setOpenSlider(false);
  };

  return (
    <>
      <Header compact={true} />

      {openSlider ? (
        <div className={styles.backdrop}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={styles.closeBtn}
            onClick={closeHandler}
          />
          <ImageSlider images={data.pictures} />
        </div>
      ) : (
        <>
          <div className={styles.container}>
            {loading ? (
              <div>Loading please wait</div>
            ) : (
              <>
                <div className={styles.wrapper}>
                  <button className={styles.bookBtn}>
                    Reserve or book Now!
                  </button>

                  <h1 className={styles.title}>{data.name}</h1>

                  <div className={styles.address}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>
                      {data.address} {data.city}
                    </span>
                  </div>

                  <span className={styles.distance}>
                    Excellent location: {data.distance}
                  </span>

                  <span className={styles.highlight}>
                    Book a stay over ${data.cheepestPrice} at this property and
                    get a free airport taxi
                  </span>

                  <div className={styles.gallery}>
                    {data.pictures?.map((image, idx) => (
                      <div key={idx} className={styles.imgWrapper}>
                        <img
                          src={image}
                          alt={data.name}
                          className={styles.hotelImage}
                          onClick={() => sliderHandler(idx)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className={styles.details}>
                    <div className={styles.detailsText}>
                      <h1>{data.title}</h1>
                      <p>{data.description}</p>
                    </div>

                    <div className={styles.detailsPrice}>
                      <h1>Perfect for 5-night stay</h1>

                      <span>
                        Top Location: Highly rated by recent guests (9.0)
                      </span>

                      <h2>
                        <b>$520</b> (5 nights)
                      </h2>

                      <button>Reserve or book Now!</button>
                    </div>
                  </div>
                </div>
              </>
            )}

            <Subscription />

            <Footer />
          </div>
        </>
      )}
    </>
  );
}
