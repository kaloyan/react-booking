import styles from "./Dashboard.module.css";
import { Routes, Route } from "react-router-dom";
import Toolbar from "./Toolbar";
import { Navigate } from "react-router-dom";

import Messages from "./Messages";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import UsersList from "./UsersList";
import Reservations from "./Reservations";
import MyHotels from "./MyHotels";
import NewHotel from "./NewHotel";
import EditHotel from "./EditHotel";
import AddHotel from "./AddHotel";
import MyReservations from "./MyReservations";
import Destinations from "./Destinations";
import NewDestination from "./NewDestination";
import EditDestination from "./EditDestination";

export default function index() {
  return (
    <main className={styles["container"]}>
      <div>
        <Toolbar />
      </div>

      <div>
        <Routes>
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="users" element={<UsersList />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="hotels" element={<MyHotels />} />
          <Route path="hotels/new" element={<NewHotel />} />
          <Route path="hotels/edit/:id" element={<EditHotel />} />
          <Route
            path="hotels/del/:id"
            element={<Navigate to={"../hotels"} replace={true} />}
          />
          <Route path="add-hotel" element={<AddHotel />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="destinations/new" element={<NewDestination />} />
          <Route path="destinations/edit/:id" element={<EditDestination />} />
          <Route
            path="destinations/del/:id"
            element={<Navigate to={"../destinations"} replace={true} />}
          />
          <Route path="my-reservations" element={<MyReservations />} />
        </Routes>
      </div>
    </main>
  );
}
