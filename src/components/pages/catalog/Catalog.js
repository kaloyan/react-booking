import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import styles from "./Catalog.module.css";
import Header from "../../layouts/Header";
import SearchBar from "../../ui/search/SearchBar";
import SearchItem from "./CatalogItem";
import Paginator from "../Paginator";
import { useCatalog } from "../../../hooks/useCatalog";

import FeaturedHotels from "../home/FeaturedHotels";

export default function Catalog() {
  const [noResults, setNoResults] = useState(false);
  const location = useLocation();
  const data = useSelector((state) => state.responses["catalog"]);
  const catalog = useCatalog();

  useEffect(() => {
    window.scrollTo(0, 0);

    catalog.query();
  }, [location.search]);

  useEffect(() => {
    if (data?.items?.length == 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [data]);

  return (
    <>
      <Header compact={true}>
        <SearchBar />
      </Header>

      {data?.items?.length > 0 && (
        <Paginator
          totalItems={data?.total}
          count={data?.items?.length}
          slice={data?.slice}
        >
          <div className={styles["list-container"]}>
            <div className={styles["wrapper"]}>
              <div className={styles["results"]}>
                {data?.items?.length > 0 && (
                  <>
                    {data?.items.map((item) => (
                      <SearchItem key={item._id} data={item} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </Paginator>
      )}

      {noResults && (
        <>
          <div className={styles["no-results"]}>
            <div className={styles["title"]}>No results found</div>

            <hr />

            <FeaturedHotels />
          </div>
        </>
      )}
    </>
  );
}
