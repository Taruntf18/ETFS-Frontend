import React from 'react'
import Navbar from '../Navbar/Navbar'
import styles from './status.module.css'
import { useEffect, useState } from "react";
import axios from 'axios';

const Status = () => {
    const [filesData, SetfilesData] = useState([]);
    const [documentArr, setDocumentArr] = useState([]);
    const [searchInput, SetSearchInput] = useState("");
    console.log(searchInput);

    function getDocTypeById(docId, documents) {
        const doc = documents.find(doc => doc.docId === docId);
        return doc ? doc.docType : null;
    }

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/`);
            SetfilesData(response.data);
        } catch (error) {
            console.error("Axios Error:", error);
        }
    }


    const getReceivedFilesData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getDataByEmpId/${localStorage.getItem("userId").toString().slice(1, -1)}`);
            console.log(response.data);
            SetfilesData(response.data);
        } catch (error) {
            console.error("Axios Error:", error);
        }
    };

    useEffect(() => {
        getReceivedFilesData();
    }, []);


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
                <div>
                    <input className={styles.input_inset} type="text" onChange={(e)  => SetSearchInput(e.target.value)}  placeholder="Search"></input>
                    <button onClick={handleSearch} className={styles.receiveButton} >
                        Seach
                    </button>
                </div>
                    <table className={styles.table}>
                      <thead className={styles.thead}>
                        <tr className={styles.tr}>
                          
                          <th className={styles.th}>Type of Document</th>
                          <th className={styles.th}>Priority</th>
                          <th className={styles.th}>Date</th>   
                          <th className={styles.th}>Subject</th>
                          <th className={styles.th}>Description</th>
                          <th className={styles.th}>Through Whom</th>
                          <th className={styles.th}>File Utn</th>
                          <th className={styles.th}>Prepared By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filesData.map((item, key) => (
                          <tr className={styles.tr} key={key}>
                            <td className={styles.td}>{getDocTypeById(item.docTypeID, documentArr)}</td>
                            <td className={`${item.priority === "immediate" ? styles.priority_immediate : styles.priority_normal} ${styles.td}`}>
                              {capitalizeFirstLetter(item.priority)}
                            </td>
                            <td className={styles.td}>{item.preparedDate}</td>
                            <td className={styles.td}>{item.subject}</td>
                            <td className={styles.td}>{item.description}</td>
                            <td className={styles.td}>{item.sendingThrough}</td>
                            <td className={styles.td}>{item.fileUtn}</td>
                            <td className={styles.td}>{item.empName} - {item.empNumber}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
        </>
    )
}

export default Status
