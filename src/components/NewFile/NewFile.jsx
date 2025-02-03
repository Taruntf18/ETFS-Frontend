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

  const jsonObject = {
    "docTypeID": typeOfDoc,
    "divId": "",
    "priority": priority,
    "preparedBy": "",
    "subject": subject,
    "description": description,
    // "sender" : sender,
    // "senderName": senderName,
    // "receiver" : receiver,
    // "receiverName": receiverName,
    // "workflowDescription" : divisions,
    "workflow": divisions.toString(),
    "status": ""
  }

  const handleSubmit = async () => {
   
    console.log("submit button clicked");
    console.log("Form Data:", JSON.stringify(jsonObject, null, 2));
    try {
      const result = await axios.post('http://localhost:8080/addFile', jsonObject);
      console.log(result);
    } catch (error) {
      console.log("Axios Error:", error);
    }
  };

  // fetching DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docResp, empResp, divResp] = await Promise.all([
          axios.get("http://localhost:8080/getAllDocument"),
          axios.get("http://localhost:8080/getAllDocument"),
          axios.get("http://localhost:8080/getDivisionData"),
        ]);
        setDocumentArr(docResp.data);
        setEmp_of_my_div(empResp.data);
        setDivisionalOffice(divResp.data);
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
      {/* <TempNav /> */}
      <div className={styles.body}>
        <div className={styles.form_container}>
          <h2>Create New File</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_group}>
              <label htmlFor="document-type">Type of Document</label>
              <select id={styles.document_type} onChange={(e) => { setTypeOfDoc(e.target.value) }}>
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
                  <input type="radio" name="priority" checked={priority === 'normal'} onChange={(e) => setPriority(e.target.value)} value="normal" /> Normal
                </label>
                <label>
                  <input type="radio" name="priority" checked={priority === 'immediate'} onChange={(e) => setPriority(e.target.value)} value="immediate" />{" "}
                  Immediate
                </label>
              </div>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="">Subject</label>
              <input type="text" onChange={(e) => setSubject(e.target.value)} className={styles.subject} />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="description">Description</label>
              <textarea onChange={(e) => setDescription(e.target.value)} id={styles.description}></textarea>
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
                    onChange={(e) => setSender(e.target.value)}
                  />
                  Self
                </label>
                <label>
                  <input
                    type="radio"
                    name="sender"
                    value="others"
                    checked={sender === "others"}
                    onChange={(e) => setSender(e.target.value)}
                  />
                  Others
                </label>
              </div>
              {sender === "others" && (
                <input
                  type="text"
                  onChange={(e) => SetsenderName(e.target.value)}
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
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                  Employees of My Division
                </label>
                <label>
                  <input
                    type="radio"
                    name="receiver"
                    value="divisional_office"
                    checked={receiver === "divisional_office"}
                    onChange={(e) => setReceiver(e.target.value)}
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
                    checked={workflow === 'yes'}
                    onChange={(e) => setWorkflow(e.target.value)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="workflow"
                    value="no"
                    checked={workflow === 'no'}
                    onChange={(e) => setWorkflow(e.target.value)}
                  />
                  No
                </label>
              </div>
            </div>
            {workflow === "yes" &&(
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
              <button onClick={handleSubmit} type="submit" className={styles.submit_btn}>
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