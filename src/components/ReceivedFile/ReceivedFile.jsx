import styles from "./received_file.module.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const ReceivedFile = () => {
  const [filesData, SetfilesData] = useState([]);

  const getReceivedFilesData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllFiles");
      SetfilesData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  useEffect(() => {
    getReceivedFilesData();
  }, []);

  const handleReceive = (fileId) => {
    console.log(`File with ID ${fileId} received.`);
    // You can also make an API call here to update the status
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>Type of Document</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Priority</th>
              <th className={styles.th}>Subject</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Through whom I'm sending</th>
              <th className={styles.th}>Sending To</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filesData.map((item, key) => (
              <tr className={styles.tr} key={key}>
                <td className={styles.td}>{item.docTypeID}</td>
                <td className={`${item.priority === "Immediate" ? styles.priority_immediate : styles.priority_normal} ${styles.td}`}>
                  {item.priority}
                </td>
                <td className={styles.td}>{item.subject}</td>
                <td className={styles.td}>{item.description}</td>
                <td className={styles.td}>{item.preparedBy}</td>
                <td className={styles.td}>{item.workflow}</td>
                <td className={styles.td}>{item.date || "N/A"}</td>
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