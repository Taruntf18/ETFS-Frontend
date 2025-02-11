import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/CSIR-National_Aerospace_Laboratories_Logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../UserContext/UserContext";
import "./navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const {currentUserRole} = useUser();
    const {setCurrentUserRole} = useUser();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showSwitchMenu, setShowSwitchMenu] = useState(false);
    const profileRef = useRef(null);
    console.log(currentUserRole);

    const handleLogout = () => {
        user.isLoggedIn = false;
        navigate("/");
    };

    let array = [];
    array = user.userRoles.toString().replace(/^\[|\]$/g, "").split(",");
    array[1]
    array.unshift("Employee");
    
    useEffect(() => {
        console.log(user);

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
                    {currentUserRole == "Divisional Office" && (<li><button><Link className="nav-link" to="/received-file">Inbox</Link></button></li>)}
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
                                <p className="user-name">{user.userName}</p>
                                
                                    <select onChange={(e) => {setCurrentUserRole(e.target.value)}} name="" id="">
                                        <option className="dropdown-item">Select Role</option>
                                        {array.map((data, key) => <option value={data} key={key} className="dropdown-item">{data}</option>)}
                                    </select>
                                
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
