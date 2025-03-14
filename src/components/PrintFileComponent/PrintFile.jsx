import React from "react";
import FileDetails from "../FileDetails/FileDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { FcPrint } from "react-icons/fc";
import { IoExitOutline } from "react-icons/io5";
import styles from "./printfile.module.css";

const PrintFile = () => {
  const location = useLocation();
  const { fileUtn } = location.state || {};
  const navigate = useNavigate();

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className="viteReactText"></div>
        <div className="browserInfo"></div>
        <div className="pageFooter"></div>

        <FileDetails
          fileUtn={fileUtn}
          capitalizeFirstLetter={capitalizeFirstLetter}
        />

        <div className={styles.buttonGroup}>
          <button
            className={styles.exitButton}
            onClick={() => navigate(-1)} // Navigates back to the previous page
          >
            <IoExitOutline size={24} /> Back
          </button>

          <FcPrint
            size={80}
            className={styles.printIcon}
            onClick={() => window.print()}
          />
        </div>
      </div>
    </div>
  );
};

export default PrintFile;