import styles from "./Dashboard.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { uploadDest } from "../../../services/firebaseSrv";
import { createDestination } from "../../../services/netReq";
import { useNavigate } from "react-router-dom";

export default function NewDestination() {
  const [picture, setPicture] = useState([]);
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [featured, setFeatured] = useState(false);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleGetPictures = (e) => {
    const files = Array.from(e.target.files);
    setPicture(files[0]);

    // setImgs(files.map((x) => window.URL.createObjectURL(x)));
    setImg(window.URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //!TODO - show loading component

    const pictureUrl = await uploadDest(picture);
    // const pictureUrl = picture.name;

    const response = await createDestination({
      name,
      image: pictureUrl,
      description,
      featured: featured,
    });

    // console.log(response);
    navigate("../destinations");
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className={styles["grid-container"]}>
        <div className={styles["header"]}>
          <h1>New Destination</h1>

          <div>
            <NavLink to={"../destinations"} className={styles["action-btn"]}>
              <span>Cancel</span>
            </NavLink>
          </div>
        </div>

        <div className={styles["side"]}>
          <div>
            {img ? (
              <div className={styles["photo-box"]}>
                {/* {imgs.map((x) => ( */}
                <img src={img} className={styles["single"]} alt="photo" />
                {/* ))} */}
              </div>
            ) : (
              <FontAwesomeIcon icon={faCamera} className={styles["avatar"]} />
            )}
          </div>

          <div>
            <label htmlFor="avatar" className={styles["file-upload"]}>
              Select photo
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              required
              onChange={handleGetPictures}
            />
          </div>
        </div>

        <div className={styles["content"]}>
          <div className={styles["item"]}>
            <label>Destination name: </label>
            <input
              type="text"
              placeholder="example: London"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles["item"]}>
            <label>Description: </label>
            <input
              type="text"
              placeholder="example: Bring your umbrella"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles["item"]}>
            <label>Featured: </label>
            <select
              name="featured"
              id="featured"
              required
              value={featured}
              onChange={(e) => setFeatured(e.target.value)}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>

          <div></div>

          <div></div>
          <div className={styles["item"]}>
            <input type="submit" value="Create Destination" />
          </div>
        </div>
      </section>
    </form>
  );
}
