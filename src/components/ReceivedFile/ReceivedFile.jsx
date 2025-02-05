import styles from "./received_file.module.css";
import Navbar from "../Navbar/Navbar";  
import { useEffect, useState } from "react";
import axios from "axios";

const ReceivedFile = () => {
  const [filesData, SetfilesData] = useState([]);
  const [documentArr, setDocumentArr] = useState([]);

  console.log(filesData);
  function getDocTypeById(docId, documents) {
    const doc = documents.find(doc => doc.docId === docId);
    return doc ? doc.docType : null;
  }

  const getReceivedFilesData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllFiles");
      SetfilesData(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  useEffect(() => {
    getReceivedFilesData();
  }, []);

  const handleReceive = (fileId) => {
    console.log(`File with ID ${fileId} received.`);
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docResp = await axios.get("http://localhost:8080/getAllDocument")
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
              <th className={styles.th}>Type of Document</th>
              <th className={styles.th}>Priority</th>
              <th className={styles.th}>Date</th>   
              <th className={styles.th}>Subject</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Through Whom</th>
              <th className={styles.th}>Workflow</th>
              <th className={styles.th}>Action</th>
              <th className={styles.th}>Sending To</th>
            </tr>
          </thead>
          <tbody>
            {filesData.map((item, key) => (
              <tr className={styles.tr} key={key}>
                <td className={styles.td}>{getDocTypeById(item.docTypeID, documentArr)}</td>
                <td className={`${item.priority === "immediate" ? styles.priority_immediate : styles.priority_normal} ${styles.td}`}>
                  {
                      capitalizeFirstLetter(item.priority)
                  }
                </td>
                <td className={styles.td}>{item.preparedDate}</td>
                <td className={styles.td}>{item.subject}</td>
                <td className={styles.td}>{item.description}</td>
                <td className={styles.td}>{item.sendingThrough}</td>
                <td className={styles.td}>{item.workflow}</td>
                <td className={styles.td}>
                  <button className={styles.receiveButton} onClick={() => handleReceive(item.id)}>
                    Receive
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReceivedFile;