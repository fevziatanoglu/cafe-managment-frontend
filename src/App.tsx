import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { Menu } from "./components/Menu/Menu";
import { Orders } from "./components/Orders/Orders";
import { PublicMenu } from "./components/PublicMenu/PublicMenu";
import { Tables } from "./components/Tables/Tables";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/publicmenu" element={<PublicMenu />} />
        <Route path="/tables" element={<Tables />} />
      </Routes>
    </Router>
  );
}

export default App;
