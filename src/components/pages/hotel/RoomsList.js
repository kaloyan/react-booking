import styles from "./RoomsList.module.css";

export default function RoomsList({ rooms }) {
  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>
        <h2>Available rooms:</h2>
      </div>

      <ul className={styles["room-list"]}>
        {rooms?.length > 0 && (
          <>
            {rooms.map((x) => (
              <li key={x._id}>
                <div>{x.title}</div>
                <div>{x.description}</div>
                <div>room numbers: [{x.roomNumbers.join(", ")}]</div>
                <div> price: ${x.price}</div>
              </li>
            ))}
          </>
        )}

        {rooms?.length === 0 && (
          <li>
            <div className={styles["no-rooms"]}>
              No available rooms at the moment
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
