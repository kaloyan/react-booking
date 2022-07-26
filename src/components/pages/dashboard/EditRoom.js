import styles from "./Dashboard.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneRoom, updateRoom } from "../../../services/netRequest";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { pushMessage } from "../../../features/slices/localSlice";

export default function NewRoom() {
  const showMessage = (msg, type) => {
    dispatch(
      pushMessage({
        text: msg,
        type: type,
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      rooms: [],
      price: "",
      maxpeople: "",
      hotel: "",
    },

    onSubmit: async (values) => {
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

      const data = {
        title: values.title,
        description: values.description,
        price: Number(values.price),
        maxPeople: Number(values.maxpeople),
        roomNumbers: rooms,
      };

      await updateRoom(id, data);
      navigate(-1);
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [roomId, setRoomId] = useState(id);
  const [roomData, setRoomData] = useState({});

  useEffect(() => {
    console.log("useEffect start");

    const fetchRoom = async () => {
      const response = await getOneRoom(roomId);

      console.log(response);

      setRoomData(response);

      formik.values.title = response.title;
      formik.values.description = response.description;
      formik.values.price = response.price;
      formik.values.maxpeople = response.maxPeople;
      formik.values.rooms = response.roomNumbers.join(", ");
    };

    fetchRoom();
  }, [roomId]);

  return (
    <form className={styles["grid-container"]} onSubmit={formik.handleSubmit}>
      <div className={styles["header"]}>
        <h1>Edit Room</h1>

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
        <div></div>

        <div className={styles["item"]}>
          <input type="submit" className={styles["foo"]} value="Save changes" />
        </div>
      </div>
    </form>
  );
}
