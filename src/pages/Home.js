import Header from "../components/Header";
import styles from "./Home.module.css";

import Featured from "../components/Featured";

export default function Home() {
  return (
    <>
      <Header compact={false} />

      <div className={styles.homeContainer}>
        <Featured />
      </div>
    </>
  );
}
