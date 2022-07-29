// import styles from "./Forms.module.css";
import styles from "./Dashboard.module.css";
import { getAccount } from "../../../services/netRequest";
import { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [modal, setModal] = useState(null);

  const handleDelete = async () => {
    //todo
  };

  const handleModal = async (id, e) => {
    e.preventDefault();

    const item = messages.filter((x) => x._id === id);
    // const imgName = extractImageName(item[0].image);

    setModal({
      item: item[0],
      imageName: "imgName",
    });

    return;
  };

  useEffect(() => {
    const getMessages = async () => {
      const response = await getAccount();
      console.log(response);
      setMessages(response.messages);
    };

    getMessages();
  }, []);

  return (
    <section className={styles["grid-container"]}>
      {modal && (
        <Modal
          message={`Are you shure you want to delete this message ?`}
          closeHandler={() => setModal(null)}
          acceptHandler={handleDelete}
        />
      )}

      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faEnvelope} />
          <h1>Message Inbox</h1>
        </div>
      </div>

      <div className={styles["table"]}>
        <div className={styles["table-head"]}>
          <div className={styles["table-span-1"]}>
            <span>Unread</span>
          </div>

          <div className={styles["table-span-3"]}>
            <span>Message</span>
          </div>

          <div className={styles["table-span-1"]}>
            <span>Date</span>
          </div>

          <div className={styles["table-span-2"]}>
            <span>Actions</span>
          </div>
        </div>

        {/* if no message dispay info text */}
        {messages.length == 0 && (
          <div>
            <div className={styles["empty-box"]}>
              No messages
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
          </div>
        )}

        {/* content */}
        {messages.map((x) => {
          return (
            <div key={x._id}>
              <div className={styles["table-span-tiny"]}>
                {x.unread ? (
                  <FontAwesomeIcon icon={faEnvelope} />
                ) : (
                  <span></span>
                )}
              </div>

              <div className={styles["long-mgs"]}>
                <span className={styles["long-mgsa"]}>
                  {x.msg.length > 50 ? x.msg.substring(0, 60) + " ..." : x.msg}
                </span>
              </div>

              <div className={styles["table-span-1"]}>
                {new Date(x.time).toDateString()}
              </div>

              <div className={styles["table-span-2"]}>
                <Link to={`edit/${x._id}`} className={styles["action-btn"]}>
                  <span>Open</span>
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
    </section>
  );
}
