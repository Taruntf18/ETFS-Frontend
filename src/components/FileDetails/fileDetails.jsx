import React, { useState } from "react";
import styles from "./filedetails.module.css";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../environments/environment";
import QRCode from "react-qr-code";

const FileDetails = ({ fileUtn, capitalizeFirstLetter }) => {
  const [selectedFile, SetSelectedFile] = useState({});
 

  const getReceivedFilesData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getFileDataByFileUtn/${fileUtn.replaceAll("/", "_")}`
      );
      SetSelectedFile(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  useEffect(() => {
    getReceivedFilesData();
  }, [])
  return (

    <div>
      <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={selectedFile ? `${selectedFile.fileUtn} $ ${selectedFile.fileInitiator} $ ${selectedFile.fileInitiatorEmpName}$ ${selectedFile.divName}` : ""}
          viewBox="0 0 512 512"
        />
      </div>
      <h2>File Details</h2>
      {selectedFile && (
        <table className={styles.modalTable}>
          <tbody>
            <tr>
              <td><strong>File Utn:</strong></td>
              <td>{selectedFile.fileUtn}</td>
            </tr>
            <tr>
              <td><strong>Type of Document:</strong></td>
              <td>{selectedFile.docType}</td>
            </tr>
            <tr>
              <td><strong>Priority:</strong></td>
              <td>{capitalizeFirstLetter(selectedFile.priority)}</td>
            </tr>
            <tr>
              <td><strong>Owner Of The File</strong></td>
              <td>{selectedFile.fileInitiatorEmpName} - {selectedFile.fileInitiator}</td>
            </tr>
            <tr>
              <td><strong>Date:</strong></td>
              <td>{selectedFile.preparedDate}</td>
            </tr>
            <tr>
              <td><strong>Subject:</strong></td>
              <td>{selectedFile.subject}</td>
            </tr>
            <tr>
              <td><strong>Description:</strong></td>
              <td>{selectedFile.description}</td>
            </tr>
            <tr>
              <td><strong>From Division:</strong></td>
              <td>{selectedFile.divName}</td>
            </tr>
            <tr>
              <td><strong>Through Whom:</strong></td>
              <td>{selectedFile.sendingThrough}</td>
            </tr>
            <tr>
              <td><strong>Proposed Workflow</strong></td>
              <td>
                <div className={styles.workflowContainer}>
                  {selectedFile.workflow && selectedFile.workflow.trim() !== "" ? (
                    selectedFile.workflow.split(",").map((step, index) => (
                      <div key={index} className={styles.workflowStep}>
                        {index + 1}. {step}
                      </div>
                    ))
                  ) : (
                    <div>-</div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FileDetails;
