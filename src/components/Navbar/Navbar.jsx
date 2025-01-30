import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../Images/CSIR-National_Aerospace_Laboratories_Logo.png";
import { FaUserCircle, FaBell } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSwitchMenu, setShowSwitchMenu] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    navigate("/login");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
        setShowSwitchMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="CSIR-NAL Logo" className="navbar-logo" />
      </Link>
      <ul>
        <li>
          <Link to="/new-file">New File</Link>
        </li>
        <li>
          <Link to="/received-file">Received File</Link>
        </li>
        <li>
          <Link to="/send-file">Send File</Link>
        </li>
        <li>
          <Link to="/status">Status</Link>
        </li>
      </ul>
      <div className="navbar-icons">
        <div ref={profileRef} className="profile-container">
          <FaBell
            style={{ margin: "0px 10px" }}
            className="icon notification-icon"
            title="Notifications"
          />
          <FaUserCircle
            style={{ margin: "0px 10px" }}
            className="icon profile-icon"
            title="Profile"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />
          {showProfileMenu && (
            <div className="dropdown-menu">
              <p className="user-name">John Doe</p>
              <div
                className="dropdown-item"
                onClick={() => setShowSwitchMenu(!showSwitchMenu)}
              >
                Switch Account
              </div>
              {showSwitchMenu && (
                <div className="nested-droapdown">
                  <div className="dropdown-item">Director</div>
                  <div className="dropdown-item">
                    Advisor
                    <div className="nested-submenu">
                      <div className="dropdown-item">M&N</div>
                      <div className="dropdown-item">W&S</div>
                    </div>
                  </div>
                  <div className="dropdown-item">Cluster Chairman</div>
                  <div className="dropdown-item">Employee</div>
                  <div className="dropdown-item">Divisional Office</div>
                </div>
              )}
            </div>
          )}
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
