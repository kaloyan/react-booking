import { useEffect, useState, useId } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../ui/Modal";
import { useRequest } from "../../../hooks/useRequest";

export default function UsersList() {
  const handle = useId();
  const user = useRequest("user", handle);
  const data = useSelector((state) => state.responses[handle]);

  const [modal, setModal] = useState(null);

  useEffect(() => {
    // window.scrollTo(0, 0);
    user.all();
    return () => user.cleaner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = () => {
    user.remove(modal.item._id);
    setModal(null);
  };

  const handleModal = (id, e) => {
    e.preventDefault();
    const item = data.filter((x) => x._id === id);

    setModal({
      item: item[0],
    });
  };

  return (
    <div className={styles["grid-container"]}>
      {modal && (
        <Modal
          closeHandler={() => setModal(null)}
          acceptHandler={handleDelete}
          message={`Are you shure you want to delete user: ${modal.item.username}?`}
        />
      )}

      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faUsers} />

          <h1>Manage users ({data?.length})</h1>
        </div>
      </div>

      <div className={styles["table"]}>
        <div className={styles["table-head"]}>
          <div className={styles["table-span-1"]}>
            <span>Photo</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Username</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Role</span>
          </div>

          <div className={styles["table-span-2"]}>
            <span>Email</span>
          </div>

          <div className={styles["table-span-2"]}>
            <span>Actions</span>
          </div>
        </div>

        {/* Content */}
        {data?.length > 0 && (
          <>
            {data.map((x) => {
              return (
                <div key={x._id}>
                  <div className={styles["table-span-tiny"]}>
                    {x.avatar ? (
                      <img src={x.avatar} alt="" className={styles["thumb"]} />
                    ) : (
                      <span className={styles["thumb"]}>
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    )}
                  </div>

                  <div className={styles["table-span-1"]}>{x.username}</div>

                  <div className={styles["table-span-1"]}>{x.role}</div>

                  <div className={styles["table-span-2"]}>{x.email}</div>

                  <div className={styles["table-span-2"]}>
                    <Link to={`view/${x._id}`} className={styles["action-btn"]}>
                      <span>View</span>
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
    </div>
  );
}
