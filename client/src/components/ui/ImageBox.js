import styles from "./ImageBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function ImageBox({ handleGetPictures }) {
  const [imgs, setImgs] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  useEffect(() => {
    handleGetPictures(selectedFiles);
  }, [selectedFiles]);

  // useEffect(() => {
  //   setImgs(images);
  // }, [images]);

  return (
    <div>
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
        ) : (
          <FontAwesomeIcon icon={faCamera} className={styles["image-select"]} />
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
          multiple
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
