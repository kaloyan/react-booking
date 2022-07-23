import styles from "./MessageBox.module.css";

export default function MessageBox() {
  return (
    <div className={styles["message-box"]}>
      <div>Please wait while saving...</div>
    </div>
  );
}
