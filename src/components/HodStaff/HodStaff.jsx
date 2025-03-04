import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HodStaff.module.css"; // Import the external CSS file
import { useUser } from "../UserContext/UserContext";
import Navbar from "../Navbar/Navbar";
import { baseUrl } from "../../environments/environment";

const HodStaff = () => {
  const { user } = useUser();
  const [typeOfEmp, setTypeOfEmp] = useState("");
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showRemoveOptions, setShowRemoveOptions] = useState(false);
  const [employeeNames, setEmployeeNames] = useState({});
  const [selectedContractEmployee, setSelectedContractEmployee] = useState("");
  const [divisionalStaff, setDivisionalStaff] = useState([]);
  const [allNalEmployees, setAllNalEmployees] = useState([]);
  const [contractEmployees, setContractEmployees] = useState([]);

  // useEffect(() => {
  //   fetchDivisionalStaff();
  // }, []);
  useEffect(() => {
    fetchDivisionalStaff();
    fetchAllNalEmployees();
    fetchContractEmployees();
  }, []);

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
      const response = await axios.get(`${baseUrl}getContractEmpData`);
      setContractEmployees(response.data);
      console.log(response.data);
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
                  <option key={item.transId} value={item.empname}>
                    {item.empName}
                  </option>
                ))}
              </div>
            </div>
            <div className={styles.options_container}>
              <div className={styles.add_incharge}>
                <p style={{ fontWeight: "bold" }}>
                  Do you want to Add New In-Charge:
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
                          <select id="employees" className={styles.select}>
                            {allNalEmployees.map((item, key) => (
                              <option key={key} value={item.empno}>
                                {item.empname} - {item.empno}
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
                            {contractEmployees.map((item, key) => (
                              <option key={key} value={item.empNo}>
                                {item.empName} - {item.empNo}
                              </option>
                            ))}
                            <option value="AddNewOther">Add New / Other</option>
                          </select>
                          <br />
                          {selectedContractEmployee == "AddNewOther" && (
                            <input
                              type="text"
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
                {}
              </div>
              <div className={styles.remove_incharge}>
                <p style={{ fontWeight: "bold" }}>
                  Do you want to remove Existing In-Charge:
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
                    onClick={() => setShowRemoveOptions(false)}
                  />{" "}
                  No
                </p>
                {showRemoveOptions && (
                  <div className={styles.listbox}>
                    {divisionalStaff.map((item, key) => (
                      <div className={styles.listbox_item} key={key}>
                        <input type="checkbox" className={styles.checkbox} />{" "}
                        {item.empName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.submit_container}>
              <button className={styles.submit_button}>SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HodStaff;
