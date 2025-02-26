import React from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './status.module.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import { baseUrl } from '../../environments/environment';
import { useUser } from '../UserContext/UserContext';

const Status = () => {
    const [filesData, setFilesData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchType, setSearchType] = useState("searchByFileUtn");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const {currentUserRole} = useUser();
    const {user} = useUser();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${baseUrl}getDataByKeywords/${searchInput.replaceAll('/', "_")}`);
            setFilesData(response.data);
        } catch (error) {
            console.error("Axios Error:", error);
        }
    };

    const handleDateSearch = async () => {
        try {
            const response = await axios.get(`${baseUrl}getDataByDateRange`, {
                params: { fromDate, toDate }
            });
            setFilesData(response.data);
        } catch (error) {
            console.error("Axios Error:", error);
        }
    };

    useEffect(() => {
        const getReceivedFilesData = async () => {
            try {
                let response;
                if(currentUserRole == "Employee"){
                    response = await axios.get(`${baseUrl}getDataByEmpIdAndDivision/${user.userId}/${user.userDivision.divname}`);
                }else if(currentUserRole == "Divisional Office"){
                    response = await axios.get(`${baseUrl}getAllFilesByDivName/${user.userDivision.divname}`);
                }
                setFilesData(response.data);
            } catch (error) {
                console.error("Axios Error:", error);
            }
        };
        getReceivedFilesData();
    }, []);

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    return (
        <>
            <Navbar />
            <div className={styles.body}>
                <div className={styles.searchContainer}>
                    <select 
                        className={styles.listbox} 
                        value={searchType} 
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="searchByFileUtn">Search By File UTN / Subject / Description</option>
                        <option value="searchByDate">Search By Date</option>
                    </select>
                    {searchType === 'searchByFileUtn' && (
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

                    {searchType === 'searchByDate' && (
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
                            <button onClick={handleDateSearch} className={styles.receiveButton}>
                                Search
                            </button>
                        </div>
                    )}
                </div>

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
                        </tr>
                    </thead>
                    <tbody>
                        {filesData.map((item, key) => (
                            <tr className={styles.tr} key={key}>
                                <td className={styles.td}>{item.fileUtn}</td>
                                <td className={styles.td}>{item.docType}</td>
                                <td className={`${item.priority === "immediate" ? styles.priority_immediate : styles.priority_normal} ${styles.td}`}>
                                    {capitalizeFirstLetter(item.priority)}
                                </td>
                                <td className={styles.td}>{item.empName} - {item.empNumber}</td>
                                <td className={styles.td}>{item.preparedDate}</td>
                                <td className={styles.td}>{item.subject}</td>
                                <td style={{ textWrap: 'wrap' }} className={styles.td}>{item.description}</td>
                                <td className={styles.td}>{item.sendingThrough}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Status;