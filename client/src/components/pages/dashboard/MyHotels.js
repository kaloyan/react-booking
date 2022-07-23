import styles from "./Dashboard.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOwnHotels, delHotel } from "../../../services/netReq";
import { delHotelImage } from "../../../services/firebaseSrv";
import { pushMessage } from "../../../features/slices/localSlice";
import { extractImageName } from "../../../utils/helpers";
import Modal from "../../ui/Modal";
import MessageBox from "../../ui/MessageBox";

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

    const imageUrls = modal.item.pictures.map((x) => extractImageName(x));

    try {
      Promise.all(imageUrls.map((x) => delHotelImage(x))).then(async (resp) => {
        await delHotel(modal.item._id);
        setShowMessage(false);
        const linkId = modal.item._id;
        navigate(`del/${linkId}`);
      });
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
          <NavLink to={"new"} className={styles["action-btn"]}>
            <span>Add New</span>
          </NavLink>
        </div>
      </div>

      {hotels.length == 0 && (
        <div className={styles["empty-box"]}>No hotels yet :(</div>
      )}

      <div className={styles["table"]}>
        {hotels.map((hotel) => (
          <div key={hotel._id}>
            <div>{hotel.name}</div>

            <div>
              <img
                src={hotel.pictures[0]}
                className={styles["thumb"]}
                alt="hotel"
              />
            </div>

            <div>{hotel.city}</div>

            <div>{hotel.address}</div>

            <div>
              <NavLink
                to={`edit/${hotel._id}`}
                className={styles["action-btn"]}
              >
                <span>Edit</span>
              </NavLink>

              <NavLink
                to={`del/${hotel._id}`}
                onClick={(e) => handleModal(hotel._id, e)}
                className={styles["action-btn"]}
              >
                <span>Delete</span>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
