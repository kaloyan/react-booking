import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAllDestinations,
  deleteDestination,
} from "../../../services/netReq";
import { delDestinationImg } from "../../../services/firebaseSrv";
import Modal from "../../ui/Modal";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [modal, setModal] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      const response = await getAllDestinations();

      setDestinations(response);
    };

    fetchDestinations();
  }, []);

  const handleModal = async (id, e) => {
    e.preventDefault();

    const item = destinations.filter((x) => x._id === id);
    const imgName = item[0].image.split("%2F")[2].split("?")[0];

    setModal({
      item: item[0],
      imageName: imgName,
    });

    return;
  };

  const cloaseDlg = () => {
    setModal(null);
  };

  const doDelete = async () => {
    try {
      const responseItem = await deleteDestination(modal.item._id);
      // console.log(responseItem);
      const responseImage = await delDestinationImg(modal.imageName);
      // console.log(responseImage);

      setModal(null);
      navigate(`del/${modal.item._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={styles["grid-container"]}>
      {modal && (
        <Modal
          message={`Are you shure you want to delete: ${modal.item.name} ?`}
          closeHandler={cloaseDlg}
          acceptHandler={doDelete}
        />
      )}

      <div className={styles["header"]}>
        <h1>Destinations</h1>

        <div>
          <NavLink to={"new"} className={styles["action-btn"]}>
            <span>Add New</span>
          </NavLink>
        </div>
      </div>

      <div className={styles["table"]}>
        {!destinations ? (
          <div>No content</div>
        ) : (
          <>
            {destinations.map((x) => {
              return (
                <div key={x._id}>
                  <div>{x.name}</div>
                  <div>
                    <img
                      src={x.image}
                      alt={x.name}
                      className={styles["thumb"]}
                    />
                  </div>
                  <div>{x.featured ? "featured" : ""}</div>
                  <div>{x.description}</div>
                  <div>
                    <NavLink
                      to={`edit/${x._id}`}
                      className={styles["action-btn"]}
                    >
                      <span>Edit</span>
                    </NavLink>

                    <NavLink
                      to={`del/${x._id}`}
                      onClick={(e) => handleModal(x._id, e)}
                      className={styles["action-btn"]}
                    >
                      <span>Delete</span>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}
