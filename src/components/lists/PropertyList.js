import styles from "./PropertyList.module.css";

export default function PropertyList() {
  return (
    <div className={styles.list}>
      <div className={styles.listItem}>
        <img
          className={styles.image}
          src="https://images.unsplash.com/photo-1477120128765-a0528148fed2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          alt="hotel"
        />

        <div className={styles.listTitles}>
          <h1>Hotels</h1>
          <h2>209 hotels</h2>
        </div>
      </div>

      <div className={styles.listItem}>
        <img
          className={styles.image}
          src="https://images.unsplash.com/photo-1536625737227-92a1fc042e7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="hotel"
        />

        <div className={styles.listTitles}>
          <h1>Hotels</h1>
          <h2>209 hotels</h2>
        </div>
      </div>

      <div className={styles.listItem}>
        <img
          className={styles.image}
          src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="hotel"
        />

        <div className={styles.listTitles}>
          <h1>Hotels</h1>
          <h2>209 hotels</h2>
        </div>
      </div>

      <div className={styles.listItem}>
        <img
          className={styles.image}
          src="https://images.unsplash.com/photo-1609949851943-ff5336d1129f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80"
          alt="hotel"
        />

        <div className={styles.listTitles}>
          <h1>Hotels</h1>
          <h2>209 hotels</h2>
        </div>
      </div>

      <div className={styles.listItem}>
        <img
          className={styles.image}
          src="https://images.unsplash.com/photo-1541480551145-2370a440d585?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
          alt="hotel"
        />

        <div className={styles.listTitles}>
          <h1>Hotels</h1>
          <h2>209 hotels</h2>
        </div>
      </div>
    </div>
  );
}
