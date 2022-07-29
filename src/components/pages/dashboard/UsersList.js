import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../../services/netRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../ui/Modal";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(null);

  const handleDelete = async () => {
    //todo
  };

  const handleModal = async (id, e) => {
    e.preventDefault();

    const item = users.filter((x) => x._id === id);
    // const imgName = extractImageName(item[0].image);

    setModal({
      item: item[0],
      imageName: "imgName",
    });

    return;
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await getAllUsers();
      setUsers(response);
    };

    getUsers();
  }, []);

  return (
    <div className={styles["grid-container"]}>
      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faUsers} />

          <h1>Manage users</h1>
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
        {users.map((x) => {
          return (
            <div key={x._id}>
              <div className={styles["table-span-tiny"]}>
                {x.avatar ? (
                  <img
                    src={x.avatar}
                    alt="avatar"
                    className={styles["thumb"]}
                  />
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
                <Link to={`edit/${x._id}`} className={styles["action-btn"]}>
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
      </div>
    </div>
  );
}
