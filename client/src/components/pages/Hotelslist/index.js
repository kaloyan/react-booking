import styles from "./HotelsList.module.css";

import { useLocation } from "react-router-dom";
import { useState } from "react";

import { useFetch } from "../../../hooks/useFetch";

import Header from "../../layouts/Header";
import SearchTool from "../../search/SearchTool";
import SearchItem from "../../ui/SearchItem";
import Footer from "../../layouts/Footer";

export default function HotelsList() {
  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:3000/api/v1/hotels?city=Sofia&limit=10"
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
