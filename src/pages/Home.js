import Header from "../components/Header";
import styles from "./Home.module.css";

import Featured from "../components/lists/Featured";
import PropertyList from "../components/lists/PropertyList";
import FeaturedHotels from "../components/lists/FeaturedHotels";
import Subscribtion from "../components/Subscribtion";
import Footer from "../components/footer/Footer";

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

        <Footer />
      </div>
    </>
  );
}
