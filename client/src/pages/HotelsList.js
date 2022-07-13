import styles from "./HotelsList.module.css";

import { useLocation } from "react-router-dom";
import { useState } from "react";

import { useFetch } from "../hooks/useFetch.js";

import Header from "../components/Header";
import SearchTool from "../components/search/SearchTool";
import SearchItem from "../components/SearchItem";
import Footer from "../components/footer/Footer";

export default function HotelsList() {
  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:3000/api/v1/hotels?city=Sofia&limit=310"
  );

  console.log(data);

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
            {loading ? (
              <div>Loading please wait</div>
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem key={item._id} data={item} />
                ))}
              </>
            )}
          </div>

          <SearchTool />
        </div>
        <Footer />
      </div>
    </>
  );
}
