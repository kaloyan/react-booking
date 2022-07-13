import styles from "./FeaturedHotels.module.css";

import { useFetch } from "../../hooks/useFetch.js";

export default function FeaturedHotels() {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/v1/hotels?featured=true&limit=3"
  );

  // console.log(data);

  return (
    <div className={styles.list}>
      {loading ? (
        <div>Loading please wait</div>
      ) : (
        <>
          {data.map((item) => (
            <div key={item._id} className={styles.item}>
              <img
                className={styles.image}
                src={item.pictures[0]}
                alt={item.type}
              />
              <span className={styles.name}>{item.name}</span>
              <span className={styles.city}>{item.city}</span>
              <span className={styles.price}>
                Starting from ${item.cheepestPrice}
              </span>

              <div className={styles.rating}>
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>
            </div>
          ))}
        </>
      )}

      {/* <div className={styles.item}>
        <img
          className={styles.image}
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXBhcnQlMjBob3RlbCUyMHN0YXRlJTIwbWlhc3RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="hotel"
        />
        <span className={styles.name}>Aparthotel Stare Miasto</span>
        <span className={styles.city}>Madrid</span>
        <span className={styles.price}>Starting from $120</span>

        <div className={styles.rating}>
          <button>4.9</button>
          <span>Excellent</span>
        </div>
      </div> */}

      {/* <div className={styles.item}>
        <img
          className={styles.image}
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="hotel"
        />
        <span className={styles.name}>Aparthotel Stare Miasto</span>
        <span className={styles.city}>Madrid</span>
        <span className={styles.price}>Starting from $120</span>

        <div className={styles.rating}>
          <button>4.9</button>
          <span>Excellent</span>
        </div>
      </div> */}

      {/* <div className={styles.item}>
        <img
          className={styles.image}
          src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="hotel"
        />
        <span className={styles.name}>Aparthotel Stare Miasto</span>
        <span className={styles.city}>Madrid</span>
        <span className={styles.price}>Starting from $120</span>

        <div className={styles.rating}>
          <button>4.9</button>
          <span>Excellent</span>
        </div> 
      </div>*/}
    </div>
  );
}
