import styles from "./Dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOwnHotels } from "../../../services/netRequest";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createRoom } from "../../../services/netRequest";
import { pushMessage } from "../../../features/slices/localSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";

export default function NewRoom() {
  const [hotels, setHotels] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newRoom = {
    title: "",
    description: "",
    rooms: [],
    price: "",
    maxpeople: "",
    hotel: "",
  };

  const showMessage = (msg, type) => {
    dispatch(
      pushMessage({
        text: msg,
        type: type,
      })
    );
  };

  const formik = useFormik({
    initialValues: { ...newRoom },

    onSubmit: async (values) => {
      if (values.hotel === "") {
        showMessage("Please selet a hotel", "error");
        return;
      }

      let rooms = null;

      try {
        rooms = values.rooms.split(",").map((x) => Number(x.trim()));
      } catch {
        showMessage("Please provide correct room numbers", "error");
        return;
      }

      if (!rooms) {
        showMessage("Please provide correct room numbers", "error");
        return;
      }

      for (const room of rooms) {
        if (typeof room != "number" || isNaN(room)) {
          showMessage("Please provide correct room numbers", "error");
          return;
        }
      }

      const hotelId = values.hotel;

      const data = {
        title: values.title,
        description: values.description,
        price: Number(values.price),
        maxPeople: Number(values.maxpeople),
        roomNumbers: rooms,
      };

      const response = await createRoom(hotelId, data);

      if (response) {
        formik.values.title = "";
        formik.values.description = "";
        formik.values.rooms = [];
        formik.values.price = "";
        formik.values.maxpeople = "";

        showMessage("Room added successfull", "success");
      } else {
        showMessage("server error", "error");
      }
    },
  });

  useEffect(() => {
    const fetchHotels = async () => {
      const hotels = await getOwnHotels();
      setHotels(hotels);
    };

    fetchHotels();
  }, []);

  return (
    <form className={styles["grid-container"]} onSubmit={formik.handleSubmit}>
      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faBed} />
          <h1>Add new rooms</h1>
        </div>

        <div>
          <Link
            to={""}
            onClick={() => navigate(-1)}
            className={styles["action-btn"]}
          >
            <span>Cancel</span>
          </Link>
        </div>
      </div>

      <div></div>

      <div className={styles["content"]}>
        <div className={styles["item"]}>
          <label htmlFor="hotel">Select hotel: </label>
          <select
            name="hotel"
            id="hotel"
            value={formik.values.hotel}
            onChange={formik.handleChange}
          >
            <option value="">-- Please select hotel --</option>
            {hotels?.map((x) => (
              <option value={x._id} key={x._id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles["item"]}>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            name="price"
            id="price"
            required
            min={1}
            placeholder="example: 50"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
        </div>

        <div className={styles["item"]}>
          <label htmlFor="title">Room title: </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="example: President room"
            minLength={3}
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>

        <div className={styles["item"]}>
          <label htmlFor="description">Room description: </label>
          <input
            type="text"
            name="description"
            id="description"
            required
            minLength={3}
            placeholder="example: 2 king size beds room"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>

        <div className={styles["item"]}>
          <label htmlFor="maxpeople">Max people: </label>
          <input
            type="number"
            name="maxpeople"
            id="maxpeople"
            required
            min={1}
            max={20}
            placeholder="example: 2"
            value={formik.values.maxpeople}
            onChange={formik.handleChange}
          />
        </div>

        <div className={styles["item"]}>
          <label htmlFor="rooms">Rooms numbers: </label>
          <input
            type="list"
            name="rooms"
            id="rooms"
            required
            placeholder="example: 101, 102, 203"
            value={formik.values.rooms}
            onChange={formik.handleChange}
          />
        </div>

        <div></div>

        <div className={styles["item"]}>
          <input
            type="submit"
            className={styles["foo"]}
            value="Save & Add new"
          />
        </div>
      </div>
    </form>
  );
}
