import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HodStaff.module.css"; // Import the external CSS file
import { useUser } from "../UserContext/UserContext";
import Navbar from "../Navbar/Navbar";
import { baseUrl } from "../../environments/environment";

const HodStaff = () => {
  const { user } = useUser();
  // states for handling UI changes

  const [typeOfEmp, setTypeOfEmp] = useState("");
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showRemoveOptions, setShowRemoveOptions] = useState(false);

  // states for handling fetching and posting data
  const [selectedRegularEmployee, setSelectedRegularEmployee] = useState(null);
  const [selectedContractEmployee, setSelectedContractEmployee] = useState("");
  const [
    selectedContractEmployeeforInputField,
    setSelectedContractEmployeeforInputField,
  ] = useState("");
  const [allNalEmployees, setAllNalEmployees] = useState([]);
  const [divisionalStaff, setDivisionalStaff] = useState([]);
  const [selectedEmpNosToRemove, setSelectedEmpNosToRemove] = useState([]);
  const [contractEmp, setContractEmp] = useState([]);
  console.log(contractEmp);
  useEffect(() => {
    fetchDivisionalStaff();
    fetchAllNalEmployees();
    fetchContractEmployees();
  }, []);

  
  const submitJson = {
    addIncharge: showAddOptions == true ? "yes" : "no",
    typeOfEmp: typeOfEmp,
    
    empNo:
    typeOfEmp == "Regular" && selectedRegularEmployee != null
    ? JSON.parse(selectedRegularEmployee).empno
    : selectedContractEmployee == "AddNewOther"
    ? ""
    : selectedContractEmployee && selectedContractEmployee.trim()
    ? JSON.parse(selectedContractEmployee).empNo
    : "",
    
    empName:
    typeOfEmp == "Regular" && selectedRegularEmployee != null
    ? JSON.parse(selectedRegularEmployee).empname
    : selectedContractEmployee == "AddNewOther"
    ? selectedContractEmployeeforInputField
    : selectedContractEmployee && selectedContractEmployee.trim()
    ? JSON.parse(selectedContractEmployee).empName
    : "",
    
    divId: user.userDivision.divid,
    roleId: 1,
    
    removeIncharge: showRemoveOptions == true ? "yes" : "no",
    etfsEmpRoleWrapper :selectedEmpNosToRemove.map(item => ({ transId : item })),
  };
  console.log(submitJson);
  const onSubmit = async () => {
    try {
      const response = await axios.post(`${baseUrl}addAndRemoveDivStaffRole`,submitJson);
    } catch (e) {
      console.log(e);
    }
    window.location.reload();
  };

  // const postContractEmp = async () => {
  //   try {
  //     const response = await axios.post(`${baseUrl}addRoleMapping`, {
  //       empNo: "",
  //       empName:
  //         selectedContractEmployee == "AddNewOther"
  //           ? selectedContractEmployeeforInputField
  //           : selectedContractEmployee,
  //       divId: user.userDivision.divid,
  //       active: "Y",
  //       roleId: 1,
  //       empType: typeOfEmp,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const postRegularEmp = async () => {
  //   try {
  //     const response = await axios.post(`${baseUrl}addRoleMapping`, {
  //       empNo: JSON.parse(selectedRegularEmployee).empno,
  //       empName: JSON.parse(selectedRegularEmployee).empname,
  //       divId: user.userDivision.divid,
  //       active: "Y",
  //       roleId: 1,
  //       empType: typeOfEmp,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const fetchDivisionalStaff = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getDivisionalStaff/${user.userDivision.divid}`
      );
      setDivisionalStaff(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchContractEmployees = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getTempEmpDataByDivId/${user.userDivision.divid}`
      );
      setContractEmp(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchAllNalEmployees = async () => {
    try {
      const response = await axios.get(`${baseUrl}getAllEmpList/0`);
      setAllNalEmployees(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckboxChange = (empNo) => {
    setSelectedEmpNosToRemove(
      (prevSelected) =>
        prevSelected.includes(empNo)
          ? prevSelected.filter((no) => no !== empNo) // Remove if already selected
          : [...prevSelected, empNo] // Add if not selected
    );
  };

  // const handleSubmit = () => {
  //   if (typeOfEmp == "Contract") {
  //     postContractEmp();
  //   } else if (typeOfEmp == "Regular") {
  //     postRegularEmp();
  //   }
  //   window.location.reload();
  // };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.form_container}>
          <h1 className={styles.title}>ADD DIVISIONAL OFFICE</h1>
          <div>
            <div className={styles.employee_list}>
              <h3 className={styles.subtitle}>List of Employees</h3>
              <div className={styles.listbox}>
                {divisionalStaff.map((item, key) => (
                  <option
                    key={item.transId}
                    style={{ margin: "10px" }}
                    value={item.empname}
                  >
                    {item.empNo} - {item.empName}
                  </option>
                ))}
              </div>
            </div>
            <div className={styles.options_container}>
              <div className={styles.add_incharge}>
                <p style={{ fontWeight: "bold" }}>
                  Do you want to Add New Divisional Staff:
                </p>
                <p>
                  <input
                    type="radio"
                    name="add_incharge"
                    value="yes"
                    onClick={() => setShowAddOptions(true)}
                  />{" "}
                  Yes
                  <input
                    type="radio"
                    name="add_incharge"
                    value="no"
                    checked={!showAddOptions}
                    onClick={() => setShowAddOptions(false)}
                  />{" "}
                  No
                </p>
                {showAddOptions && (
                  <div>
                    <select
                      onChange={(e) => setTypeOfEmp(e.target.value)}
                      name="employeeType"
                      className={styles.select}
                    >
                      <option value="">Select Type of Employee</option>
                      <option value="Regular">Regular</option>
                      <option value="Contract">Contract</option>
                    </select>
                    <div className={styles.select_container}>
                      {typeOfEmp == "Regular" && (
                        <>
                          <label htmlFor="employees" className={styles.label}>
                            Regular Employees
                          </label>
                          <select
                            id="employees"
                            onChange={(e) =>
                              setSelectedRegularEmployee(e.target.value)
                            }
                            className={styles.select}
                          >
                            <option value="">Select Employee</option>
                            {allNalEmployees.map((item, key) => (
                              <option key={key} value={JSON.stringify(item)}>
                                {item.empno} - {item.empname}
                              </option>
                            ))}
                          </select>
                        </>
                      )}
                    </div>
                    <div className={styles.select_container}>
                      {typeOfEmp == "Contract" && (
                        <>
                          <label htmlFor="employees" className={styles.label}>
                            Contract Employees
                          </label>
                          <select
                            id="employees"
                            className={styles.select}
                            onChange={(e) =>
                              setSelectedContractEmployee(e.target.value)
                            }
                          >
                            <option value="">Select Contract Employee</option>
                            {contractEmp.map((item, key) => (
                              <option
                                key={item.empNo}
                                value={JSON.stringify(item)}
                              >
                                {item.empNo} - {item.empName}
                              </option>
                            ))}
                            <option value="AddNewOther">Add New / Other</option>
                          </select>
                          <br />
                          {selectedContractEmployee == "AddNewOther" && (
                            <input
                              type="text"
                              onChange={(e) =>
                                setSelectedContractEmployeeforInputField(
                                  e.target.value
                                )
                              }
                              style={{ margin: "10px 0px", width: "261px" }}
                              className={styles.select}
                              placeholder="Enter Contract Employee Name"
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Vertical line */}
              <div className={styles.vertical_line}></div>

              <div className={styles.remove_incharge}>
                <p style={{ fontWeight: "bold" }}>
                  Do you want to remove Existing Divisional Staff:
                </p>
                <p>
                  <input
                    type="radio"
                    name="remove_incharge"
                    value="yes"
                    onClick={() => setShowRemoveOptions(true)}
                  />{" "}
                  Yes
                  <input
                    type="radio"
                    name="remove_incharge"
                    value="no"
                    checked={!showRemoveOptions}
                    onClick={() => setShowRemoveOptions(false)}
                  />{" "}
                  No
                </p>
                {showRemoveOptions && (
                  <div className={styles.listbox}>
                    {divisionalStaff.map((item, key) => (
                      <div className={styles.listbox_item} key={key}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          onChange={() => handleCheckboxChange(item.transId)}
                          checked={selectedEmpNosToRemove.includes(item.transId)}
                        />{" "}
                        {item.empNo} - {item.empName}
                      </div>
                    ))}
                    <div></div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.submit_container}>
              <button onClick={onSubmit} className={styles.submit_button}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HodStaff;