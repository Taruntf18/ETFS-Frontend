import React from "react";
import styles from "./filedetails.module.css";

const FileDetails = ({ selectedFile, capitalizeFirstLetter }) => {
  return (
    
    <div>
      {console.log(selectedFile)}
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
              <td><strong>Prepared By:</strong></td>
              <td>{selectedFile.empName} - {selectedFile.empNo}</td>
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
