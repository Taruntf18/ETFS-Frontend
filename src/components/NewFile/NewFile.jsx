import React from "react";
import styles from "./newfile.module.css";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext/UserContext";
import { baseUrl } from "../../environments/environment";

const NewFile = () => {
  const navigate = useNavigate();
  const { user, currentUserRole } = useUser();
  const [priority, setPriority] = useState("");
  const [typeOfDoc, setTypeOfDoc] = useState("");
  const [divId, SetDivId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [sendingThrough, setsendingThrough] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [documentArr, setDocumentArr] = useState([]);
  const [emp_of_my_div, setEmp_of_my_div] = useState([]);
  const [divisionalOffice, setDivisionalOffice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sendingTo, setSendingTo] = useState("");
  const [divisionalEmployees, setDivisionalEmployees] = useState([]);
  const [fileInitiator, setFileInitiator] = useState("");

  console.log(sendingTo);

  const resetForm = () => {
    console.log("Resetting form..."); // Debugging
    setPriority("");
    setTypeOfDoc("");
    SetDivId("");
    setSubject("");
    setDescription("");
    setsendingThrough("");
    setWorkflow("");
    setDivisions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !priority ||
      !typeOfDoc ||
      !subject ||
      !description ||
      !sendingThrough
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    const jsonObject = {
      priority: priority,
      docTypeID: typeOfDoc,
      divId: divId,
      divName: user.userDivision,
      subject: subject,
      description: description,
      preparedBy: user.userId,
      preparedDate: "",
      sendingThrough: sendingThrough,
      status: "1",
      workflow: divisions.toString(),
      sendingTo: sendingTo,
    };
    try {
      const result = await axios.post(`${baseUrl}addFile`, jsonObject);
      console.log("File created successfully:", result.data);
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.log("Axios Error:", error);
    } finally {
      setIsLoading(false);
    }
    console.log(jsonObject);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docResp, empResp, divResp, employeeResp] = await Promise.all([
          axios.get(`${baseUrl}getAllDocument`),
          axios.get(`${baseUrl}getAllDocument`),
          axios.get(`${baseUrl}getDivisionData`),
          axios.get(`${baseUrl}getEmployeeByDivision/${user.userDivision}/0`),
        ]);
        setDocumentArr(docResp.data);
        setEmp_of_my_div(empResp.data);
        setDivisionalOffice(divResp.data);
        setDivisionalEmployees(employeeResp.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };
    fetchData();
  }, []);

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
        <div style={{ height: "100px" }}></div>
        <div className={styles.form_container}>
          <h2>Create New File</h2>
          <form onSubmit={handleSubmit}>
            {currentUserRole == "Divisional Office" && (
              <div className={styles.form_group}>
                <label htmlFor="document-type">
                  File Initiator <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id={styles.document_type}
                  onChange={(e) => {
                    setFileInitiator(e.target.value);
                  }}
                >
                  <option value="">Select Employee</option>
                  {divisionalEmployees.map((item) => (
                    <option key={item.empname} value={item.empname}>
                      {item.empname}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className={styles.form_group}>
              <label htmlFor="document-type">
                Type of Document <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id={styles.document_type}
                value={typeOfDoc}
                onChange={(e) => setTypeOfDoc(e.target.value)}
                required
              >
                <option value="">Select Document</option>
                {documentArr.map((item) => (
                  <option key={item.docId} value={item.docId}>
                    {item.docType}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.form_group}>
              <label>
                Priority <span style={{ color: "red" }}>*</span>
              </label>
              <div className={styles.radio_group}>
                <label>
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === "normal"}
                    onChange={(e) => setPriority(e.target.value)}
                    value="normal"
                    required
                  />{" "}
                  Normal
                </label>
                <label>
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === "immediate"}
                    onChange={(e) => setPriority(e.target.value)}
                    value="immediate"
                    required
                  />{" "}
                  Immediate
                </label>
              </div>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="">
                Subject <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={styles.subject}
                placeholder="Enter the Subject"
                required
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="description">
                Description <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id={styles.description}
                placeholder="Enter the Description"
                required
              ></textarea>
            </div>
            <div className={styles.form_group}>
              <label>
                Through whom are we sending it?{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={sendingThrough}
                onChange={(e) => setsendingThrough(e.target.value)}
                placeholder="Enter the Name"
                className={styles.subject}
                required
              />
            </div>
            {currentUserRole === "Divisional Office" && (
              <div className={styles.form_group_whome}>
                <label>
                  Sending To Divisional Office:
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className={`${styles.form_group}`}>
                  <select
                    id={styles.document_type}
                    onChange={(e) => setSendingTo(e.target.value)}
                    required
                  >
                    <option value="">Select Division</option>
                    {divisionalOffice.map((item) => (
                      <option key={item.divId} value={item.divName}>
                        {item.divName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div className={styles.form_group}>
              <label>Do you want to mention Workflow</label>
              <div className={styles.radio_group}>
                <label>
                  <input
                    type="radio"
                    name="workflow"
                    value="yes"
                    checked={workflow === "yes"}
                    onChange={(e) => setWorkflow(e.target.value)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="workflow"
                    value="no"
                    checked={workflow === "no"}
                    onChange={(e) => setWorkflow(e.target.value)}
                  />
                  No
                </label>
              </div>
            </div>
            {workflow === "yes" && (
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
            <div className={`${styles.form_group} ${styles.submit_button_div}`}>
              <button
                type="submit"
                className={styles.submit_btn}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewFile;
