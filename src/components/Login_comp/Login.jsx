import React, { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login_styles.module.css";
import animationData from "./Login_animation1.json";
import Lottie from "react-lottie";
import Nal_Logo from "../Images/CSIR-National_Aerospace_Laboratories_Logo.png";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [userid, SetUserid] = useState("");
  const [password, Setpassword] = useState("");

  const [userDetails, SetuserDetails] = useState([]);
  const [roleDetails, SetroleDetails] = useState([]);
  
  console.log(userDetails);
  console.log(roleDetails);


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  const fetchUserDetails = async () => {
    try {
      const result = await axios.post('http://localhost:8080/login', {
        "username": userid,
        "password":password,
        "active":"y"
      });
      SetuserDetails(result.data.user);
      SetroleDetails(result.data.roles);
      localStorage.setItem("userId",   JSON.stringify(result.data.user));
      localStorage.setItem("Roles",  JSON.stringify(result.data.roles));
    } catch (error) {
      console.log("Axios Error:", error); 
    }
  }

  const handleLogin = () => {
    if (userid === "" || password === ""){
      alert("Enter the details")
    } else{
      fetchUserDetails();
      navigate("/new-file")
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.animation}>
          <Lottie options={defaultOptions} height={500} width={500}  autoPlay loop  />
        </div>
        <div className={styles.login_form}>
          <h2>
            <img height={100} width={100} src={Nal_Logo} alt="" style={{ display: "inline-block", marginRight: "20px" }} />
            E-Tracking
          </h2>
          <div className={`${styles.input_group} ${styles.role_select}`}>
            <label htmlFor="user-id">User ID</label>
            <input id="user-id" name="user-id" required type="text" onChange={(e) => { SetUserid(e.target.value) }} />
          </div>
          <div className={`${styles.input_group} ${styles.role_select}`}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" required type="password" onChange={(e) => { Setpassword(e.target.value) }} />
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;