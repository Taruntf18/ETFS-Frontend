import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./mainsection.module.css";

const MainSection = () => {
  return (
    <div className={styles.main_container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.welcome_content}>
          <h1>e -Tracking File System</h1>
          <br />
          <p>
            Effortlessly manage and monitor your files with a powerful yet
            simple interface. Stay informed, stay organized, and streamline your
            workflow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
