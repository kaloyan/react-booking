// Main application component
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all pages
import Home from "./components/pages/home/Home";
import Hotel from "./components/pages/hotel/Hotel";
import Catalog from "./components/pages/catalog/Catalog";
import DestinationsList from "./components/pages/DestinationsList";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NotFound from "./components/pages/NotFound";
import Error from "./components/pages/Error";
import NoAccess from "./components/pages/NoAccess";

// Import compponenst
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import InfoBox from "./components/ui/InfoBox";
import Spinner from "./components/ui/Spinner";
import { RegisteredGuard } from "./components/RouteGuards";

const Dashboard = lazy(() => import("./components/pages/dashboard/Dashboard"));

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <InfoBox />
        <Spinner />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/catalog/query/*" element={<Catalog />} />
          <Route path="/catalog/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<RegisteredGuard />}>
            <Route
              path="/dashboard/*"
              element={
                <Suspense fallback={<Spinner show={true} />}>
                  <Dashboard />
                </Suspense>
              }
            />
          </Route>

          <Route path="/destinations" element={<DestinationsList />} />

          <Route path="/error" element={<Error />} />
          <Route path="/denied" element={<NoAccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
