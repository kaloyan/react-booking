import styles from "./Featured.module.css";

import { useFetch } from "../../hooks/useFetch.js";

export default function Featured() {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/v1/hotels/countByCity?cities=Berlin,London,Sofia"
  );

  return (
    <div className={styles.featured}>
      {loading ? (
        <div>Loading please wait</div>
      ) : (
        <>
          <div className={styles.item}>
            <img
              className={styles.image}
              src="https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="city"
            />

            <div className={styles.title}>
              <h1>Berlin</h1>
              <h2>{data?.counts ? `${data.counts[0]} properties` : ""}</h2>
            </div>
          </div>

          <div className={styles.item}>
            <img
              className={styles.image}
              src="https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="city"
            />

            <div className={styles.title}>
              <h1>London</h1>
              <h2>{data?.counts ? `${data.counts[1]} properties` : ""}</h2>
            </div>
          </div>

          <div className={styles.item}>
            <img
              className={styles.image}
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80"
              alt="city"
            />

            <div className={styles.title}>
              <h1>Sofia</h1>
              <h2>{data?.counts ? `${data.counts[2]} properties` : ""}</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
