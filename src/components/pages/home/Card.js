import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ data }) {
  return (
    <div className={styles["card-item"]}>
      <Link to={`/catalog/query?dest=${data.name}`}>
        <div className={styles["header"]}>
          <img src={data.image} alt={data.name} />
          <h1>{data.name}</h1>
        </div>

        <div className={styles["content"]}>
          <span>{data.description}</span>
        </div>
        <button type="button">Exlore</button>
      </Link>
    </div>
  );
}
