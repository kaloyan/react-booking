import styles from "./Home.module.css";

import Hero from "../ui/Hero";
import Header from "../layouts/Header";
import Featured from "../lists/Featured";
import PropertyList from "../lists/PropertyList";
import FeaturedHotels from "../lists/FeaturedHotels";
import Subscribtion from "../ui/Subscribtion";

export default function Home() {
  return (
    <>
      <main className={styles.homeContainer}>
        <Hero>
          <Header compact={false} />
        </Hero>

        <Featured />

        <h1 className={styles.title}>Browse by property type</h1>
        <PropertyList />

        <h1 className={styles.title}>Homes guests love</h1>
        <FeaturedHotels />

        <Subscribtion />
      </main>
    </>
  );
}
