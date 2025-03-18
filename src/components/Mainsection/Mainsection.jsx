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
    <h1>e -Tracking File System</h1><br/>
    <p>
      Effortlessly manage and monitor your files with a powerful yet simple interface.
      Stay informed, stay organized, and streamline your workflow.
    </p>
  </div>
);

export default MainSection;
