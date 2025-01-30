import React from "react";
import styles from "./newfile.module.css";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";

const NewFile = () => {
  // states for storing input form data
  const [priority, setPriority] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [senderName, SetsenderName] = useState("");
  // const [receiverName, SetreceiverName] = useState("");
  const [typeOfDoc, setTypeOfDoc] = useState("");

  // states for hadling ui changes
  const [divisions, setDivisions] = useState([]);
  const [showActualPopUp, setShowActualPopUp] = useState(false);
  const [documentArr, setDocumentArr] = useState([]);
  const [emp_of_my_div, setEmp_of_my_div] = useState([]);
  const [divisionalOffice, setDivisionalOffice] = useState([]);

  function convertDateFormat(inputDate) {
    const dateObject = new Date(inputDate);
    if (isNaN(dateObject)) {
      throw new Error("Invalid date format. Please use MM/DD/YYYY.");
    }
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const jsonObject = {
    docTypeID: typeOfDoc,
    divId: "",
    priority: priority,
    preparedBy: "",
    preparedDate: convertDateFormat(new Date().toLocaleDateString()),
    subject: subject,
    description: description,
    // "sender" : sender,
    // "senderName": senderName,
    // "receiver" : receiver,
    // "receiverName": receiverName,
    // "workflowDescription" : divisions,
    workflow: divisions.toString(),
    status: "",
  };

  console.log(jsonObject, " jsonObject");

  const handleSubmit = async () => {
    // e.preventDefault();
    console.log("Form Data:", JSON.stringify(jsonObject, null, 2));
    try {
      const result = await axios.post(
        "http://localhost:8080/addFile",
        jsonObject
      );
      console.log(result);
    } catch (error) {
      console.log("Axios Error:", error);
    }
  };

  // fetching type of document data
  const getDocumentResp = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllDocument");
      setDocumentArr(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };
  useEffect(() => {
    getDocumentResp();
  }, []);

  // fetching employees of my division data
  const getEmpOfMyDiv = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllDocument");
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
      const response = await axios.get("http://localhost:8080/getDivisionData");
      setDivisionalOffice(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };
  useEffect(() => {
    getdivisionalOffice();
  }, []);

  const hadleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const hadleSenderNameChange = (event) => {
    SetsenderName(event.target.value);
  };

  const hadleReceiverName = (event) => {
    SetreceiverName(event.target.value);
  };

  const hadleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleSenderChange = (event) => {
    setSender(event.target.value);
  };

  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
  };

  const handleWorkflowChange = (event) => {
    setWorkflow(event.target.value);
  };

  const handlActualpop = () => {
    if (showActualPopUp) setShowActualPopUp(false);
    else setShowActualPopUp(true);
  };

  const closePopup = () => {
    setShowActualPopUp(false);
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
      {/* <TempNav /> */}
      <div className={styles.body}>
        <div className={styles.form_container}>
          <h2>Create New File</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_group}>
              <label htmlFor="document-type">Type of Document</label>
              <select
                id={styles.document_type}
                onChange={(e) => {
                  setTypeOfDoc(e.target.value);
                }}
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
              <label>Priority</label>
              <div className={styles.radio_group}>
                <label>
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === "normal"}
                    onChange={handlePriorityChange}
                    value="normal"
                  />{" "}
                  Normal
                </label>
                <label>
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === "immediate"}
                    onChange={handlePriorityChange}
                    value="immediate"
                  />{" "}
                  Immediate
                </label>
              </div>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="">Subject</label>
              <input
                type="text"
                onChange={hadleSubjectChange}
                className={styles.subject}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="description">Description</label>
              <textarea
                onChange={hadleDescriptionChange}
                id={styles.description}
              ></textarea>
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
                  onChange={hadleSenderNameChange}
                  placeholder="Enter the Name"
                  className={`${styles.subject} `}
                />
              )}
            </div>

            <div className={styles.form_group_whome}>
              <label>Sending To:</label>
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
                <div className={`${styles.form_group}`}>
                  <select id={styles.document_type}>
                    <option>Select Division</option>
                    {divisionalOffice.map((item) => (
                      <option key={item.divId} value={item.divName}>
                        {item.divName}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {receiver === "employee_of_my_division" && (
                <div className={`${styles.form_group}`}>
                  <select id={styles.document_type}>
                    {emp_of_my_div.map((item) => (
                      <option key={item.docId} value={item.docId}>
                        {item.docType}
                      </option>
                    ))}
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
                    value="yes"
                    checked={workflow === "yes"}
                    onChange={handleWorkflowChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="workflow"
                    value="no"
                    checked={workflow === "no"}
                    onChange={handleWorkflowChange}
                  />
                  No
                </label>
              </div>
            </div>
            {workflow === "yes" && (
              <button
                onClick={handlActualpop}
                type="button"
                className={styles.add_btn}
              >
                Add Division
              </button>
            )}
            <div name="workflowdiv" id="workflowdiv">
              {workflow === "yes" &&
                divisions.map((division, index) => (
                  <span
                    style={{
                      display: "inline-block",
                      marginBottom: "20px",
                      fontSize: "25px",
                      fontWeight: "bold",
                    }}
                    key={index}
                    className={styles.division_row}
                  >
                    {division}&nbsp;&nbsp;&rArr;&nbsp;&nbsp;&nbsp;
                  </span>
                ))}
            </div>
            <div className={`${styles.form_group} ${styles.submit_button_div}`}>
              <button type="submit" className={styles.submit_btn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {showActualPopUp && (
        <div className={styles.popup}>
          <div className={styles.popup_content}>
            <h3>Workflow Details</h3>
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
                    style={{ cursor: "pointer" }}
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

            <div className={styles.popup_buttons}>
              <button onClick={closePopup} className={styles.close_btn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewFile;
