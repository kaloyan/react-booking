import styles from "./Reserve.module.css";
import { useState, useEffect } from "react";
import { getHotelRooms } from "../../../services/netReq";

export default function Reserve({ close, hotelId }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await getHotelRooms(hotelId);
      setRooms(response);
    };

    fetchRooms();
  }, []);

  return (
    <div className={styles["backdrop"]}>
      <section className={styles["container"]}>
        <div className={styles["header"]}>Available rooms: </div>

        <div>
          {rooms?.map((x) => (
            <div key={x._id}>x._id</div>
          ))}
        </div>

        <button type="button" onClick={close}>
          Close
        </button>
      </section>
    </div>
  );
}
