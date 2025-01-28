import React, { useState } from "react";
import styles from "./newfile.module.css";
import Navbar from "../Navbar/Navbar";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";

const API_URL = "";

const NewFile = () => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [workflow, setWorkflow] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [resp, setResp] = useState([]);
  const [documentArr, setDocumentArr] = useState([]);
  const [emp_of_my_div, setEmp_of_my_div] = useState([]);
  const [divisionalOffice, setDivisionalOffice] = useState([]);


  // fetching type of document data
  const getDocumentResp = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/getAllDocument"
      );
      setDocumentArr(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };
  useEffect(() => {
    getDocumentResp();
  }, []);

  // fetching Employee of my division data
  const getEmpOfMyDiv = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/getAllDocument"
      );
      setEmp_of_my_div(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };
  useEffect(() => {
    getEmpOfMyDiv();
  }, []);

  // fetching divisional office data
  const getdivisionalOffice = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/getAllDocument"
      );
      setDivisionalOffice(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };
  useEffect(() => {
    getdivisionalOffice();
  }, []);

  const handleSenderChange = (event) => {
    setSender(event.target.value);
  };

  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
  };

  const handleWorkflowChange = (event) => {
    setWorkflow(event.target.value === "true");
  };

  const handleAddDivision = () => {
    setDivisions([...divisions, ""]);
  };

  const handleDeleteDivision = (index) => {
    setDivisions(divisions.filter((_, i) => i !== index));
  };

  const handleDivisionChange = (index, value) => {
    const updatedDivisions = [...divisions];
    updatedDivisions[index] = value;
    setDivisions(updatedDivisions);
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.form_container}>
          <h2>Create New File</h2>
          <form>
            <div className={styles.form_group}>
              <label htmlFor="document-type">Type of Document</label>
              <select id={styles.document_type}>
                <option>Select the Document</option>
                {documentArr.map((item) => (
                  <option key={item.docId} value={item.docId}>
                    {item.docType}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.form_group}>
              <label>Priority</label>
              <div className={styles.radio_group}>
                <label>
                  <input type="radio" name="priority" value="normal" /> Normal
                </label>
                <label>
                  <input type="radio" name="priority" value="immediate" />{" "}
                  Immediate
                </label>
              </div>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="">Subject</label>
              <input type="text" className={styles.subject} />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="description">Description</label>
              <textarea id={styles.description}></textarea>
            </div>
            <div className={styles.form_group}>
              <label>Through whom are we sending it?</label>
              <div className={styles.radio_group}>
                <label>
                  <input
                    type="radio"
                    name="sender"
                    value="self"
                    checked={sender === "self"}
                    onChange={handleSenderChange}
                  />
                  Self
                </label>
                <label>
                  <input
                    type="radio"
                    name="sender"
                    value="others"
                    checked={sender === "others"}
                    onChange={handleSenderChange}
                  />
                  Others
                </label>
              </div>
              {sender === "others" && (
                <input
                  type="text"
                  placeholder="Enter the Name"
                  className={styles.subject}
                />
              )}
            </div>

            <div className={styles.form_group_whome}>
              <label>Sending To :</label>
              <div className={styles.radio_group}>
                <label>
                  <input
                    type="radio"
                    name="receiver"
                    value="employee_of_my_division"
                    checked={receiver === "employee_of_my_division"}
                    onChange={handleReceiverChange}
                  />
                  Employees of My Division
                </label>
                <label>
                  <input
                    type="radio"
                    name="receiver"
                    value="divisional_office"
                    checked={receiver === "divisional_office"}
                    onChange={handleReceiverChange}
                  />
                  Divisional Office
                </label>
              </div>
              {receiver === "divisional_office" && (
                <div className={styles.form_group}>
                  <select id={styles.document_type}>
                    <option>Select Division</option>
                    <option>ICTD</option>
                    <option>ADMIN</option>
                    <option>S&P</option>
                  </select>
                </div>
              )}
              {receiver === "employee_of_my_division" && (
                <div className={styles.form_group}>
                  <select id={styles.document_type}>
                    <option>Select Employee</option>
                    <option>Pragathi</option>
                    <option>Harsha</option>
                    <option>Vivek</option>
                    <option>Tarun</option>
                  </select>
                </div>
              )}
            </div>

            <div className={styles.form_group}>
              <label>Do you want to mention Workflow</label>
              <div className={styles.radio_group}>
                <label>
                  <input
                    type="radio"
                    name="workflow"
                    value="true"
                    onChange={handleWorkflowChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="workflow"
                    value="false"
                    onChange={handleWorkflowChange}
                  />
                  No
                </label>
              </div>
              {workflow && (
                <div className={styles.workflow_container}>
                  {divisions.map((division, index) => (
                    <div key={index} className={styles.division_row}>
                      <input
                        type="text"
                        value={division}
                        onChange={(e) =>
                          handleDivisionChange(index, e.target.value)
                        }
                        placeholder="Enter Division Name"
                        className={styles.division_input}
                      />
                      <FaTrash
                        className={styles.delete_icon}
                        onClick={() => handleDeleteDivision(index)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddDivision}
                    className={styles.add_btn}
                  >
                    Add Division
                  </button>
                </div>
              )}
            </div>
            <div className={`${styles.form_group} ${styles.submit_button_div}`}>
              <button type="submit" className={styles.submit_btn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewFile;
