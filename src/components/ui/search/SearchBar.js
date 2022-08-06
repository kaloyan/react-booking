import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

import styles from "./SearchBar.module.css";
// import { useCatalog } from "../../../hooks/useCatalog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  const navigate = useNavigate();

  const [openOptions, setOpenOptions] = useState(false);

  // const catalog = useCatalog();
  const { filters } = useSelector((state) => state.local);

  useEffect(() => {
    formik.setValues({
      type: filters.properyType,
      price: filters.maxPrice,
      rating: filters.minRating,
      dest: filters.destination,
    });
  }, [filters]);

  const formik = useFormik({
    initialValues: {
      type: filters.properyType,
      price: filters.maxPrice,
      rating: filters.minRating,
      dest: filters.destination,
    },

    onSubmit: (values) => {
      setOpenOptions(false);

      const params = {};
      if (values.dest) params.dest = values.dest;
      if (values.rating) params.rating = values.rating;
      if (values.type) params.type = values.type;
      if (values.price) params.price = values.price;
      params.limit = 8;
      params.offset = 0;

      const str = new URLSearchParams(params).toString();
      const query = encodeURI(`${str}`);

      navigate("/catalog/query?" + query);
    },
  });

  const toggleOpenOptions = (e) => {
    setOpenOptions((state) => !state);
  };

  const clearHandler = () => {
    formik.setValues({
      type: "",
      price: "",
      rating: "",
      dest: "",
    });
  };

  return (
    <form className={`${styles["search-tool"]}`} onSubmit={formik.handleSubmit}>
      <div className={styles["container"]}>
        <input
          type="search"
          name="dest"
          className={`${styles["search-box"]} ${
            openOptions && styles["active"]
          }`}
          placeholder="Where do you want to go today?"
          value={formik.values.dest}
          onChange={formik.handleChange}
        />

        <button type="submit" className={styles["search-btn"]}>
          <FontAwesomeIcon icon={faMagnifyingGlass} /> {openOptions && "Search"}
        </button>

        <div className={styles["fiter-btn"]} onClick={toggleOpenOptions}>
          <button type="button" className={styles["close-btn"]}>
            {openOptions ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </button>

          {!openOptions && <div className={styles["options-btn"]}>options</div>}
        </div>
      </div>

      <div
        className={`${styles["wrapper"]} ${openOptions && styles["visible"]}`}
      >
        <div className={styles["filter-box"]}>
          <div>
            <label htmlFor="type">Property Type</label>

            <select
              name="type"
              id="type"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <option value="">-- no set --</option>
              <option value="hotel">Hotel</option>
              <option value="resort">Resort</option>
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
              <option value="cabin">Cabin</option>
            </select>
          </div>

          <div>
            <label htmlFor="rating">Minimal Rating</label>

            <select
              name="rating"
              id="rating"
              value={formik.values.rating}
              onChange={formik.handleChange}
            >
              <option value="">-- not set --</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div>
            <label htmlFor="price">Max Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
          </div>

          <div>
            <button type="button" onClick={clearHandler}>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
