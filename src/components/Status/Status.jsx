import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./status.module.css";
import axios from "axios";
import Popup from "reactjs-popup";
import { baseUrl } from "../../environments/environment";
import { useUser } from "../UserContext/UserContext";
import FileDetails from "../FileDetails/FileDetails";
import Workflow from "../Worksflow/Workflow";
import QRCode from "react-qr-code";


const Status = () => {
  const [filesData, setFilesData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("searchByFileUtn");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { currentUserRole, user } = useUser();

  useEffect(() => {
    const getReceivedFilesData = async () => {
      try {
        let response;
        if (currentUserRole === "Employee") {
          response = await axios.get(
            `${baseUrl}getDataByEmpIdAndDivision/${user.userId}/${user.userDivision.divname}`
          );
        } else if (currentUserRole === "Divisional Office") {
          response = await axios.get(
            `${baseUrl}getFileMasters/${user.userDivision.divid}`
          );
        }
        setFilesData(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };
    getReceivedFilesData();
  }, [currentUserRole, user]);

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

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const handleDateSearch = async () => {
    if (new Date(fromDate) > new Date(toDate)) {
      alert("From Date cannot be greater than To Date");
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}getDataByDateRange/${fromDate}/${toDate}`);
      setFilesData(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const openStatusModal = (file) => {
    setSelectedFile(file);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFile(null);
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
              <th className={styles.th}>Owner of the file</th>
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
                <td className={styles.td}>{item.priority}</td>
                <td className={styles.td}>{item.etfsEmpModelforInitiator.empname} - {item.etfsEmpModelforInitiator.empno}</td>
                <td className={styles.td}>{item.preparedDate}</td>
                <td className={styles.td}>{item.subject}</td>
                <td className={styles.td}>
                  <button className={styles.statusButton} onClick={() => openStatusModal(item)}>
                    Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Popup Modal */}
        <Popup open={showModal} closeOnDocumentClick onClose={closeModal}>
          <div className={styles.modal}>
            
            {selectedFile && <FileDetails fileUtn={selectedFile.fileUtn} capitalizeFirstLetter={capitalizeFirstLetter} />}
            {selectedFile && <Workflow fileUtn={selectedFile.fileUtn} />}
            <div className={styles.closeContainer}>
              <button className={styles.closeButton} onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </Popup>
      </div>
    </>
  );
};

export default Status;
