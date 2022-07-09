import Header from "../components/Header";
import styles from "./Home.module.css";

import Featured from "../components/Featured";
import PropertyList from "../components/PropertyList";

export default function Home() {
  return (
    <>
      <Header compact={false} />

      <div className={styles.homeContainer}>
        <Featured />

        <h1 className={styles.title}>Browse by property type</h1>
        <PropertyList />
      </div>
    </>
  );
}
