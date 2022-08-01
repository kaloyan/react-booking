import styles from "./Catalog.module.css";

import { useSelector } from "react-redux";

import Header from "../layouts/Header";
import SearchBar from "../ui/search/SearchBar";
import SearchItem from "../ui/SearchItem";
import Info from "../ui/Info";

export default function Catalog() {
  const { results } = useSelector((state) => state.filter);

  return (
    <>
      <Header compact={true}>
        <SearchBar />
      </Header>

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
        </div>
      </div>
    </>
  );
}
