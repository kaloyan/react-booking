import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Dashboard.module.css";
import Modal from "../../ui/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useRequest } from "../../../hooks/useRequest";

export default function Messages() {
  const [modal, setModal] = useState(null);

  const handle = "account";
  const user = useRequest("user", handle);
  const data = useSelector((state) => state.responses[handle]);

  useEffect(() => {
    user.get();
  }, []);

  const handleDelete = async (input) => {
    await user.deleteMsg(input.item.id);
    setModal(null);
  };

  const handleModal = async (id, e) => {
    e.preventDefault();

    const item = data.messages.filter((x) => x._id === id);

    setModal({
      item: item[0],
    });

    return;
  };

  return (
    <section className={styles["grid-container"]}>
      {modal && (
        <Modal
          message={`Are you shure you want to delete this message ?`}
          closeHandler={() => setModal(null)}
          acceptHandler={() => handleDelete(modal)}
        />
      )}

      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faEnvelope} />
          <h1>
            Message Inbox ({(data?.messages && data.messages.length) || "0"})
          </h1>
        </div>
      </div>

      <div className={styles["table"]}>
        <div className={styles["table-head"]}>
          <div className={styles["table-span-1"]}>
            <span>Unread</span>
          </div>

          <div className={styles["table-span-4"]}>
            <span>Message</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Date</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Actions</span>
          </div>
        </div>

        {/* content */}
        {data?.messages &&
          data.messages.map((x) => (
            <div key={x.id}>
              <div className={styles["table-span-tiny"]}>
                {x.unread ? (
                  <FontAwesomeIcon icon={faEnvelope} />
                ) : (
                  <span></span>
                )}
              </div>

              <div className={styles["table-span-4"]}>
                <span className={styles["table-span-4"]}>{x.msg}</span>
              </div>

              <div className={styles["table-span-1"]}>
                {new Date(x.time).toDateString()}
              </div>

              <div className={styles["table-span-1"]}>
                <Link
                  to={`del/${x._id}`}
                  onClick={(e) => handleModal(x._id, e)}
                  className={styles["action-btn"]}
                >
                  <span>Delete</span>
                </Link>
              </div>
            </div>
          ))}
      </div>

      {/* if no message dispay info text */}
      {data?.messages?.length == 0 && (
        <div className={styles["empty-box"]}>
          <FontAwesomeIcon icon={faCircleCheck} />
          No messages
        </div>
      )}
    </section>
  );
}
