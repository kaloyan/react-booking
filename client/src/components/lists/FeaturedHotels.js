import styles from "./FeaturedHotels.module.css";

export default function FeaturedHotels() {
  return (
    <div className={styles.list}>
      <div className={styles.item}>
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
      </div>

      <div className={styles.item}>
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
      </div>

      <div className={styles.item}>
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
      </div>
    </div>
  );
}
