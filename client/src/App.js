// Main application component

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all pages
import Home from "./components/pages/Home";
import Hotel from "./components/pages/Hotel";
import HotelsList from "./components/pages/Hotelslist";

// Import compponenst
import Navbar from "./components/layouts/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<HotelsList />} />
          <Route path="/hotels/:id" element={<Hotel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
