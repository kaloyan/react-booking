import styles from "./Home.module.css";

import Header from "../../layouts/Header";
import Featured from "../../lists/Featured";
import PropertyList from "../../lists/PropertyList";
import FeaturedHotels from "../../lists/FeaturedHotels";
import Subscribtion from "../../ui/Subscribtion";

export default function Home() {
  return (
    <>
      <Header compact={false} />

      <div className={styles.homeContainer}>
        <Featured />

        <h1 className={styles.title}>Browse by property type</h1>
        <PropertyList />

        <h1 className={styles.title}>Homes guests love</h1>
        <FeaturedHotels />

        <Subscribtion />
      </div>
    </>
  );
}
