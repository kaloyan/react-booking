import styles from "./Dashboard.module.css";

import { useEffect, useState, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useRequest } from "../../../hooks/useRequest";
import DialogBox from "../../ui/DialogBox";

export default function Destinations() {
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  const handle = useId();
  const destinations = useRequest("destinations", handle);
  const data = useSelector((state) => state.responses[handle]);

  useEffect(() => {
    destinations.all();

    return () => destinations.cleaner();
  }, []);

  const handleModal = async (id, e) => {
    e.preventDefault();

    const item = data.filter((x) => x._id === id);

    setItem(item[0]);

    return;
  };

  return (
    <section className={styles["grid-container"]}>
      {item && (
        <DialogBox
          message={`DialogBox: Are you shure you want to delete: ${item.name} ?`}
          accept={() => navigate(`del/${item._id}`)}
          cancel={() => setItem(null)}
          module={"destinations"}
          item={item}
          action="delete"
        />
      )}

      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faMapLocationDot} />
          <h1>Destinations ({data?.length})</h1>
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

        {data?.map((x) => {
          return (
            <div key={x._id}>
              <div className={styles["table-span-1"]}>
                <img src={x.image} alt={""} className={styles["thumb"]} />
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
      </div>

      {data?.length == 0 && (
        <div className={styles["empty-box"]}>No destinations</div>
      )}
    </section>
  );
}
