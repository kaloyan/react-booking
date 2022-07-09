import styles from "./Featured.module.css";

export default function Featured() {
  return (
    <div className={styles.featured}>
      <div className={styles.item}>
        <img
          className={styles.image}
          src="https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="city"
        />

        <div className={styles.title}>
          <h1>Bali</h1>
          <h2>42 properties</h2>
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
          <h2>24 properties</h2>
        </div>
      </div>

      <div className={styles.item}>
        <img
          className={styles.image}
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80"
          alt="city"
        />

        <div className={styles.title}>
          <h1>Turkey</h1>
          <h2>20 properties</h2>
        </div>
      </div>
    </div>
  );
}
