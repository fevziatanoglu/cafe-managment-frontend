import { BrowserRouter as Router } from "react-router-dom";
import { Orders } from "./components/Orders/Orders";
import { Menu } from "./components/Menu/Menu";



function App() {
  return (
    <Router>
      <Menu />
    </Router>
  );
}

export default App;
