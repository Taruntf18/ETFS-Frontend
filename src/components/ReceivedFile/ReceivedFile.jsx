import styles from "./received_file.module.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ReceivedFile = () => {
  const [filesData, SetfilesData] = useState([]);
  const [documentArr, setDocumentArr] = useState([]);
  const [user, SetUser] = useState(
    localStorage.getItem("userId").toString().slice(1, -1)
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getDocTypeById(docId, documents) {
    const doc = documents.find((doc) => doc.docId === docId);
    return doc ? doc.docType : null;
  }

  console.log(filesData);

  const getReceivedFilesData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getDataByEmpId/${user}`
      );
      SetfilesData(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  useEffect(() => {
    getReceivedFilesData();
  }, []);

  const handleReceive = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docResp = await axios.get("http://localhost:8080/getAllDocument");
        setDocumentArr(docResp.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchData();
  }, []);

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

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
                <td className={styles.td}>{item.fileUtn}</td>
                <td className={styles.td}>
                  {getDocTypeById(item.docTypeID, documentArr)}
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
                <td className={styles.td}>
                  {item.empName} - {item.empNumber}
                </td>
                <td className={styles.td}>{item.preparedDate}</td>
                <td className={styles.td}>{item.subject}</td>
                <td className={styles.td}>{item.description}</td>
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
        className={styles.Popup_component}
        open={isModalOpen}
        closeOnDocumentClick
        onClose={() => setIsModalOpen(false)}
      >
        <div className={styles.modal}>
          <h2>File Details</h2>
          {selectedFile && (
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
                  <td>{getDocTypeById(selectedFile.docTypeID, documentArr)}</td>
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
                    <strong>From Division</strong>
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
                    <strong>Workflow</strong>
                  </td>
                  <td>
                    <div className={styles.workflowContainer}>
                      {selectedFile.workflow &&
                      selectedFile.workflow.trim() !== "" ? (
                        selectedFile.workflow.split(",").map((step, index) => (
                          <div key={index} className={styles.workflowStep}>
                            {index + 1}. {step}
                          </div>
                        ))
                      ) : (
                        <div>N/A</div>
                      )}
                    </div>
                  </td> 
                </tr>
              </tbody>
            </table>
          )}
          <button
            className={styles.closeButton}
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Popup>
    </>
  );
};

export default ReceivedFile;