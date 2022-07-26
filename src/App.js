// Main application component
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all pages
import Home from "./components/pages/Home";
import Hotel from "./components/pages/hotel/Hotel";
import HotelsList from "./components/pages/HotelsList";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NotFound from "./components/pages/NotFound";

// Import compponenst
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import InfoBox from "./components/ui/InfoBox";

const Dashboard = lazy(() => import("./components/pages/dashboard/Dashboard"));

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <InfoBox />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<HotelsList />} />
          <Route path="/catalog/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/*"
            element={
              <Suspense fallback={<span>Loading...</span>}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
