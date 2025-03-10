import styles from "./received_file.module.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { baseUrl } from "../../environments/environment";
import { useUser } from "../UserContext/UserContext";
import FileDetails from "../FileDetails/FileDetails";
import Workflow from "../Worksflow/Workflow";
import Pagination from "react-js-pagination";

const ReceivedFile = () => {
  const { user } = useUser();
  const [filesData, SetfilesData] = useState([]);
  const [receivedFilesData, SetReceivedFilesData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [sendTo, setSendTo] = useState({});
  const [divisions, setDivisions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refTransId, setRefTransId] = useState(0);
  const [workflowDetails, SetWorkflowDetails] = useState(null);
  const [isReceiving, setIsReceiving] = useState(false);

  // Separate pagination states for both tables
  const [activePageFiles, setActivePageFiles] = useState(1); // For files to be received
  const [activePageReceivedFiles, setActivePageReceivedFiles] = useState(1); // For received files
  const itemsPerPage = 5; // Number of items per page

  // Calculate displayed data for files to be received
  const indexOfLastFile = activePageFiles * itemsPerPage;
  const indexOfFirstFile = indexOfLastFile - itemsPerPage;
  const displayedFilesData = filesData.slice(indexOfFirstFile, indexOfLastFile);

  // Calculate displayed data for received files
  const indexOfLastReceivedFile = activePageReceivedFiles * itemsPerPage;
  const indexOfFirstReceivedFile = indexOfLastReceivedFile - itemsPerPage;
  const displayedReceivedFilesData = receivedFilesData.slice(
    indexOfFirstReceivedFile,
    indexOfLastReceivedFile
  );

  // Fetch files data to be received
  const getFilesDataToBeReceived = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getAllInboxFilesByStatus/${user.userDivision.divname}`
      );
      SetfilesData(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // Fetch received files data
  const getReceivedFilesData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getAllInboxFilesByStatus/${
          user.userDivision.divname + " Received"
        }`
      );
      // console.log(response.data)
      SetReceivedFilesData(response.data);
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
    getFilesDataToBeReceived();
    getReceivedFilesData();
    fetchDivisions();
  }, []);

  // Handle file receive button click
  const fetchWorkflowDetails = async (fileUtn) => {
    try {
      const response = await axios.get(
        `${baseUrl}getTrackingDataByFileUTN/${fileUtn.replaceAll("/", "_")}`
      );
      SetWorkflowDetails(JSON.stringify(response.data));
      if (response.data != null) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].toDate == null) {
            setRefTransId(response.data[i].transId);
          }
        }
      }
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const handleSentFile = async (file) => {
    fetchWorkflowDetails(file.etfsFileMaster.fileUtn);
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  // Capitalize the first letter of a string
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const receiveTrackingDetails = {
    refTransId: refTransId,
    masterTransId: selectedFile != null ? selectedFile.masterTransId : "",
    fileFrom: user.userId,
    fromDivId: user.userDivision.divid,
    fileTo: user.userId,
    toDivId: user.userDivision.divid,
    status: user.userDivision.divname + " Received",
    remarks: "File Received by Office",
  };

  // Use useEffect to trigger the API call after state updates
  useEffect(() => {
    if (isReceiving && selectedFile) {
      const receiveFile = async () => {
        try {
          const response = await axios.post(
            `${baseUrl}AddTrackingDetails`,
            receiveTrackingDetails
          );
          alert("File Successfully Received...!");
          window.location.reload();
        } catch (error) {
          console.error("Error adding tracking details:", error);
        } finally {
          setIsReceiving(false); // Reset the receiving state
        }
      };

      receiveFile();
    }
  }, [isReceiving, selectedFile]);

  const handleReceiveFile = async (file) => {
    setRefTransId(file.etfsFileTracking.transId);
    setSelectedFile(file);
    setIsReceiving(true); // Trigger the useEffect to handle the API call
  };

  const trackingDetails = {
    refTransId: refTransId,
    masterTransId: selectedFile != null ? selectedFile.masterTransId : "",
    fileFrom: user.userId,
    fromDivId: user.userDivision.divid,
    fileTo: user.userId,
    toDivId: sendTo.divId,
    status: sendTo.divName,
    remarks: remarks,
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedFile || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${baseUrl}AddTrackingDetails`,
        trackingDetails
      );
      setIsModalOpen(false);
      setRemarks("");
      setSendTo("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding tracking details:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        {/* Table for files to be received */}
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>File No</th>
              <th className={styles.th}>Priority</th>
              <th className={styles.th}>Type of Document</th>
              <th className={styles.th}>Subject</th>
              <th className={styles.th}>Owner of the file</th>
              <th className={styles.th}>Sent By</th>
              <th className={styles.th}>Sent on</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedFilesData.map((item, key) => (
              <tr className={styles.tr} key={key}>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.etfsFileMaster.fileUtn}
                </td>
                <td
                  className={`${
                    item.etfsFileMaster.priority === "immediate"
                      ? styles.priority_immediate
                      : styles.priority_normal
                  } ${styles.td}`}
                >
                  {capitalizeFirstLetter(item.etfsFileMaster.priority)}
                </td>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.etfsFileMaster.docType}
                </td>
                <td style={{ textWrap: "wrap" }} className={styles.td}>
                  {item.etfsFileMaster.subject}
                </td>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.etfsFileMaster.etfsEmpModelforInitiator.empname} -{" "}
                  {item.etfsFileMaster.etfsEmpModelforInitiator.empno}
                </td>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.etfsFileTracking.fromEmpName} -{" "}
                  {item.etfsFileTracking.fromEmpNo} (
                  {item.etfsFileTracking.fromDivName})
                </td>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.etfsFileTracking.fromDate}
                </td>
                <td className={styles.td}>
                  <button
                    className={styles.receiveButton}
                    onClick={() => handleReceiveFile(item)}
                  >
                    Receive
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          activePage={activePageFiles}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={filesData.length}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => setActivePageFiles(pageNumber)}
          itemClass={styles.pageItem}
          linkClass={styles.pageLink}
        />

        {/* Table for received files */}
        <table style={{ marginTop: "140px" }} className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>File No</th>
              <th className={styles.th}>Priority</th>
              <th className={styles.th}>Type of Document</th>
              <th className={styles.th}>Subject</th>
              <th className={styles.th}>Owner of the file</th>
              <th className={styles.th}>Received on</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedReceivedFilesData.map((item, key) => (
              <tr className={styles.tr} key={key}>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.etfsFileMaster.fileUtn}
                </td>
                <td
                  className={`${
                    item.etfsFileMaster.priority === "immediate"
                      ? styles.priority_immediate
                      : styles.priority_normal
                  } ${styles.td}`}
                >
                  {capitalizeFirstLetter(item.etfsFileMaster.priority)}
                </td>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.etfsFileMaster.docType}
                </td>
                <td style={{ textWrap: "wrap" }} className={styles.td}>
                  {item.etfsFileMaster.subject}
                </td>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.etfsFileMaster.etfsEmpModelforInitiator.empname} -{" "}
                  {item.etfsFileMaster.etfsEmpModelforInitiator.empno}
                </td>
                <td style={{ textWrap: "nowrap" }} className={styles.td}>
                  {item.etfsFileTracking.fromDate}
                </td>
                <td className={styles.td}>
                  <button
                    className={styles.SendtoButton}
                    onClick={() => handleSentFile(item)}
                  >
                    Send
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          activePage={activePageReceivedFiles}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={receivedFilesData.length}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => setActivePageReceivedFiles(pageNumber)}
          itemClass={styles.pageItem}
          linkClass={styles.pageLink}
        />
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
          {selectedFile && (
            <FileDetails
              fileUtn={selectedFile.etfsFileMaster.fileUtn}
              capitalizeFirstLetter={capitalizeFirstLetter}
            />
          )}
          <br></br>
          {selectedFile && (
            <Workflow fileUtn={selectedFile.etfsFileMaster.fileUtn} />
          )}

          <br></br>
          <br></br>

          {/* Remarks and Send To Section */}
          <div className={styles.remarksSendContainer}>
            <div className={styles.row}>
              <label className={styles.label}>
                <strong>Comments :</strong>
              </label>
              <textarea
                className={styles.remarksInput}
                placeholder="Enter Comments..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
            </div>

            <div className={styles.row}>
              <label className={styles.label}>
                <strong>Send To:</strong>
              </label>
              <select
                className={styles.sendToDropdown}
                value={sendTo.divName ? JSON.stringify(sendTo) : ""}
                onChange={(e) => {
                  const selectedDivision = e.target.value
                    ? JSON.parse(e.target.value)
                    : {};
                  setSendTo(selectedDivision);
                }}
              >
                <option value="">Select Division</option>
                {divisions.map((division, index) => (
                  <option key={index} value={JSON.stringify(division)}>
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
        </div>
      </Popup>
    </>
  );
};

export default ReceivedFile;