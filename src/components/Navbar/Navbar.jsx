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
        localStorage.clear();
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
            <Link to="/" className="logo-container">
                <img src={logo} alt="CSIR-NAL Logo" className="navbar-logo" />
                <span className="etfs-text">ETFS</span>
            </Link>
            <ul>
                <li>
                    <button>
                        <Link className="nav-link" to="/new-file">New File</Link>
                    </button>
                </li>
                <li>
                    <button>
                        <Link className="nav-link" to="/received-file">Received File</Link>
                    </button>
                </li>
                <li>
                    <button>
                        <Link className="nav-link" to="/send-file">Send File</Link>
                    </button>
                </li>
                <li>
                    <button>
                        <Link className="nav-link" to="/status">Status</Link>
                    </button>
                </li>
            </ul>
            <div className="navbar-icons">
                <div ref={profileRef} className="profile-container">
                    {/* <FaBell style={{ margin: '0px 10px' }} className="icon notification-icon" title="Notifications" /> */}
                    <FaUserCircle
                        style={{ margin: '0px 10px' }}
                        className="icon profile-icon"
                        title="Profile"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    />
                    {showProfileMenu && (
                        <div className="dropdown-menu">
                            <p className="user-name">Tarun</p>
                            <div
                                className="dropdown-item"
                                onClick={() => setShowSwitchMenu(!showSwitchMenu)}
                            >
                                Switch Account
                            </div>
                            {showSwitchMenu && (
                                <div className="nested-dropdown">
                                    <div className="dropdown-item">Employee</div>
                                    <div className="dropdown-item">Divisional Office</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;