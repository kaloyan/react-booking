import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.lists}>
        <ul className={styles.list}>
          <li className={styles["itemTtile"]}>About Us</li>
          <li>
            <p>
              We are available in 42 languages and offers more than 28 million
              reported accommodation listings, including over 6.2 million homes,
              apartments, and other unique places to stay. Wherever you want to
              go and whatever you want to do, We makes it easy and supports you
              with 24/7 customer support.
            </p>
          </li>
          <li>
            <Link to={"/toc"}>Terms & conditions</Link>
          </li>
        </ul>

        <ul className={styles.list}>
          <li className={styles["itemTtile"]}>branch locations</li>
          <li>
            <Link to={"/catalog?destinations=Bulgaria"}>Bulgaria</Link>
          </li>
          <li>
            <Link to={"/catalog?destinations=Japan"}>Japan</Link>
          </li>
          <li>
            <Link to={"/catalog?destinations=France"}>France</Link>
          </li>
          <li>
            <Link to={"/catalog?destinations=Indonesia"}>Indonesia</Link>
          </li>
          <li>
            <Link to={"/catalog?destinations=Mexico"}>Mexico</Link>
          </li>
        </ul>

        <ul className={styles.list}>
          <li className={styles["itemTtile"]}>Services</li>
          <li>
            <Link to={"/hotels"}>affordable hotels</Link>
          </li>
          <li>
            <Link to={"/services/food-and-drink"}>food and drinks</Link>
          </li>
          <li>
            <Link to={"/services/safty"}>safty guide</Link>
          </li>
          <li>
            <Link to={"/services/around-the-world"}>around the world</Link>
          </li>
          <li>
            <Link to={"/services/fast-travel"}>fastest travel</Link>
          </li>
          <li>
            <Link to={"/services/adventures"}>adventures</Link>
          </li>
        </ul>

        <ul className={styles.list}>
          <li className={styles["itemTtile"]}>Follow Us</li>
          <li>
            <p>Follow us on on sotial media:</p>
          </li>
          <li className={styles["icons"]}>
            <a href="http://www.facebook.com" target={"_blank"}>
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="http://www.linkedin.com" target={"_blank"}>
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="http://www.instagram.com" target={"_blank"}>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="http://www.twitter.com" target={"_blank"}>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="http://www.youtube.com" target={"_blank"}>
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </li>
          <li>
            <p>Sofia 1000, bul. "Khnias Alexander Dondukov" 1</p>
          </li>
          <li>
            <span>Info</span> info@example.com
          </li>
          <li>
            <span>Sales</span> sales@example.com
          </li>
          <li>
            <span>Support</span> help@example.com
          </li>
          <li>
            <button>
              <FontAwesomeIcon icon={faShieldHalved} /> Verified
            </button>
          </li>
        </ul>
      </div>

      <div className={styles.copy}>Copyright &copy; 2022 Travel Agency</div>
    </div>
  );
}
