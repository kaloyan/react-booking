// Main application component

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all pages
import Home from "./components/pages/Home";
import Hotel from "./components/pages/Hotel";
import HotelsList from "./components/pages/Hotelslist";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import NotFound from "./components/pages/NotFound";

// Import compponenst
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<HotelsList />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
