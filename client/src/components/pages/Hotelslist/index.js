import styles from "./HotelsList.module.css";

import { useSelector } from "react-redux";

import Header from "../../layouts/Header";
import SearchTool from "../../search/SearchTool";
import SearchItem from "../../ui/SearchItem";
import Footer from "../../layouts/Footer";
import Info from "../../ui/Info";

export default function HotelsList() {
  const { results } = useSelector((state) => state.filter);

  return (
    <>
      <Header compact={true} />

      <div className={styles.listContainer}>
        <div className={styles.wrapper}>
          <div className={styles.results}>
            {results.status == "loading" ? (
              <Info content={"Loading please wait"} />
            ) : (
              <>
                {results.items.map((item) => (
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
