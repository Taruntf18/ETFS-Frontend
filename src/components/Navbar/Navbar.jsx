import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Images/CSIR-National_Aerospace_Laboratories_Logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../UserContext/UserContext";
import "./navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { division } = useUser();
    const { setDivision } = useUser();
    const { updateUser } = useUser();
    const { currentUserRole } = useUser();
    const { setCurrentUserRole } = useUser();
    
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileRef = useRef(null);
    console.log(user);

    const handleLogout = () => {
        updateUser({
            "userId": "",
            "userName": "",
            "userRoles": "",
            "userDivision": "",
            "userSection": "",
            "isLoggedIn": false,
        });
        localStorage.clear();
        setDivision([]);
        navigate("/");
    };

    let array = user.userRoles.toString().replace(/^\[|\]$/g, "").split(",");
    array.unshift("Employee");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
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
                <NavLink to="/mainsection" className="logo-container">
                    <img src={logo} alt="CSIR-NAL Logo" className="navbar-logo" />
                    <span className="etfs-text">ETFS</span>
                </NavLink>
                <ul>
                    <li>
                        <NavLink to="/new-file" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>New File</NavLink>
                    </li>
                    {currentUserRole === "Divisional Office" && (
                        <li>
                            <NavLink to="/received-file" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Inbox</NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to="/status" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Status</NavLink>
                    </li>
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
                                <select onChange={(e) => { setCurrentUserRole(e.target.value); window.location.reload() }}>
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
