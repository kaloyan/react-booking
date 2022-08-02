import { useSearchParams } from "react-router-dom";
import styles from "./Paginator.module.css";

export default function Paginator(props) {
  let [searchParams, setSearchParams] = useSearchParams();

  const total = Number(props.totalItems);
  const start = Number(props.slice?.start);
  const count = Number(props.count);
  const sliceSize = Number(props.slice?.count);

  const numPages = Math.ceil(total / sliceSize);
  const currentPage = start / sliceSize;

  const getParams = () => {
    const res = {};
    const dest = searchParams.get("dest");
    const price = searchParams.get("price");
    const type = searchParams.get("type");
    const rating = searchParams.get("rating");
    const limit = searchParams.get("limit");

    if (dest) res.dest = dest;
    if (price) res.price = price;
    if (type) res.type = type;
    if (rating) res.rating = rating;
    if (limit) res.limit = limit;

    return res;
  };

  const handleNext = () => {
    const params = getParams();
    const next = start + sliceSize;
    params.offset = next;
    setSearchParams(params);
  };

  const handlePrev = () => {
    const params = getParams();
    const next = start - sliceSize;
    params.offset = next;
    setSearchParams(params);
  };

  const paginator = () => {
    return (
      <div className={styles["pages"]}>
        Showing results {`${start + 1} to ${start + count}`} of {total}
        {currentPage > 0 && (
          <button type="button" onClick={handlePrev}>
            {"< Back"}
          </button>
        )}
        {currentPage < numPages - 1 && (
          <button type="button" onClick={handleNext}>
            Next >
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <header className={styles["header"]}>{paginator()}</header>

      {props.children}

      <footer className={styles["footer"]}>{paginator()}</footer>
    </>
  );
}
