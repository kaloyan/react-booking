import styles from "./InfoBox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeMessage } from "../../features/slices/localSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function InfoBox() {
  const { messages } = useSelector((state) => state.local);
  const dispatch = useDispatch();

  const handleClose = (e, id) => {
    dispatch(removeMessage(id));
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper"]}>
        {messages.map((x, idx) => (
          <div key={x.id} className={styles[`${x.type}`]}>
            <button onClick={(e) => handleClose(e, x.id)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>

            {x.text}
          </div>
        ))}
      </div>
    </div>
  );
}
