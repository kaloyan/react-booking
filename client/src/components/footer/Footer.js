import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.lists}>
        <ul className={styles.list}>
          <li className={styles.liItem}>Countries</li>
          <li className={styles.liItem}>Regions</li>
          <li className={styles.liItem}>Cities</li>
          <li className={styles.liItem}>Districts</li>
          <li className={styles.liItem}>Airports</li>
          <li className={styles.liItem}>Hotels</li>
        </ul>

        <ul className={styles.list}>
          <li className={styles.liItem}>Homes </li>
          <li className={styles.liItem}>Apartments </li>
          <li className={styles.liItem}>Resorts </li>
          <li className={styles.liItem}>Villas</li>
          <li className={styles.liItem}>Hostels</li>
          <li className={styles.liItem}>Guest houses</li>
        </ul>

        <ul className={styles.list}>
          <li className={styles.liItem}>Unique places to stay </li>
          <li className={styles.liItem}>Reviews</li>
          <li className={styles.liItem}>Unpacked: Travel articles </li>
          <li className={styles.liItem}>Travel communities </li>
          <li className={styles.liItem}>Seasonal and holiday deals </li>
        </ul>

        <ul className={styles.list}>
          <li className={styles.liItem}>Car rental </li>
          <li className={styles.liItem}>Flight Finder</li>
          <li className={styles.liItem}>Restaurant reservations </li>
          <li className={styles.liItem}>Travel Agents </li>
        </ul>

        <ul className={styles.list}>
          <li className={styles.liItem}>Curtomer Service</li>
          <li className={styles.liItem}>Partner Help</li>
          <li className={styles.liItem}>Careers</li>
          <li className={styles.liItem}>Sustainability</li>
          <li className={styles.liItem}>Press center</li>
          <li className={styles.liItem}>Safety Resource Center</li>
          <li className={styles.liItem}>Investor relations</li>
          <li className={styles.liItem}>Terms & conditions</li>
        </ul>
      </div>

      <div className={styles.copy}>Copyright &copy; 2022 Travel Agency</div>
    </div>
  );
}
