import './App.css';
import Login from "./components/login";
import EmployeeDetail from "./components/employee";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/employee" component={EmployeeDetail} />
      </div>
    </Router>
  );
}

export default App;
