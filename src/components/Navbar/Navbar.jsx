import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../Images/CSIR-National_Aerospace_Laboratories_Logo.png";
import { FaUserCircle, FaBell } from "react-icons/fa"; // Import icons

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); // Redirect to Login page
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="CSIR-NAL Logo" className="navbar-logo" />
      </Link>
      <ul>
        <li><Link to="/new-file">New File</Link></li>
        <li><Link to="/received-file">Received File</Link></li>
        <li><Link to="/send-file">Send File</Link></li>
        <li><Link to="/status">Status</Link></li>
      </ul>
      <div className="navbar-icons">
        <FaBell className="icon notification-icon" title="Notifications" />
        <FaUserCircle className="icon profile-icon" title="Profile" />
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;