import styles from "./HotelsList.module.css";

import { useLocation } from "react-router-dom";
import { useState } from "react";

import Header from "../components/Header";
import SearchTool from "../components/search/SearchTool";
import SearchItem from "../components/SearchItem";
import Footer from "../components/footer/Footer";

export default function HotelsList() {
  const location = useLocation();
  // console.log(location);

  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);

  return (
    <>
      <Header compact={true} />

      <div className={styles.listContainer}>
        <div className={styles.wrapper}>
          <div className={styles.results}>
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>

          <SearchTool />
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}
