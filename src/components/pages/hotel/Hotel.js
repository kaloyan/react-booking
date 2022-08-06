import styles from "./Hotel.module.css";
import { useEffect, useState, useId } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRequest } from "../../../hooks/useRequest";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

// import components
import Header from "../../layouts/Header";
import Subscription from "../../ui/Subscribtion";
import Reserve from "./reserve/Reserve";
import BookBox from "./BookBox";
import MapBox from "./MapBox";
import RoomsList from "./RoomsList";
import ReviewBox from "./ReviewBox";
import FavoritesBox from "./FavoritesBox";
import PictureBox from "./PictureBox";

export default function Hotel() {
  const { id } = useParams();
  const [showReserve, setShowReserve] = useState(false);
  const [lowestPrice, setLowestPrice] = useState(0);

  const handle = useId();
  const catalog = useRequest("catalog", handle);
  const data = useSelector((state) => state.responses[handle]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id) {
      catalog.get(id);
    }

    return () => catalog.cleaner();
  }, [id]);

  useEffect(() => {
    if (data) {
      const lowest = Math.min(...data.rooms.map((x) => x.price));
      setLowestPrice(lowest);
    }
  }, [data]);

  return (
    <section>
      {showReserve && (
        <Reserve
          rooms={data.rooms}
          close={() => setShowReserve(false)}
          hotelId={id}
        />
      )}

      <Header compact={true} />

      <div className={styles["container"]}>
        {data && (
          <div>
            <div className={styles["wrapper"]}>
              <div className={styles["grid-span-3"]}>
                <h1 className={styles["title"]}>{data.name}</h1>

                <div className={styles["address"]}>
                  Location:
                  <FontAwesomeIcon icon={faLocationDot} />
                  <address>
                    {data.address}, {data.city}, {data.country}
                  </address>
                </div>

                <PictureBox pictures={data.pictures} />
              </div>

              <div className={styles["grid-span-1"]}>
                <div className={styles["rating"]}>
                  Rating: <span>{data.rating >= 4 ? "Excellent" : "Good"}</span>
                  <button>{data.rating}</button>
                </div>

                {/* <div className={styles["favorite"]}> */}
                <FavoritesBox />
                {/* </div> */}

                <dd className={styles["highlight"]}>
                  Book a stay over ${lowestPrice * 5} at this property and get a
                  free airport taxi
                </dd>

                <BookBox
                  showReserve={setShowReserve}
                  price={lowestPrice}
                  rating={data.rating}
                />
              </div>

              <div className={styles["grid-span-4"]}>
                <div className={styles["details"]}>
                  <div className={styles["details-text"]}>
                    <article> {data.description}</article>
                  </div>
                </div>

                <div className={styles["grid-span-4"]}>
                  <RoomsList rooms={data.rooms} />
                </div>

                <hr />

                {/* <div className={styles["map"]}>
                <MapBox />
              </div> */}

                {/* <div>
                  <button
                    className={styles["book-btn"]}
                    onClick={() => setShowReserve(true)}
                  >
                    Reserve room Now!
                  </button>
                </div> */}

                <div className={styles["reviews"]}>
                  <ReviewBox />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Subscription />
    </section>
  );
}
