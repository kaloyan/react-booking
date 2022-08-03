import { useEffect, useId } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRequest } from "../../../hooks/useRequest";

import styles from "./Featured.module.css";
import Card from "./Card";

export default function Featured() {
  const handle = useId();
  const destinations = useRequest("destinations", handle);
  const data = useSelector((state) => state.responses[handle]);

  useEffect(() => {
    destinations.featured();
    return () => destinations.cleaner();
  }, []);

  return (
    <section className={styles["featured"]}>
      <h1 className={styles["header"]}>Explore popular places</h1>

      <div className={styles["card-container"]}>
        {data?.length > 0 && data.map((x) => <Card key={x._id} data={x} />)}
      </div>

      <div className={styles["tagline"]}>
        <hr />
        <Link to={"/destinations"}>Find more destinations</Link>
      </div>
    </section>
  );
}
