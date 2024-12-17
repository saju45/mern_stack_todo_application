import { Toaster } from "react-hot-toast";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import SignUp from "./components/SignUp";

function App() {
  const token = localStorage.getItem("jwt");
  console.log(token);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
