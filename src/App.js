// Main application component

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all pages
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import HotelsList from "./pages/HotelsList";

function App() {
  return (
    <BrowserRouter>
      <div>
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
