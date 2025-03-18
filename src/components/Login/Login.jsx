import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login_styles.module.css";
import animationData from "../Lotties/Login_animation1.json";
import Lottie from "react-lottie";
import Nal_Logo from "../Images/CSIR-National_Aerospace_Laboratories_Logo.png";
import axios from "axios";
import { useUser } from "../UserContext/UserContext";
import { baseUrl } from "../../environments/environment";

const Login = () => {
  const navigate = useNavigate();
  const { updateUser, setDivision, setCurrentUserRole } = useUser();
  const [userid, SetUserid] = useState("");
  const [password, Setpassword] = useState("");
  const [message, SetMessage] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchUserDetails = async () => {
    setLoading(true);  // Start loading
    SetMessage("");    // Clear previous messages

    try {
      const result = await axios.post(`${baseUrl}login`, {
        "empNo": userid,
        "password": password
      });

      if (result.data.user.length === 5 && result.data.activecode === 9) {
        SetMessage("Not Authorized");
        return;
      }

      if (result.data.user.length === 6 && result.data.roles.length === 0) {
        SetMessage("Not Authorized");
        return;
      }

      updateUser({
        "userId": result.data.user,
        "userName": result.data.user.length === 5 
          ? result.data.empData.empname 
          : result.data.empData.empName,
        "userRoles": "",
        "userDivision": "",
        "userSection": result.data.empData.section,
        "userDesignation": result.data.empData.designation,
        "isLoggedIn": true,
        "hod": null,
      });

      setDivision(Array.isArray(result.data.divisions) ? result.data.divisions : []);

      if (result.data.user.length === 5) {
        setCurrentUserRole("Employee");
      } else {
        if (result.data.roles.length === 0) {
          throw new Error("Something went wrong!");
        } else {
          setCurrentUserRole("Divisional Office");
        }
      }
      SetMessage("Login Successful");

      if (result.data.divisions.length <= 1) {
        updateUser({
          "userId": result.data.user,
          "userName": result.data.user.length === 5 
            ? result.data.empData.empname 
            : result.data.empData.empName,
          "userRoles": "",
          "userDivision": result.data.divisions[0],
          "userSection": result.data.empData.section,
          "userDesignation": result.data.empData.designation,
          "isLoggedIn": true,
          "hod": null,
        });

        if (result.data.user.length === 6 && result.data.isFirstLogin === 'Y') {
          navigate('/changePassword');
        } else {
          if (result.data.user.length === 6 && result.data.roles === 'Divisional Office') {
            navigate('/received-file');
          } else {
            navigate('/mainsection');
          }
        }
      } else {
        navigate('/SelectDivision');
      }
    } catch (error) {
      SetMessage("Login Failed");
      console.log("Axios Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleLogin = () => {
    if (userid === "" || password === "") {
      alert("Enter the details");
    } else {
      fetchUserDetails();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.id === "user-id") {
        document.getElementById("password").focus();
      } else {
        handleLogin();
      }
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.animation}>
          <Lottie options={defaultOptions} height={500} width={500} autoPlay loop />
        </div>
        <div className={styles.login_form}>
          <h2>
            <img
              height={100}
              width={100}
              src={Nal_Logo} alt=""
              style={{ display: "inline-block", marginRight: "20px" }}
            />
            ETFS
          </h2>
          <h5>E - Tracking File System</h5>
          <div className={`${styles.input_group} ${styles.role_select}`}>
            <label htmlFor="user-id">User ID</label>
            <input
              placeholder="Enter UserId"
              id="user-id"
              name="user-id"
              required
              type="text"
              value={userid}
              onChange={(e) => SetUserid(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={`${styles.input_group} ${styles.role_select}`}>
            <label htmlFor="password">Password</label>
            <input
              placeholder="Enter Password"
              id="password"
              name="password"
              required
              type="password"
              value={password}
              onChange={(e) => Setpassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button type="button" onClick={handleLogin} disabled={loading}>
            {loading ? "Processing..." : "Login"}
          </button>
          {loading && <p style={{ color: 'blue' }}>Processing...</p>}
          <p style={{ color: 'red', fontWeight: 'bolder' }}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;