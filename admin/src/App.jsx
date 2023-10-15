import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import AnalyticsOverview from "./pages/AnalyticsOverview";
import PassengerTraffic from "./pages/PassengerTraffic";

// Bus Routes
import BusRoutesList from "./pages/busroutes/BusRoutesList";
import AddBusRoutes from "./pages/busroutes/AddBusRoutes";
import UpdateBusRoute from "./pages/busroutes/UpdateBusRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<AnalyticsOverview />} />
          <Route path="analytics-overview" element={<AnalyticsOverview />} />
          <Route path="passenger-traffic" element={<PassengerTraffic />} />
          <Route path="bus-routes" element={<BusRoutesList />} />
          <Route path="add-bus-routes" element={<AddBusRoutes />} />
          <Route path="update-bus-route" element={<UpdateBusRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
