import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HodStaff.module.css"; // Import the external CSS file
import { useUser } from "../UserContext/UserContext";
import Navbar from "../Navbar/Navbar";

const HodStaff = () => {
  const { user } = useUser();
  const [showSections, setShowSections] = useState(false);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showRemoveOptions, setShowRemoveOptions] = useState(false);
  const [employeeNames, setEmployeeNames] = useState({});

  useEffect(() => {
    const fetchEmployeeNames = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getEmployeeByDivision/${user.userDivision.divname}/0`
        );
        setEmployeeNames(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchEmployeeNames();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.form_container}>
          <h1 className={styles.title}>ADD DIVISIONAL OFFICE</h1>
          <div className={styles.radio_group}>

            <label>
              <input
                type="radio"
                name="employee_type"
                onChange={(e) => setShowSections(e.target.value)}
                value="permanent"
                required
              />{" "}
              Permanent Employee
            </label>
            <label>
              <input
                type="radio"
                name="employee_type"
                onChange={(e) => setShowSections(e.target.value)}
                value="contract"
                required
              />{" "}
              Contract Employee
            </label>
          </div>
          {showSections && (
            <div>
              <div className={styles.employee_list}>
                <h3 className={styles.subtitle}>List of Employees</h3>
                <div className={styles.listbox}>
                    <div className={styles.listbox_item}>
                      Employee 
                    </div>
                </div>
              </div>
              <div className={styles.options_container}>
                <div className={styles.add_incharge}>
                  <h4 className={styles.subtitle}>ADD NEW INCHARGE</h4>

                  Do you want to Add New In-Charge<span style={{ color: "red" }}>*</span>:
                  <div style={{margin:'10px'}}>
                    <label>
                      <input
                        type="radio"
                        name="add_incharge"
                        onChange={() => setShowAddOptions(true)}
                        value="yes"
                        required
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="add_incharge"
                        onChange={() => setShowAddOptions(false)}
                        value="no"
                        required
                      />{" "}
                      No
                    </label>
                  </div>

                  {showAddOptions && (
                    <div>
                      <div className={styles.button_group}>
                        <button className={styles.add_button}>
                          ADD MORE CATEGORY IN-CHARGE
                        </button>
                        <button className={styles.delete_button}>
                          DELETE LAST ROW
                        </button>
                      </div>
                      <div className={styles.select_container}>
                        <label htmlFor="employees" className={styles.label}>
                          Employees
                        </label>
                        <select id="employees" className={styles.select}>
                          {employeeNames.map((item, key) => (
                            <option key={key} value={item.empname}>
                              {item.empname}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.remove_incharge}>
                  <h4 className={styles.subtitle}>REMOVE EXISTING INCHARGE</h4>
                    Do you want to remove Existing In-Charge<span style={{ color: "red" }}>*</span>:
                    <div style={{margin:'10px'}}>
                      <label >
                        <input
                          type="radio"
                          name="remove_incharge"
                          onChange={() => setShowRemoveOptions(true)}
                          value="yes"
                          required
                        />{" "}
                        Yes
                      </label>
                      
                      <label>
                        <input
                          type="radio"
                          name="remove_incharge"
                          onChange={() => setShowRemoveOptions(false)}
                          value="no"
                          required
                        />{" "}
                        No
                      </label>
                    </div>
                  {showRemoveOptions && (
                    <div className={styles.listbox}>
                      {Array.from({ length: 8 }, (_, i) => (
                        <div className={styles.listbox_item} key={i}>
                          <input type="checkbox" className={styles.checkbox} />{" "}
                          Employee {i + 1}
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
          )}
        </div>
      </div>
    </>
  );
};

export default HodStaff;