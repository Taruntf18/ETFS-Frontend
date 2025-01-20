import React from "react";
import Navbar from "../Navbar/Navbar"; 
import "./mainsection.css";

const MainSection = () => {
  return (
    <div className="main-container">
      <Navbar />
      <div className="content">
        <WelcomePage />
      </div>
    </div>
  );
};

const WelcomePage = () => (
  <div className="welcome-content">
    <h1>Welcome to the E-Tracking System</h1>
    <p>Track, manage, and monitor your files effortlessly with our streamlined interface. Use the navigation bar above to navigate.</p>
    <p>Start your journey with efficient file tracking today!</p>
  </div>
);

export default MainSection;
