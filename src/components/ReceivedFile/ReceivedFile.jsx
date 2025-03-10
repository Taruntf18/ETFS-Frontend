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

// import QRCode from 'react-native-qrcode-svg';
// import QRCodeGenerator from "../QRCodeGenerator/QRCodeGenerator";

const ReceivedFile = () => {
  const { user } = useUser();
  const [filesData, SetfilesData] = useState([]); // State for fetched files data
  const [receivedFilesData, SetReceivedFilesData] = useState([]); // State for fetched files data
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [remarks, setRemarks] = useState(""); // State for remarks input
  const [sendTo, setSendTo] = useState({}); // Keep initial state as an empty object // State for selected division
  const [divisions, setDivisions] = useState([]); // State for fetched division data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refTransId, setRefTransId] = useState(0);
  const [workflowDetails, SetWorkflowDetails] = useState(null);
  const [activePage, setActivePage] = useState(1); // Tracks current page
  const itemsPerPage = 5; // Number of items per page
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const displayedFilesData = filesData.slice(indexOfFirstItem, indexOfLastItem);
  const displayedReceivedFilesData = receivedFilesData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Fetch files data to be received
  const getFilesDataToBeReceived = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getAllInboxFilesByStatus/${user.userDivision.divname}`
      );
      console.log(response.data);
      SetfilesData(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // Fetch received files data and to be sent
  const getReceivedFilesData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getAllInboxFilesByStatus/${
          user.userDivision.divname + " Received"
        }`
      );
      console.log(response.data);
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
      console.log(JSON.stringify(response.data));
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

  const handleReceiveFile = async (file) => {
    setRefTransId(file.etfsFileTracking.transId);
    setSelectedFile(file);

    try {
      const response = await axios.post(
        `${baseUrl}AddTrackingDetails`,
        receiveTrackingDetails
      );

      alert("File Successfully Received...!");

      window.location.reload();
    } catch (error) {
      console.error("Error adding tracking details:", error);
    }
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
    setIsSubmitting(true); // Prevent multiple submissions
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
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={filesData.length}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => setActivePage(pageNumber)}
          itemClass={styles.pageItem}
          linkClass={styles.pageLink}
        />

        <table style={{ margin: "140px 0px" }} className={styles.table}>
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
            {receivedFilesData.map((item, key) => (
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
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={receivedFilesData.length}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => setActivePage(pageNumber)}
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
