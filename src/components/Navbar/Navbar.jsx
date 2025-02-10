import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../Images/CSIR-National_Aerospace_Laboratories_Logo.png";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios'

const Navbar = () => {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showSwitchMenu, setShowSwitchMenu] = useState(false);
    const [roles, Setroles] = useState("");
    const [user, setUser] = useState("");
    const profileRef = useRef(null);
    const [filesData, SetfilesData] = useState([]);

    const getReceivedFilesData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getDataByEmpId/${localStorage.getItem("userId").toString().slice(1, -1)}`);
            console.log(response.data);
            SetfilesData(response.data);
        } catch (error) {
            console.error("Axios Error:", error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    let array = [];
    if (roles && roles !== "[]") {
        array = roles.toString().replace(/^\[|\]$/g, "").split(",");
        array[1]
    }
    array.unshift("Employee");

    useEffect(() => {
        if (localStorage.getItem("userId") == null) {
            navigate("/");
        } else {
            const storedUser = localStorage.getItem("userId").toString() || '""'; // Prevent null
            const storedRoles = localStorage.getItem("Roles").toString() || "[]"; // Prevent null
            setUser(storedUser);
            Setroles(storedRoles.substring(1, storedRoles.length - 1));
            getReceivedFilesData();
        }
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
        <>
            <div style={{ height: '100px' }}></div>
            <nav className="navbar">
                <Link to="/mainsection" className="logo-container">
                    <img src={logo} alt="CSIR-NAL Logo" className="navbar-logo" />
                    <span className="etfs-text">ETFS</span>
                </Link>
                <ul>
                    <li><button><Link className="nav-link" to="/new-file">New File</Link></button></li>
                    <li><button><Link className="nav-link" to="/received-file">Inbox</Link></button></li>
                    <li><button><Link className="nav-link" to="/status">Status</Link></button></li>
                </ul>
                <div className="navbar-icons">
                    <div ref={profileRef} className="profile-container">
                        <FaUserCircle
                            style={{ margin: "0px 10px" }}
                            className="icon profile-icon"
                            title="Profile"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        />
                        {showProfileMenu && (
                            <div className="dropdown-menu">
                                <p className="user-name">{filesData[0].empName}</p>
                                <div
                                    className="dropdown-item"
                                    onClick={() => setShowSwitchMenu(!showSwitchMenu)}
                                >
                                    Switch Account
                                </div>
                                {showSwitchMenu && (
                                    <div className="nested-dropdown">
                                        {array.map((data, key) => <div onClick={() => {localStorage.setItem("currentRole", data); location.reload();} } value={data} key={key} className="dropdown-item">{data}</div>)}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </>
    );
};

export default Navbar;