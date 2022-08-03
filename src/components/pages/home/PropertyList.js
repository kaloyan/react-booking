import { useEffect, useId } from "react";
import { Link } from "react-router-dom";

import { useRequest } from "../../../hooks/useRequest";
import { useSelector } from "react-redux";
import styles from "./PropertyList.module.css";
import properties from "./property-list.json";

export default function PropertyList() {
  const handle = useId();
  const catalog = useRequest("catalog", handle);
  const data = useSelector((state) => state.responses[handle]);

  useEffect(() => {
    catalog.getPropertyList();
    return () => catalog.cleaner();
  }, []);

  return (
    <section className={styles["container"]}>
      <h1 className={styles["header"]}>Browse by property type</h1>

      <div className={styles["list"]}>
        {properties.map((item, idx) => (
          <div key={idx} className={styles["list-item"]}>
            <Link to={`/catalog/query?type=${item.type}`}>
              <img
                className={styles["image"]}
                src={item.image}
                alt={item.type}
              />

              <div className={styles["list-titles"]}>
                <h1>{item.name}</h1>
                <h2>
                  {data?.counts
                    ? `${data.counts[item.type]} ${item.type}s`
                    : ""}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles["tagline"]}>
        <hr />
      </div>
    </section>
  );
}
