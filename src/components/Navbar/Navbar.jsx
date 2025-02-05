import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../Images/CSIR-National_Aerospace_Laboratories_Logo.png";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showSwitchMenu, setShowSwitchMenu] = useState(false);
    const [roles, Setroles] = useState([]);
    const [user, setUser] = useState("");
    const profileRef = useRef(null);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };
    var array = new Array();
    array = roles.toString().split(',');
    array[0] = array[0].substring(1);
    array[array.length - 1] = array[array.length - 1].substring(0, array[array.length - 1].length - 1);
    array.unshift("Employee");

    // Close dropdown if clicked outside
    useEffect(() => {
        setUser(localStorage.getItem("userId"));
        Setroles(localStorage.getItem("Roles"));
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
                    <FaUserCircle
                        style={{ margin: '0px 10px' }}
                        className="icon profile-icon"
                        title="Profile"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    />
                    {showProfileMenu && (
                        <div className="dropdown-menu">
                            <p className="user-name">{user.substring(1, user.length - 1)}</p>
                            <div
                                className="dropdown-item"
                                onClick={() => setShowSwitchMenu(!showSwitchMenu)}
                            >
                                Switch Account
                            </div>
                            {showSwitchMenu && (
                                <div className="nested-dropdown">
                                    {array.map((data, key) => <div key={key} className="dropdown-item">{data}</div>)}
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