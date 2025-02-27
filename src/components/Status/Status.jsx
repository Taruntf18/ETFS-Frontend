import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./status.module.css";
import axios from "axios";
import Popup from "reactjs-popup";
import { baseUrl } from "../../environments/environment";
import { useUser } from "../UserContext/UserContext";

const Status = () => {
  const [filesData, setFilesData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("searchByFileUtn");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [divisions, setDivisions] = useState([]);
  const { currentUserRole, user } = useUser();

  // Fetch divisions for the "Send To" dropdown
 
  useEffect(() => {
    const getReceivedFilesData = async () => {
        try {
            let response;
            if(currentUserRole == "Employee"){
                response = await axios.get(`${baseUrl}getDataByEmpIdAndDivision/${user.userId}/${user.userDivision.divname}`);
                console.log(response);
            }else if(currentUserRole == "Divisional Office"){
                response = await axios.get(`${baseUrl}getAllFilesByStatus/${user.userDivision.divname}`);
            }
            setFilesData(response.data);
        } catch (error) {
            console.error("Axios Error:", error);
        }
    };
    getReceivedFilesData();
}, []);

  // Handle search by keywords
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getDataByKeywords/${searchInput.replaceAll("/", "_")}`
      );
      setFilesData(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // Handle search by date range
  const handleDateSearch = async () => {
    if (new Date(fromDate) > new Date(toDate)) {
      alert("From Date cannot be greater than To Date");
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}getDataByDateRange`, {
        params: { fromDate, toDate },
      });
      setFilesData(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // Open modal with selected file details
  const openStatusModal = (file) => {
    setSelectedFile(file);
    setShowModal(true);
  };

  // Close modal and reset states
  const closeModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setRemarks("");
    setSendTo("");
  };

  // Handle closing the modal
  const handleClose = () => {
    closeModal(); // Assuming closeModal is defined to close the modal
    console.log("Modal closed");
  };

  // Utility function to capitalize the first letter
  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        {/* Search Section */}
        <div className={styles.searchContainer}>
          <select
            className={styles.listbox}
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="searchByFileUtn">
              Search By File UTN / Subject / Description
            </option>
            <option value="searchByDate">Search By Date</option>
          </select>

          {searchType === "searchByFileUtn" && (
            <div className={styles.searchInputContainer}>
              <input
                className={styles.input_inset}
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter search term"
              />
              <button onClick={handleSearch} className={styles.receiveButton}>
                Search
              </button>
            </div>
          )}

          {searchType === "searchByDate" && (
            <div className={styles.dateSearchContainer}>
              <div className={styles.datePicker}>
                <label htmlFor="fromDate">From Date:</label>
                <input
                  type="date"
                  id="fromDate"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className={styles.datePicker}>
                <label htmlFor="toDate">To Date:</label>
                <input
                  type="date"
                  id="toDate"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <button
                onClick={handleDateSearch}
                className={styles.receiveButton}
              >
                Search
              </button>
            </div>
          )}
        </div>

        {/* Status Table */}
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>File Utn</th>
              <th className={styles.th}>Type of Document</th>
              <th className={styles.th}>Priority</th>
              <th className={styles.th}>Prepared By</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Subject</th>
              <th className={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filesData.map((item) => (
              <tr className={styles.tr} key={item.fileUtn}>
                <td className={styles.td}>{item.fileUtn}</td>
                <td className={styles.td}>{item.docType}</td>
                <td
                  className={`${
                    item.priority === "immediate"
                      ? styles.priority_immediate
                      : styles.priority_normal
                  } ${styles.td}`}
                >
                  {capitalizeFirstLetter(item.priority)}
                </td>
                <td className={styles.td}>
                  {item.empName} - {item.empNo}
                </td>
                <td className={styles.td}>{item.preparedDate}</td>
                <td className={styles.td}>{item.subject}</td>
                <td className={styles.td}>
                  <button
                    className={styles.statusButton}
                    onClick={() => openStatusModal(item)}
                  >
                    Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Popup Modal */}
        <Popup
          open={showModal}
          closeOnDocumentClick
          onClose={closeModal}
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
                        {selectedFile.empName} - {selectedFile.empNo}
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
                                <div
                                  key={index}
                                  className={styles.workflowStep}
                                >
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
                          <td>{index + 1}</td>
                          <td>{file.fromDate}</td>
                          <td>{file.fromDivName}</td>
                          <td>{file.toDivName || "-"}</td>
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

                {/* Close Button */}
                <div className={styles.closeContainer}>
                  <button className={styles.closeButton} onClick={handleClose}>
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </Popup>
      </div>
    </>
  );
};

export default Status;