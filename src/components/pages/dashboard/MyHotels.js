import styles from "./Dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOwnHotels, delHotel } from "../../../services/netRequest";
import { delHotelImages } from "../../../services/firebaseSrv";
import { pushMessage } from "../../../features/slices/localSlice";
import Modal from "../../ui/Modal";
import MessageBox from "../../ui/MessageBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function MyHotels() {
  const [hotels, setHotels] = useState([]);
  const [modal, setModal] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModal = (id, e) => {
    e.preventDefault();

    const item = hotels.filter((x) => x._id === id);

    setModal({
      item: item[0],
    });

    return;
  };

  const cloaseDlg = () => {
    setModal(null);
  };

  const doDelete = async () => {
    setModal(null);
    setShowMessage(true);

    try {
      await delHotelImages(modal.item._id);
      await delHotel(modal.item._id);

      setShowMessage(false);
      const linkId = modal.item._id;
      navigate(`del/${linkId}`);
    } catch (err) {
      setShowMessage(false);
      console.log(err);
      dispatch(pushMessage(err));
    }

    setShowMessage(false);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      const hotels = await getOwnHotels();
      setHotels(hotels);
    };

    fetchHotels();
  }, []);

  return (
    <section className={styles["grid-container"]}>
      {modal && (
        <Modal
          message={`Are you shure you want to delete: ${modal.item.name} ?`}
          closeHandler={cloaseDlg}
          acceptHandler={doDelete}
        />
      )}

      {showMessage && <MessageBox />}

      <div className={styles["header"]}>
        <h1>My Hotels</h1>

        <div>
          <Link to={"new"} className={styles["action-btn"]}>
            <span>
              <FontAwesomeIcon icon={faPlus} />
              New hotel
            </span>
          </Link>

          {hotels?.length > 0 && (
            <Link to={"rooms/new"} className={styles["action-btn"]}>
              <span>
                <FontAwesomeIcon icon={faPlus} />
                New Room
              </span>
            </Link>
          )}
        </div>
      </div>

      <div className={styles["table"]}>
        <div className={styles["table-head"]}>
          <div className={styles["table-span-1"]}>
            <span>Picture</span>
          </div>

          <div className={styles["table-span-2"]}>
            <span>Hotel Name</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Rooms</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Reservations</span>
          </div>

          <div className={styles["table-span-2"]}>
            <span>Actions</span>
          </div>
        </div>

        {hotels.map((hotel) => (
          <div key={hotel._id}>
            <div className={styles["table-span-1"]}>
              <img
                src={hotel.pictures[0]}
                className={styles["thumb"]}
                alt="hotel"
              />
            </div>

            <div className={styles["table-span-2"]}>{hotel.name}</div>

            <div className={styles["table-span-1"]}>
              {hotel.rooms.reduce((acc, x) => x.roomNumbers.length + acc, 0)}
            </div>

            <div className={styles["table-span-1"]}>
              {hotel.reservations.length}
            </div>

            <div className={styles["table-span-2"]}>
              <Link
                to={`/catalog/${hotel._id}`}
                className={styles["action-btn"]}
              >
                <span>View</span>
              </Link>

              <Link to={`edit/${hotel._id}`} className={styles["action-btn"]}>
                <span>Edit</span>
              </Link>

              <Link
                to={`del/${hotel._id}`}
                onClick={(e) => handleModal(hotel._id, e)}
                className={styles["action-btn"]}
              >
                <span>Delete</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {hotels.length == 0 && (
        <div className={styles["empty-box"]}>You dont have any hotels yet</div>
      )}
    </section>
  );
}
