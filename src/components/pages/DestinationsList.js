import { useEffect, useId } from "react";
import { useSelector } from "react-redux";
import { useRequest } from "../../hooks/useRequest";

import styles from "./DestinationsList.module.css";
import Card from "./home/Card";

export default function DestinationsList() {
  const handle = useId();
  const destinations = useRequest("destinations", handle);
  const data = useSelector((state) => state.responses[handle]);

  useEffect(() => {
    destinations.all();
    return () => destinations.cleaner();
  }, []);

  return (
    <section className={styles["list-container"]}>
      <div className={styles["wrapper"]}>
        <h1 className={styles["title"]}>Explore popular destinations</h1>

        <div className={styles["card-container"]}>
          {data?.length > 0 && data.map((x) => <Card key={x._id} data={x} />)}
        </div>
      </div>
    </section>
  );
}
