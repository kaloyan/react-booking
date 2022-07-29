import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllDestinations,
  deleteDestination,
} from "../../../services/netRequest";
import { delDestinationImg } from "../../../services/firebaseSrv";
import Modal from "../../ui/Modal";
import { extractImageName } from "../../../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

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
    const imgName = extractImageName(item[0].image);

    setModal({
      item: item[0],
      imageName: imgName,
    });

    return;
  };

  const handleDelete = async () => {
    try {
      await deleteDestination(modal.item._id);
      await delDestinationImg(modal.imageName);

      const linkId = modal.item._id;
      setModal(null);
      navigate(`del/${linkId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={styles["grid-container"]}>
      {modal && (
        <Modal
          message={`Are you shure you want to delete: ${modal.item.name} ?`}
          closeHandler={() => setModal(null)}
          acceptHandler={handleDelete}
        />
      )}

      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faMapLocationDot} />
          <h1>Destinations</h1>
        </div>

        <div>
          <Link to={"new"} className={styles["action-btn"]}>
            <span>Add New</span>
          </Link>
        </div>
      </div>

      <div className={styles["table"]}>
        <div className={styles["table-head"]}>
          <div className={styles["table-span-1"]}>
            <span>Picture</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Destination</span>
          </div>

          <div className={styles["table-span-2"]}>
            <span>Description</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Is Featured</span>
          </div>

          <div className={styles["table-span-2"]}>
            <span>Actions</span>
          </div>
        </div>

        {!destinations ? (
          <div>No content</div>
        ) : (
          <>
            {destinations.map((x) => {
              return (
                <div key={x._id}>
                  <div className={styles["table-span-1"]}>
                    <img
                      src={x.image}
                      alt={x.name}
                      className={styles["thumb"]}
                    />
                  </div>

                  <div className={styles["table-span-1"]}>{x.name}</div>

                  <div className={styles["table-span-2"]}>{x.description}</div>

                  <div className={styles["table-span-1"]}>
                    {x.featured ? "featured" : ""}
                  </div>

                  <div className={styles["table-span-2"]}>
                    <Link to={`edit/${x._id}`} className={styles["action-btn"]}>
                      <span>Edit</span>
                    </Link>

                    <Link
                      to={`del/${x._id}`}
                      onClick={(e) => handleModal(x._id, e)}
                      className={styles["action-btn"]}
                    >
                      <span>Delete</span>
                    </Link>
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
