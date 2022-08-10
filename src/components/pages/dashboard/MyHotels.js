import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRequest } from "../../../hooks/useRequest";
import { pushMessage } from "../../../features/slices/localSlice";

import Modal from "../../ui/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHotel } from "@fortawesome/free-solid-svg-icons";

export default function MyHotels() {
  const handle = useId();
  const catalog = useRequest("catalog", handle);
  const data = useSelector((state) => state.responses[handle]);
  const imageService = useRequest("imageServices", "imagesUpload");
  const [modal, setModal] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    catalog.getOwn();
    return () => catalog.cleaner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModal = (id, e) => {
    e.preventDefault();

    const item = data.filter((x) => x._id === id);

    setModal({
      item: item[0],
    });

    return;
  };

  const doDelete = () => {
    setModal(null);

    catalog.delete(modal.item._id).then(async () => {
      await imageService.deleteHotelImages(modal.item._id);
      catalog.getOwn();
      dispatch(
        pushMessage({ text: "Hotel deleted successfully", type: "success" })
      );
    });
  };

  return (
    <section className={styles["grid-container"]}>
      {modal && (
        <Modal
          message={`Are you shure you want to delete: ${modal.item.name} ?`}
          closeHandler={() => setModal(null)}
          acceptHandler={doDelete}
        />
      )}

      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faHotel} />
          <h1>My Hotels</h1>
        </div>

        <div>
          <Link to={"new"} className={styles["action-btn"]}>
            <span>
              <FontAwesomeIcon icon={faPlus} />
              New hotel
            </span>
          </Link>

          {data?.length > 0 && (
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

        {data?.length > 0 &&
          data.map((hotel) => (
            <div key={hotel._id}>
              <div className={styles["table-span-1"]}>
                <img
                  src={hotel.pictures[0]}
                  className={styles["thumb"]}
                  alt=""
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

      {data?.length === 0 && (
        <div className={styles["empty-box"]}>You dont have any hotels yet</div>
      )}
    </section>
  );
}
