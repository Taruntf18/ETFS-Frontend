import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Images/CSIR-National_Aerospace_Laboratories_Logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../UserContext/UserContext";
import axios from "axios";
import { baseUrl } from "../../environments/environment";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { division } = useUser();
  const { setDivision } = useUser();
  const { updateUser } = useUser();
  const { currentUserRole } = useUser();
  const { setCurrentUserRole } = useUser();
  const [rolesData, setRolesData] = useState("");
  const [hodData, setHodData] = useState(null);
  const rolesArray = new Array();


  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  console.log()
  if(user.userId.length == 5) rolesArray.push("Employee");
  for (let i = 0; i < rolesData.length; i++) {
    rolesArray.push(rolesData[i].role_name);
  }

  useEffect(() => {
    const getReceivedFilesData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}getRolesDetails/${user.userId}/${user.userDivision.divid}`
        );
        setRolesData(response.data.roles); 
        setHodData(response.data.hod);
        updateUser({
          "userId": user.userId,
          "userName": user.userName,
          "userRoles": user.userRoles,
          "userDivision": user.userDivision,
          "userSection": user.userSection,
          "userDesignation": user.userDesignation,
          "isLoggedIn": true,
          "hod":response.data.hod,
        });
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };
    getReceivedFilesData();
  }, []);

  const handleLogout = () => {
    updateUser({
      "userId": "",
      "userName": "",
      "userRoles": "",
      "userDivision": "",
      "userSection": "",
      "userDesignation": "",
      "isLoggedIn": false,
      "hod": null,
    });
    localStorage.clear();
    navigate("/");
  };

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
      <div style={{ height: "100px" }}></div>
      <nav className="navbar">
        <NavLink to="/mainsection" className="logo-container">
          <img src={logo} alt="CSIR-NAL Logo" className="navbar-logo" />
          <span className="etfs-text">ETFS</span>
        </NavLink>
        <ul>
          <li>
            <NavLink
              to="/new-file"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              New File
            </NavLink>
          </li>
          {currentUserRole === "Divisional Office" && (
            <li>
              <NavLink
                to="/received-file"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Inbox
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/status"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Status
            </NavLink>
          </li>
          {hodData != null && (
            <li>
              <NavLink
                to="/hod"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Divisional Staff
              </NavLink>
            </li>
          )}
        </ul>
        <div className="navbar-icons">
          <h3>
            {user.userDivision.divname}
          </h3>
          <div ref={profileRef} className="profile-container">
            <FaUserCircle
              style={{ margin: "0px 10px" }}
              className="icon profile-icon"
              title="Profile"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="dropdown-menu">
                <p style={{ textWrap: "nowrap" }} className="user-name">
                  {user.userName} <br />{" "}
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      margin: "0px 0px",
                    }}
                  >
                    {user.userDesignation}
                  </span>{" "}<br/>
                  <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                    {user.userId}
                  </span>{" "}
                </p>
                {rolesArray.length > 1 && (
                  <select
                    onChange={(e) => {
                      setCurrentUserRole(e.target.value);
                      if(e.target.value == "Divisional Office") navigate('/received-file')
                      if(e.target.value == "Employee") navigate('/new-file')
                      window.location.reload();
                    }}
                  >
                    <option className="dropdown-item">Select Role</option>
                    {rolesArray.map((data, key) => (
                      <option value={data} key={key} className="dropdown-item">
                        {data}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;