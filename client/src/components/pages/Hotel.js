import styles from "./Hotel.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../layouts/Header";
import ImageSlider from "../ui/ImageSlider";
import Subscription from "../ui/Subscribtion";
import { getItem } from "../../services/netReq";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function Hotel() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getItem(id);
      setData(response);
    };

    getData();
  }, [id]);

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
            {!data ? (
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
          </div>
        </>
      )}
    </>
  );
}
