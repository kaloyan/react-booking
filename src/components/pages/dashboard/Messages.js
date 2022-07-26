import styles from "./Forms.module.css";
import { useSelector } from "react-redux";

export default function Messages() {
  const { messages } = useSelector((state) => state.account);

  return (
    <section className={styles["container"]}>
      <h1>Messages</h1>

      <div className={styles["wrapper"]}>
        <table>
          <thead>
            <tr>
              <td>Unread</td>
              <td>Message</td>
              <td>Date</td>
              <td>Actions</td>
            </tr>
          </thead>

          <tbody>
            {/* if no message dispay info text */}
            {messages.length == 0 && (
              <tr>
                <td colSpan={4} className={styles["infobox"]}>
                  No messages
                </td>
              </tr>
            )}

            {messages.map((msg) => (
              <tr key={msg.id} className={msg.unread ? styles["unread"] : ""}>
                <td>{msg.unread ? "*" : ""}</td>
                <td>{msg.msg}</td>
                <td>{new Date(msg.time).toDateString()}</td>
                <td>
                  <button type="button">Mark as read</button>
                  <button type="button" className={styles["delete-btn"]}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
