import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { PublicMenu } from "./components/PublicMenu/PublicMenu";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainLayout from "./layouts/MainLayout";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import Staff from "./pages/staff/Staff";
import Orders from "./pages/orders/orders";
import Tables from "./pages/tables/tables";
import Menu from "./pages/menu/menu";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Authenticated routes */}
          <Route element={<AuthLayout />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/staff" element={<Staff />} />
            </Route>

            <Route path="/orders" element={<Orders />} />
            <Route path="/tables" element={<Tables />} />
          </Route>
        </Route>
        <Route path="/publicmenu" element={<PublicMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
