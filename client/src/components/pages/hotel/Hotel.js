import styles from "./Hotel.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../layouts/Header";
import ImageSlider from "../../ui/ImageSlider";
import Subscription from "../../ui/Subscribtion";
import Reserve from "./Reserve";
import { getItem } from "../../../services/netReq";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function Hotel() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [showReserve, setShowReserve] = useState(false);

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

  const handleReserve = () => {
    setShowReserve(true);
  };

  const handleCloseReserve = () => {
    setShowReserve(false);
  };

  return (
    <section>
      {showReserve && <Reserve hotelId={id} close={handleCloseReserve} />}

      <Header compact={true} />

      {openSlider ? (
        <div className={styles["backdrop"]}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={styles["close-btn"]}
            onClick={closeHandler}
          />
          <ImageSlider images={data.pictures} />
        </div>
      ) : (
        <>
          <div className={styles["container"]}>
            {!data ? (
              <div>Loading please wait</div>
            ) : (
              <div>
                <div className={styles["wrapper"]}>
                  <h1 className={styles["title"]}>{data.name}</h1>

                  <div className={styles["rating"]}> Rating: {data.rating}</div>

                  <div className={styles["address"]}>
                    Location:
                    <FontAwesomeIcon icon={faLocationDot} />
                    <address>
                      {data.address}, {data.city}, {data.country}
                    </address>
                  </div>

                  <div className={styles["favorite"]}>
                    <button type="button">Add to favorited</button>
                  </div>

                  <dd className={styles["highlight"]}>
                    Book a stay over ${data.cheepestPrice} at this property and
                    get a free airport taxi
                  </dd>

                  <div className={styles["gallery"]}>
                    {data.pictures?.map((image, idx) => (
                      <div key={idx} className={styles["img-wrapper"]}>
                        <img
                          src={image}
                          alt={data.name}
                          className={styles["hotel-image"]}
                          onClick={() => sliderHandler(idx)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className={styles["details-price"]}>
                    <h1>Perfect for 5-night stay</h1>

                    <span>
                      Top Location: Highly rated by recent guests (9.0)
                    </span>

                    <h2>
                      <b>$520</b> (5 nights)
                    </h2>

                    <button type="button" onClick={handleReserve}>
                      Reserve room Now!
                    </button>
                  </div>

                  <div className={styles["details"]}>
                    <div className={styles["details-text"]}>
                      <article> {data.description}</article>
                    </div>
                  </div>

                  <div className={styles["map"]}>map</div>

                  <button
                    className={styles["book-btn"]}
                    onClick={handleReserve}
                  >
                    Reserve room Now!
                  </button>

                  <div className={styles["reviews"]}>reviews goes here</div>
                </div>
              </div>
            )}

            <Subscription />
          </div>
        </>
      )}
    </section>
  );
}
