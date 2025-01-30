import Navbar from "../Navbar/Navbar";
import styles from "./received_file.module.css";
// import TempNav from "../Temp_nav/TempNav";
import { useEffect, useState } from "react";
import axios from "axios";

const ReceivedFile = () => {
  const [filesData, SetfilesData] = useState([]);
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
  console.log(filesData);


  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>Type of Document</th>
              <th className={styles.th}>Priority</th>
              <th className={styles.th}>Subject</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Through whom I'm sending</th>
              <th className={styles.th}>Sending To</th>
            </tr>
          </thead>
          <tbody>
            {filesData.map((item) => (
              <tr className={styles.tr}>
                <td className={styles.td}>{item.docTypeID}</td>
                <td className={`${styles.priority_normal} ${styles.td}`}>{item.priority}</td>
                <td className={styles.td}>{item.subject}</td>
                <td className={styles.td}>{item.description}</td>
                <td className={styles.td}>{item.preparedBy}</td>
                <td className={styles.td}>{item.workflow}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReceivedFile;
