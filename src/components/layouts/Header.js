import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import SearchBar from "../ui/search/SearchBar";
import { useSelector } from "react-redux";

export default function Header(props) {
  const { username } = useSelector((state) => state.account);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <ul className={styles.headerList}>
          <li className={styles.active}>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </li>

          <li className={styles.item}>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </li>

          <li className={styles.item}>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </li>

          <li className={styles.item}>
            <FontAwesomeIcon icon={faCar} />
            <span>Attractions</span>
          </li>

          <li className={styles.item}>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </li>
        </ul>

        {!props.compact && (
          <>
            <h1 className={styles.title}>
              A lifetime of discounts? It's a Genius.
            </h1>

            <p className={styles.description}>
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free booking account.
            </p>

            {!username && (
              <NavLink to={"/register"} className={styles.headerLink}>
                Sign in / Register
              </NavLink>
            )}
          </>
        )}

        {!props.compact && <SearchBar />}

        <div className={styles["content"]}>{props.children}</div>
      </div>
    </div>
  );
}