import { Link } from "react-router-dom";
import { useState, useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

import { pushMessage } from "../../../features/slices/localSlice";
import ImageSelect from "../../ui/ImageSelect";
import countries from "../../../assets/countries.json";
import Modal from "../../ui/Modal";
import { useRequest } from "../../../hooks/useRequest";
import { useValidator } from "../hooks/useValidator";
import { hotelSchema } from "../../../schemas";

import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

export default function EditHotel() {
  const handle = useId();
  const catalog = useRequest("catalog", handle);
  const data = useSelector((state) => state.responses[handle]);
  const imageService = useRequest("imageServices", "imagesUpload");
  const rooms = useRequest("rooms", handle + "rooms");

  const dispatch = useDispatch();
  const { id } = useParams("id");
  const [modal, setModal] = useState(false);
  const [pictures, setPictures] = useState([]);

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

    validationSchema: hotelSchema,

    onSubmit: (values) => {
      catalog.update(id, values).then(() => {
        if (pictures.length > 0) {
          imageService.upload(pictures, id).then((res) => {
            dispatch(
              pushMessage({
                text: "Hotel created successfully",
                type: "success",
              })
            );

            navigate("../hotels");
          });
        }
      });
    },
  });

  const navigate = useNavigate();
  const { getError, getClass } = useValidator(formik);

  useEffect(() => {
    if (id) {
      catalog.get(id);
    }

    return () => {
      catalog.cleaner();
      imageService.cleaner();
      rooms.cleaner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data.name,
        type: data.type,
        city: data.city,
        address: data.address,
        country: data.country,
        pictures: data.pictures,
        description: data.description,
        cheepestPrice: data.cheepestPrice,
        featured: data.featured,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleModal = (e) => {
    const item = data.rooms.filter((x) => x._id === e.target.value);
    setModal(item[0]);
  };

  const handleDelete = async () => {
    setModal(null);

    rooms.delete(modal._id).then(() => {
      catalog.get(id);
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {modal && (
        <Modal
          message={`Are you shure you want to delete room: ${modal.title}`}
          closeHandler={() => setModal(null)}
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
          <ImageSelect
            handleGetPictures={(files) => setPictures(files)}
            pictures={data?.pictures}
          />
        </div>

        <div className={styles["content"]}>
          <div className={styles["item"]}>
            <label>Hotel name: </label>
            <input
              type="text"
              placeholder="example: Hilton"
              name="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={getClass("name")}
            />
            {getError("name")}
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
              placeholder="example: Bulgaria"
              value={formik.values.country}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={getClass("country")}
            />
            {getError("country")}

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
              name="city"
              value={formik.values.city}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={getClass("city")}
            />
            {getError("city")}
          </div>

          <div className={styles["item"]}>
            <label>Address: </label>
            <input
              type="text"
              placeholder="example: bul. Dondukov 1"
              name="address"
              value={formik.values.address}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={getClass("address")}
            />
            {getError("address")}
          </div>

          <div className={styles["item"]}>
            <label>Cheapest room price: </label>
            <input
              type="number"
              placeholder=""
              name="cheepestPrice"
              value={formik.values.cheepestPrice}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={getClass("cheepestPrice")}
            />
            {getError("cheepestPrice")}
          </div>

          <div className={styles["item-wide"]}>
            <label>Description: </label>
            <textarea
              name="description"
              id="description"
              rows="7"
              placeholder="Please provide detailed description of the property"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={getClass("description")}
            ></textarea>
            {getError("description")}
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

          {data?.rooms?.length > 0 && (
            <>
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
                {data.rooms.map((room) => (
                  <li key={room._id} className={styles["grid-col-span-2"]}>
                    <div> {room.title} </div>
                    <div> ${room.price} </div>
                    <div> {room.maxPeople}</div>
                    <div>[{room.roomNumbers.join("; ")}]</div>

                    <div>
                      <Link to={`../hotels/rooms/edit/${room._id}`}>Edit</Link>
                      <button
                        type="button"
                        value={room._id}
                        onClick={handleModal}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {data?.rooms?.length < 1 && (
            <div className={styles["item"]}>
              <h1>No rooms yet</h1>
            </div>
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
