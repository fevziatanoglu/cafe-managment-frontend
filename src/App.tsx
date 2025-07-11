import { BrowserRouter as Router } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Workers } from "./components/Workers/Workers";


function App() {
  return (
    <Router>
      <Workers />
    </Router>
  );
}

export default App;
