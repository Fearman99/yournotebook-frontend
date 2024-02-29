import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Navbar(props) {
  const [sun, setSun] = useState("☀️");
  const [navbarBackgroundColor, setNavbarBackgroundColor] = useState(
    props.mode === "light" ? "white" : "black"
  );
  const [offcanvasBackgroundColor, setOffcanvasBackgroundColor] = useState(
    props.mode === "light" ? "white" : "#343a40"
  );
  const [offcanvasVisible, setOffcanvasVisible] = useState(false);

  const logo = () => {
    setSun(prevSun => (prevSun === "🌑" ? "☀️" : "🌑"));
  };

  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };

  useEffect(() => {
    setNavbarBackgroundColor(props.mode === "light" ? "white" : "black");
    setOffcanvasBackgroundColor(props.mode === "light" ? "white" : "#343a40");
  }, [props.mode]);

  const toggleOffcanvas = () => {
    setOffcanvasVisible(!offcanvasVisible);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      style={{
        backgroundColor: navbarBackgroundColor,
        transition: "background-color 0.5s ease-in-out",
      }}
    >
      <Link className="navbar-brand" to="/">
        <img
          src="../notebook.png"
          width="30"
          height="30"
          className="d-inline-block align-top mx-2"
          alt=""
        />
        YourNotebook
      </Link>

      

      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleOffcanvas}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`offcanvas offcanvas-end ${offcanvasVisible ? "show" : ""}`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        style={{ backgroundColor: offcanvasBackgroundColor }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={toggleOffcanvas}
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Note➕ <span className="sr-only"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About🪧
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/all-notes" ? "active" : ""
                }`}
                to="/all-notes"
              >
                iNotes📒
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/pinned-notes" ? "active" : ""
                }`}
                to="/pinned-notes"
              >
                Pinned📌
              </Link>
            </li>
            <li className="nav-item">
              <div className="form-check form-switch mx-2 my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    props.toggleModes();
                    logo();
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  <span role="img" aria-label="sun">
                    {sun}
                  </span>
                  <span className="visually-hidden">Switch Theme</span>
                </label>
              </div>
            </li>
          </ul>

          <form className="d-flex align-items-center">
            {!localStorage.getItem("authtoken") ? (
              <div>
                <Link
                  className="btn btn-outline-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <button onClick={handleLogout} className="btn btn-outline-primary mx-2">
                Logout
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}
