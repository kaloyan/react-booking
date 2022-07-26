import styles from "./Hero.module.css";

export default function Hero(props) {
  return (
    <section className={styles["hero"]}>
      hero
      {props.children}
    </section>
  );
}
