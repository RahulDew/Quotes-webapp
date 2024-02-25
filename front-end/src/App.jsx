import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import "./global.css";
import { useAuthContext } from "./context/authContext";
import Welcome from "./pages/Welcome";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* {user ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/home" element={<Home />} />
            </>
          ) : (
            <>
            </>
          )} */}

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
