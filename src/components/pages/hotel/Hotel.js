import styles from "./Hotel.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../../../services/netRequest";
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
  const [data, setData] = useState(null);
  const [showReserve, setShowReserve] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getItem(id);
      // console.log(response);
      setData(response);
    };

    getData();
  }, [id]);

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
                <FavoritesBox />
              </div>

              <dd className={styles["highlight"]}>
                Book a stay over ${data.cheepestPrice} at this property and get
                a free airport taxi
              </dd>

              <PictureBox pictures={data.pictures} />

              <BookBox showReserve={setShowReserve} />

              <div className={styles["details"]}>
                <div className={styles["details-text"]}>
                  <article> {data.description}</article>
                </div>
              </div>

              <div className={styles["room-list"]}>
                <RoomsList rooms={data.rooms} />
              </div>

              <div className={styles["map"]}>
                <MapBox />
              </div>

              <button
                className={styles["book-btn"]}
                onClick={() => setShowReserve(true)}
              >
                Reserve room Now!
              </button>

              <div className={styles["reviews"]}>
                <ReviewBox />
              </div>
            </div>
          </div>
        )}

        <Subscription />
      </div>
    </section>
  );
}
