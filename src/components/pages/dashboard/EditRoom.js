import { useEffect, useState, useId } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

import { useRequest } from "../../../hooks/useRequest";
import { useValidator } from "../hooks/useValidator";
import { newRoomSchema } from "../../../schemas";

import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";

export default function NewRoom() {
  const handle = useId();
  const catalog = useRequest("catalog", handle);
  const hotels = useSelector((state) => state.responses[handle]);
  const rooms = useRequest("rooms", "editroom");
  const roomData = useSelector((state) => state.responses["editroom"]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      catalog.getOwn();
      rooms.get(id);
    }

    return () => {
      catalog.cleaner();
      rooms.cleaner();
    };
  }, [id]);

  useEffect(() => {
    if (hotels && roomData) {
      formik.setValues({
        title: roomData.title,
        description: roomData.description,
        price: roomData.price,
        maxpeople: roomData.maxPeople,
        rooms: roomData.roomNumbers.join(", "),
        hotel: "2ea82bbe66b85396bec363b",
      });
    }
  }, [hotels, roomData]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      rooms: [],
      price: "",
      maxpeople: "",
      hotel: "2ea82bbe66b85396bec363b",
    },

    validationSchema: newRoomSchema,

    onSubmit: (values) => {
      const roomsNumbers = values.rooms
        .split(",")
        .map((x) => Number(x.trim()))
        .filter((x) => typeof x == "number" && x > 0 && x < 1000);

      const data = {
        title: values.title,
        description: values.description,
        price: Number(values.price),
        maxPeople: Number(values.maxpeople),
        roomNumbers: roomsNumbers,
      };

      rooms.update(roomData._id, data).then(() => {
        navigate(-1);
      });
    },
  });

  const { getError, getClass } = useValidator(formik);

  return (
    <form className={styles["grid-container"]} onSubmit={formik.handleSubmit}>
      <div className={styles["header"]}>
        <div className={styles["bread-crump"]}>
          <FontAwesomeIcon icon={faBed} />
          <h1>Edit Room</h1>
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
          <label htmlFor="title">Room title: </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="example: President room"
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={getClass("title")}
          />
          {getError("title")}
        </div>

        <div className={styles["item"]}>
          <label htmlFor="description">Room description: </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="example: 2 king size beds room"
            value={formik.values.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={getClass("description")}
          />
          {getError("description")}
        </div>

        <div className={styles["item"]}>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="example: 50"
            value={formik.values.price}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={getClass("price")}
          />
          {getError("price")}
        </div>

        <div className={styles["item"]}>
          <label htmlFor="maxpeople">Max people: </label>
          <input
            type="number"
            name="maxpeople"
            id="maxpeople"
            placeholder="example: 2"
            value={formik.values.maxpeople}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={getClass("maxpeople")}
          />
          {getError("maxpeople")}
        </div>

        <div className={styles["item"]}>
          <label htmlFor="rooms">Rooms numbers: </label>
          <input
            type="list"
            name="rooms"
            id="rooms"
            placeholder="example: 101, 102, 203"
            value={formik.values.rooms}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={getClass("rooms")}
          />
          {getError("rooms")}
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
