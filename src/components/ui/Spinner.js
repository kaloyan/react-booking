import styles from "./Spinner.module.css";
import { MoonLoader } from "react-spinners";
import { useSelector } from "react-redux";

export default function Spinner({ show }) {
  const { showSpinner } = useSelector((state) => state.local);

  return (
    <>
      {(showSpinner || show) && (
        <>
          <div className={styles["backdrop"]}>
            <div className={styles["spinner"]}>
              <MoonLoader size={25} color="#90effa" loading />
              <span>Please wait...</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
