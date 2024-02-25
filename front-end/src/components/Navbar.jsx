import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const Navbar = () => {
  const { user } = useAuthContext();

  const handleLogout = () => {
    if (user) {
      // console.log("logginout");
      localStorage.removeItem("token");
      Navigate("/", { replace: true });
    } else {
      alert("user not available!");
    }
  };

  return (
    <div>
      <nav className="navbar d-flex navbar-light bg-light">
        <div className="container-fluid">
          <a
            style={{ fontSize: "1.7rem" }}
            className="navbar-brand fw-bolder mt-2 mt-lg-0 text-primary"
            href="#"
          >
            Quotes
          </a>
          <ul className="nav nav-pills">
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/home" className="nav-link fw-bold">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link fw-bold">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={handleLogout}
                    style={{ borderRadius: "25px" }}
                    className="btn btn-danger fw-bold"
                  >
                    logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link fw-bold">
                    Welcome
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    style={{ borderRadius: "25px" }}
                    className="btn btn-primary"
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    to="/login"
                    style={{ borderRadius: "25px" }}
                    className="btn btn-dark"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
