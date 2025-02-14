import styles from "./received_file.module.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { baseUrl } from "../../environments/environment";
import { useUser } from "../UserContext/UserContext";

const ReceivedFile = () => {
  const{user} =  useUser();

  const [filesData, SetfilesData] = useState([]); // State for fetched files data
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [remarks, setRemarks] = useState(""); // State for remarks input
  const [sendTo, setSendTo] = useState(""); // State for selected division
  const [divisions, setDivisions] = useState([]); // State for fetched division data

  // Fetch received files data
  const getReceivedFilesData = async () => {
    try {
      const response = await axios.get(`${baseUrl}getAllFiles`);
      SetfilesData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // Fetch division data
  const fetchDivisions = async () => {
    try {
      const response = await axios.get(`${baseUrl}getDivisionData`);
      setDivisions(response.data);
    } catch (error) {
      console.error("Error fetching division data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getReceivedFilesData();
    fetchDivisions();
  }, []);

  // Handle file receive button click
  const handleReceive = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  // Capitalize the first letter of a string
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  // Handle remarks input change
  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  // Handle sendTo dropdown change
  const handleSendToChange = (event) => {
    setSendTo(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedFile) return;

    const trackingDetails = {
      fileUtn: selectedFile.fileUtn,
      refTransId: selectedFile.transId,
      masterTransId: selectedFile.masterTransId,
      remarks: "testing ",
      fileTo: 53924,
      status:2,
      preparedBy: user.userName
      // Add other necessary fields here
    };

    try {
      const response = await axios.post(`${baseUrl}AddTrackingDetails`, trackingDetails);
      console.log("Tracking details added successfully:", response.data);
      setIsModalOpen(false); // Close the modal after successful submission
      setRemarks(""); // Reset remarks
      setSendTo(""); // Reset sendTo
    } catch (error) {
      console.error("Error adding tracking details:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>File Utn</th>
              <th className={styles.th}>Type of Document</th>
              <th className={styles.th}>Priority</th>
              <th className={styles.th}>Prepared By</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Subject</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Through Whom</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filesData.map((item, key) => (
              <tr className={styles.tr} key={key}>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.fileUtn}
                </td>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.docType}
                </td>
                <td
                  className={`${
                    item.priority === "immediate"
                      ? styles.priority_immediate
                      : styles.priority_normal
                  } ${styles.td}`}
                >
                  {capitalizeFirstLetter(item.priority)}
                </td>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.empName} - {item.empNumber}
                </td>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.preparedDate}
                </td>
                <td style={{ textWrap: "wrap" }} className={styles.td}>
                  {item.subject}
                </td>
                <td style={{ textWrap: "wrap" }} className={styles.td}>
                  {item.description}
                </td>
                <td className={styles.td}>{item.sendingThrough}</td>
                <td className={styles.td}>
                  <button
                    className={styles.receiveButton}
                    onClick={() => handleReceive(item)}
                  >
                    Receive
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      <Popup
        open={isModalOpen}
        closeOnDocumentClick
        onClose={() => setIsModalOpen(false)}
        contentStyle={styles.popupContent}
        overlayStyle={styles.popupOverlay}
      >
        <div className={styles.modal}>
          <h2>File Details</h2>
          {selectedFile && (
            <>
              {/* File Details Table */}
              <table className={styles.modalTable}>
                <tbody>
                  <tr>
                    <td>
                      <strong>File Utn:</strong>
                    </td>
                    <td>{selectedFile.fileUtn}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Type of Document:</strong>
                    </td>
                    <td>{selectedFile.docType}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Priority:</strong>
                    </td>
                    <td>{capitalizeFirstLetter(selectedFile.priority)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Prepared By:</strong>
                    </td>
                    <td>
                      {selectedFile.empName} - {selectedFile.empNumber}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date:</strong>
                    </td>
                    <td>{selectedFile.preparedDate}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Subject:</strong>
                    </td>
                    <td>{selectedFile.subject}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Description:</strong>
                    </td>
                    <td>{selectedFile.description}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>From Division:</strong>
                    </td>
                    <td>{selectedFile.divName}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Through Whom:</strong>
                    </td>
                    <td>{selectedFile.sendingThrough}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Proposed Workflow</strong>
                    </td>
                    <td>
                      <div className={styles.workflowContainer}>
                        {selectedFile.workflow &&
                        selectedFile.workflow.trim() !== "" ? (
                          selectedFile.workflow
                            .split(",")
                            .map((step, index) => (
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

              {/* Actual Workflow - Separate Table */}
              <h3>WORKFLOW</h3>
              <div className={styles.workflowContainer}>
                {selectedFile.etfsFileTracking &&
                selectedFile.etfsFileTracking.length > 0 ? (
                  <table className={styles.workflowTable}>
                    <thead>
                      <tr>
                        <th>sl.no</th>
                        <th>File Date</th>
                        <th>File From</th>
                        <th>File To</th>
                        <th>To Date</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFile.etfsFileTracking.map((file, index) => (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{file.fileDate}</td>
                          <td>{file.fileFrom}</td>
                          <td>{file.fileTo || "-"}</td>
                          <td>{file.toDate || "-"}</td>
                          <td>{file.remarks || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No file tracking data available.</p>
                )}
              </div>

              {/* Remarks and Send To Section */}
              <div className={styles.remarksSendContainer}>
                <div className={styles.row}>
                  <label className={styles.label}>
                    <strong>Remarks:</strong>
                  </label>
                  <textarea
                    className={styles.remarksInput}
                    placeholder="Enter remarks..."
                    value={remarks}
                    onChange={handleRemarksChange}
                  ></textarea>
                </div>

                <div className={styles.row}>
                  <label className={styles.label}>
                    <strong>Send To:</strong>
                  </label>
                  <select
                    className={styles.sendToDropdown}
                    value={sendTo}
                    onChange={handleSendToChange}
                  >
                    <option value="">Select Division</option>
                    {divisions.map((division, index) => (
                      <option key={index} value={division.divName}>
                        {division.divName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className={styles.submitContainer}>
                <button className={styles.submitButton} onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </Popup>
    </>
  );
};

export default ReceivedFile;