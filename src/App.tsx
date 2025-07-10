import { BrowserRouter as Router } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import LandingPage from "./components/LandingPage";


function App() {
  return (
    <Router>
      <Dashboard />
    </Router>

  );
}

export default App;
