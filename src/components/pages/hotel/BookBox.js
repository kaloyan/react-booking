import styles from "./BookBox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setRedirect } from "../../../features/slices/localSlice";

export default function PriceBox({ showReserve, rating, price }) {
  const { account } = useSelector((state) => state.responses);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogin = () => {
    // firset set offer in local state for redirect
    dispatch(setRedirect(location.pathname));
    // next redirect to login page
    navigate("/login");
  };

  return (
    <div className={styles["book-box"]}>
      <h1>Perfect for 5-night stay</h1>

      <span>Top Location: Highly rated by recent guests ({rating})</span>

      <h2>
        <b>${price * 5}</b> (5 nights)
      </h2>

      {account?.role === "user" && (
        <button
          type="button"
          className={styles["action"]}
          onClick={() => showReserve(true)}
        >
          Book room Now!
        </button>
      )}

      {(account?.role === "admin" || account?.role === "owner") && (
        <span className={styles["login-info"]}>
          Login in as tourist in order to book
        </span>
      )}

      {!account?.role && (
        <button type="button" onClick={handleLogin}>
          Login in order to book
        </button>
      )}
    </div>
  );
}
