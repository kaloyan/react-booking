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
import Destinations from "./Destinations";
import NewDestination from "./NewDestination";
import EditDestination from "./EditDestination";
import NewRoom from "./NewRoom";
import EditRoom from "./EditRoom";
import ViewProfile from "./ViewProfile";
import { AdminGuard } from "../../RouteGuards";

export default function index() {
  return (
    <main className={styles["container"]}>
      <Toolbar />

      <div>
        <Routes>
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />

          <Route element={<AdminGuard />}>
            <Route path="users" element={<UsersList />} />
            <Route path="users/view/:id" element={<ViewProfile />} />

            <Route path="destinations" element={<Destinations />} />
            <Route path="destinations/new" element={<NewDestination />} />
            <Route path="destinations/edit/:id" element={<EditDestination />} />
            <Route
              path="destinations/del/:id"
              element={<Navigate to={"../destinations"} replace={true} />}
            />
          </Route>

          <Route path="reservations" element={<Reservations />} />
          <Route
            path="reservations/remove"
            element={<Navigate to={"../reservations"} replace={true} />}
          />

          <Route path="hotels" element={<MyHotels />} />
          <Route path="hotels/new" element={<NewHotel />} />
          <Route path="hotels/rooms/new" element={<NewRoom />} />
          <Route path="hotels/rooms/edit/:id" element={<EditRoom />} />
          <Route path="hotels/edit/:id" element={<EditHotel />} />
          <Route
            path="hotels/del/:id"
            element={<Navigate to={"../hotels"} replace={true} />}
          />
        </Routes>
      </div>
    </main>
  );
}
