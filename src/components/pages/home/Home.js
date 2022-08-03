import styles from "./Home.module.css";

import Hero from "../../ui/Hero";
import Header from "../../layouts/Header";
import Featured from "./Featured";
import PropertyList from "./PropertyList";
import FeaturedHotels from "./FeaturedHotels";
import Subscribtion from "../../ui/Subscribtion";

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <Hero>
        <Header compact={false} />
      </Hero>

      <Featured />
      <PropertyList />

      <h1 className={styles.title}>Homes guests love</h1>
      <FeaturedHotels />

      <Subscribtion />
    </main>
  );
}
