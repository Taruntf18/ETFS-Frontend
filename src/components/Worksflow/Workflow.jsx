import React from "react";
import styles from "./workflow.module.css";

const Workflow = ({ selectedFile }) => {
  return (
    <div>
      <h3>WORKFLOW</h3>
      <div className={styles.workflowContainer}>
        {selectedFile?.etfsFileTracking?.length > 0 ? (
          <table className={styles.workflowTable}>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>File From</th>
                <th>File Date</th>
                <th>File To</th>
                <th>To Date</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {selectedFile.etfsFileTracking.map((file, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{file.fileFrom} - {file.fromEmpName} ({file.fromDivName})</td>
                  <td style={{ textWrap: "nowrap" }}>{file.fromDate}</td>
                  <td >{file.fileTo} - {file.toEmpName} ({file.toDivName || "-"})</td>
                  <td style={{ textWrap: "nowrap" }}>{file.toDate || "-"}</td>
                  <td>{file.status || "-"}</td>
                  <td>{file.remarks || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No file tracking data available.</p>
        )}
      </div>
    </div>
  );
};

export default Workflow;
