import styles from "./FeaturedHotels.module.css";
import { useEffect, useId } from "react";
import { useSelector } from "react-redux";
import { useRequest } from "../../../hooks/useRequest";
import ListItem from "./ListItem";

export default function FeaturedHotels() {
  const handle = useId();
  const catalog = useRequest("catalog", handle);
  const data = useSelector((state) => state.responses[handle]);

  useEffect(() => {
    catalog.featuredHotels();
    return () => catalog.cleaner();
  }, []);

  return (
    <section className={styles["container"]}>
      <h1 className={styles["header"]}>Homes guests love</h1>

      <div className={styles["list"]}>
        {data && (
          <>
            {data.map((item) => (
              <ListItem key={item._id} item={item} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
