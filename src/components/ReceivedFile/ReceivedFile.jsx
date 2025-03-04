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

// import QRCodeGenerator from "../QRCodeGenerator/QRCodeGenerator";

const ReceivedFile = () => {
  const { user } = useUser();
  const [filesData, SetfilesData] = useState([]); // State for fetched files data
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [remarks, setRemarks] = useState(""); // State for remarks input
  const [sendTo, setSendTo] = useState({}); // Keep initial state as an empty object // State for selected division
  const [divisions, setDivisions] = useState([]); // State for fetched division data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refTransId, setRefTransId] = useState(0);

  // Fetch received files data
  const getReceivedFilesData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getAllFilesByStatus/${user.userDivision.divname}`
      );
      // console.log(response.data);
      SetfilesData(response.data);
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
    if (file != null) {
      for (let i = 0; i < file.etfsFileTracking.length; i++) {
        if (file.etfsFileTracking[i].toDate == null) {
          setRefTransId(file.etfsFileTracking[i].transId);
          console.log(file.etfsFileTracking[i].transId);
        }
      }
    }
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  // Capitalize the first letter of a string
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const trackingDetails = {
    "refTransId": refTransId,
    "masterTransId": selectedFile != null ? selectedFile.masterTransId : "",
    "fileFrom": user.userId,
    "fromDivId": user.userDivision.divid,
    "fileTo": user.userId,
    "toDivId": sendTo.divId,
    "status": sendTo.divName,
    "remarks": remarks,
  };
  console.log(trackingDetails);
  if (isModalOpen) {
    console.log(selectedFile);
  }
  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedFile || isSubmitting) return;
    setIsSubmitting(true); // Prevent multiple submissions
    try {
      const response = await axios.post(
        `${baseUrl}AddTrackingDetails`,
        trackingDetails
      );
      console.log("Tracking details added successfully:", response.data);
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
                  {item.empName} - {item.empNo}
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
          {/* <QRCodeGenerator value={selectedFile.fileUtn}/> */}
          {selectedFile && (
            <FileDetails
              selectedFile={selectedFile}
              capitalizeFirstLetter={capitalizeFirstLetter}
            />
          )}
          {selectedFile && <Workflow selectedFile={selectedFile} />}

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
