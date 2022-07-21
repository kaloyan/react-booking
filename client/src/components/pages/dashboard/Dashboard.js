import styles from "./Dashboard.module.css";
import { Routes, Route } from "react-router-dom";
import Toolbar from "./Toolbar";

import Messages from "./Messages";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import UsersList from "./UsersList";
import Reservations from "./Reservations";
import MyHotels from "./MyHotels";
import AddHotel from "./AddHotel";
import MyReservations from "./MyReservations";

export default function index(props) {
  return (
    <main className={styles["container"]}>
      <Toolbar />

      <Routes>
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="users" element={<UsersList />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="my-hotels" element={<MyHotels />} />
        <Route path="add-hotel" element={<AddHotel />} />
        <Route path="my-reservations" element={<MyReservations />} />
      </Routes>
    </main>
  );
}
