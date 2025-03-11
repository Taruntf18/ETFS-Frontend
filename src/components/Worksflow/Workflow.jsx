import React from "react";
import styles from "./workflow.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../environments/environment";

const Workflow = ({ fileUtn }) => {
  const [workflowDetails, SetWorkflowDetails] = useState({});
  
    const getWorkflowDetails = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}getTrackingDataByFileUTN/${fileUtn.replaceAll("/", "_")}`
        );
        SetWorkflowDetails(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };
  
    useEffect(() => {
      getWorkflowDetails();
    }, [])
  return (
    <div>
      <h3>Movement History</h3>
      {/* {JSON.stringify(workflowDetails)} */}
      <div className={styles.workflowContainer}>
        {workflowDetails.length > 0 ? (
          <table className={styles.workflowTable}>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Sent By</th>
                <th>Sent On</th>
                <th>Sent To</th>
                {/* <th>To Date</th> */}
                <th>Action</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {workflowDetails.map((file, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{file.fileFrom} - {file.fromEmpName} ({file.fromDivName})</td>
                  <td style={{ textWrap: "nowrap" }}>{file.fromDate}</td>
                  <td >{file.fileTo ? `${file.fileTo} - ${file.toEmpName} (${file.toDivName})` : file.toDivName + " Office"} </td>
                  {/* <td style={{ textWrap: "nowrap" }}>{file.toDate || "-"}</td> */}
                  <td>{file.status || "Waiting to Receive"}</td>
                  <td>{file.remarks || " "}</td>
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