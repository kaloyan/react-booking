import styles from "./Info.module.css";

export default function Info(props) {
  return <div className={styles.info}>{props.content}</div>;
}
