// Main application component

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all pages
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import HotelsList from "./pages/HotelsList";

// Import compponenst
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <h1>Travel Agency</h1>

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
