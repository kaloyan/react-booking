import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  getOneHotel,
  updateHotel,
  deleteRoom,
  updateRoom,
} from "../../../services/netRequest";
import { pushMessage } from "../../../features/slices/localSlice";
import ImageBox from "../../ui/ImageBox";
import MessageBox from "../../ui/MessageBox";
import countries from "../../../assets/countries.json";
import Modal from "../../ui/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

export default function EditHotel() {
  const [hotel, setHotel] = useState({});
  const [pictures, setPictures] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams("id");

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "hotel",
      city: "",
      address: "",
      country: "",
      pictures: [],
      description: "",
      cheepestPrice: "",
      featured: false,
    },

    onSubmit: async (values) => {
      setShowMessage(true);

      try {
        await updateHotel(id, {
          name: values.name,
          type: values.type,
          city: values.city,
          address: values.address,
          country: values.country,
          description: values.description,
          cheepestPrice: Number(values.cheepestPrice),
          featured: values.featured,
        });

        setShowMessage(false);
        navigate("../hotels");
      } catch (err) {
        setShowMessage(false);

        dispatch(
          pushMessage({
            text: err,
            type: "error",
          })
        );
      }
    },
  });

  const navigate = useNavigate();

  const handleGetPictures = (files) => {
    // const files = Array.from(e.target.files);
    setPictures(files);
  };

  const handleModal = (e) => {
    const item = hotel.rooms.filter((x) => x._id == e.target.value);
    setModal(item[0]);
  };

  const handleClose = () => {
    setModal(null);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteRoom(modal._id);

      if (response._id == modal._id) {
        hotel.rooms = hotel.rooms.filter((x) => x._id !== modal._id);
      } else {
        throw "Server error";
      }
    } catch (err) {
      setModal(null);

      dispatch(
        pushMessage({
          text: err,
          type: "error",
        })
      );
    }

    setModal(null);
  };

  useEffect(() => {
    const fetchHotel = async () => {
      const hotel = await getOneHotel(id);

      if (hotel?.response?.status == 400) {
        dispatch(
          pushMessage({
            text: "Server error",
            type: "error",
          })
        );
      } else {
        formik.setValues({
          name: hotel.name,
          type: hotel.type,
          city: hotel.city,
          address: hotel.address,
          country: hotel.country,
          pictures: hotel.pictures,
          description: hotel.description,
          cheepestPrice: hotel.cheepestPrice,
          featured: hotel.featured,
        });

        setHotel(hotel);
        setPictures(hotel.pictures);
      }
    };

    fetchHotel();
  }, [id]);

  return (
    <form onSubmit={formik.handleSubmit}>
      {showMessage && <MessageBox />}

      {modal && (
        <Modal
          message={`Are you shure you want to delete room: ${modal.title}`}
          closeHandler={handleClose}
          acceptHandler={handleDelete}
        />
      )}

      <section className={styles["grid-container"]}>
        <div className={styles["header"]}>
          <div className={styles["bread-crump"]}>
            <FontAwesomeIcon icon={faHotel} />

            <h1>Edit Hotel</h1>
          </div>

          <div>
            <Link to={"../hotels/rooms/new"} className={styles["action-btn"]}>
              <span>New room</span>
            </Link>

            <Link to={"../hotels"} className={styles["action-btn"]}>
              <span>Cancel</span>
            </Link>
          </div>
        </div>

        <div className={styles["side"]}>
          {/* <ImageBox handleGetPictures={handleGetPictures} /> */}
          <div>
            <button type="button">Change pictures</button>
          </div>
          <div>
            {pictures.map((x, idx) => (
              <img src={x} alt="image" key={idx} className={styles["thumb"]} />
            ))}
          </div>
        </div>

        <div className={styles["content"]}>
          <div className={styles["item"]}>
            <label>Hotel name: </label>
            <input
              type="text"
              placeholder="example: Hilton"
              name="name"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label>Type: </label>
            <select
              name="type"
              id="featured"
              required
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <option value="hotel">Hotel</option>
              <option value="villa">Villa</option>
              <option value="resort">Resort</option>
              <option value="apartment">Apartment</option>
              <option value="cabin">Cabin</option>
            </select>
          </div>

          <div className={styles["item"]}>
            <label>Country: </label>
            <input
              list="country"
              name="country"
              required
              placeholder="example: Bulgaria"
              value={formik.values.country}
              onChange={formik.handleChange}
            />
            <datalist id="country">
              {countries.map((x) => (
                <option value={x.name} key={x.code} />
              ))}
            </datalist>
          </div>

          <div className={styles["item"]}>
            <label>City: </label>
            <input
              type="text"
              placeholder="example: Sofia"
              required
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label>Address: </label>
            <input
              type="text"
              placeholder="example: bul. Dondukov 1"
              required
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label>Cheapest room price: </label>
            <input
              type="number"
              placeholder=""
              required
              name="cheepestPrice"
              value={formik.values.cheepestPrice}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item-wide"]}>
            <label>Description: </label>
            <textarea
              name="description"
              id="description"
              rows="7"
              required
              placeholder="Please provide detailed description of the property"
              value={formik.values.description}
              onChange={formik.handleChange}
            ></textarea>
          </div>

          <div className={styles["item"]}>
            <label>Featured: </label>
            <select
              name="featured"
              id="featured"
              required
              value={formik.values.featured}
              onChange={formik.handleChange}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>

          <hr />

          <div>
            <h2>Hotel rooms:</h2>
          </div>

          <ul className={styles["grid-list"]}>
            <li>
              <div>Room title:</div>
              <div>Price:</div>
              <div>Max guests:</div>
              <div>rooms:</div>
              <div>Actions</div>
            </li>
            {hotel?.rooms?.map((room) => (
              <li key={room._id} className={styles["grid-col-span-2"]}>
                <div> {room.title} </div>
                <div> ${room.price} </div>
                <div> {room.maxPeople}</div>
                <div> [{room.roomNumbers.join("; ")}]</div>

                <div>
                  <Link to={`../hotels/rooms/edit/${room._id}`}>Edit</Link>
                  <button type="button" value={room._id} onClick={handleModal}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {hotel?.rooms?.lenght < 10 && (
            <div className={styles["grid-col-span-2"]}>No rooms yet</div>
          )}

          <div></div>

          <div className={styles["item"]}>
            <input type="submit" value="Save Changes" />
          </div>
        </div>
      </section>
    </form>
  );
}
