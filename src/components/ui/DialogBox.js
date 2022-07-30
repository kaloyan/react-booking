import styles from "./DialogBox.module.css";

import { useId } from "react";
import { useRequest } from "../../hooks/useRequest";
import { extractImageName } from "../../utils/helpers";
import { delDestinationImg } from "../../services/firebaseSrv";

export default function DialogBox(props) {
  const handle = useId();
  const module = useRequest(props.module, handle);

  const handleAccept = (e, next) => {
    e.preventDefault();

    module[props.action](props.item._id)
      .then(() => {
        module.cleaner();

        const imageName = extractImageName(props.item.image);
        delDestinationImg(imageName);
      })
      .finally(() => {
        next();
      });
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["dialog"]}>
        <div>{props.message}</div>

        <div className={styles["controls"]}>
          <button type="button" onClick={(e) => handleAccept(e, props.accept)}>
            Yes
          </button>
          <button type="button" onClick={props.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
