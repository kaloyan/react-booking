import styles from "./RoomsList.module.css";

export default function RoomsList({ rooms }) {
  return (
    <div className={styles["container"]}>
      <div>Available rooms:</div>

      <ul>
        {rooms.map((x) => (
          <li key={x._id}>{x.title}</li>
        ))}
      </ul>
    </div>
  );
}
