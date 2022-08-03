import styles from "./ImageSelect.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";

export default function ImageSelect({ handleGetPictures, pictures, single }) {
  const [imgs, setImgs] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const filesRef = useRef(null);

  useEffect(() => {
    handleGetPictures(selectedFiles);
  }, [selectedFiles]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedFiles(files);

    // setImgs(window.URL.createObjectURL(e.target.files[0]));
    setImgs(
      files.map((x) => ({
        url: window.URL.createObjectURL(x),
        id: uuid(),
      }))
    );
  };

  const handleRemoveImg = (idx, id) => {
    // filter images
    setSelectedFiles(selectedFiles.filter((x, i) => i !== idx));
    setImgs(imgs.filter((x) => x.id !== id));
  };

  return (
    <div className={styles["container"]}>
      <div>
        {imgs.length > 0 ? (
          <div className={styles["photo-box"]}>
            {imgs.map((x, idx) => (
              <div key={x.id} className={styles["image-box"]}>
                <img src={x.url} className={styles["thumb"]} alt="photo" />
                <button
                  type="button"
                  onClick={() => handleRemoveImg(idx, x.id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            ))}
          </div>
        ) : pictures?.length > 0 ? (
          <div className={styles["photo-box"]}>
            {pictures.map((x, idx) => (
              <div key={idx} className={styles["image-box"]}>
                <img src={x} className={styles["thumb"]} alt="photo" />
              </div>
            ))}
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faCamera}
            className={styles["image-select"]}
            onClick={() => filesRef.current.click()}
          />
        )}
      </div>

      <div>
        <label htmlFor="image-select" className={styles["file-upload"]}>
          Select images
        </label>
        <input
          type="file"
          id="image-select"
          accept="image/*"
          multiple={!single}
          ref={filesRef}
          onChange={handleChange}
          className={styles["input-select-files"]}
        />
      </div>
    </div>
  );
}
