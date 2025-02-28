import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HodStaff.module.css"; // Import the external CSS file
import { useUser } from "../UserContext/UserContext";
import Navbar from "../Navbar/Navbar";

const HodStaff = () => {
  const {user} = useUser();
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
    <Navbar/>
    <div className={styles.body}>
      <div className={styles.form_container}>
        <h1 className={styles.title}>ADD DIVISIONAL OFFICE</h1>
        <div className={styles.radio_group}>
          <p>
            <input
              type="radio"
              name="employee_type"
              value="permanent"
              onClick={() => setShowSections(true)}
            />{" "}
            Permanent Employee
            <input
              type="radio"
              name="employee_type"
              value="contract"
              onClick={() => setShowSections(true)}
            />{" "}
            Contract Employee
          </p>
        </div>
        {showSections && (
          <div>
            <div className={styles.employee_list}>
              <h3 className={styles.subtitle}>List of Employees</h3>
              <div className={styles.listbox}>
                {Array.from({ length: 9 }, (_, i) => (
                  <div className={styles.listbox_item} key={i}>
                    Employee {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.options_container}>
              <div className={styles.add_incharge}>
                <h4 className={styles.subtitle}>ADD NEW INCHARGE</h4>
                <p>
                  Do you want to Add New In-Charge*:
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
                      {/* <select id="employees" className={styles.select}>
                        <option>--Select--</option>
                      </select> */}
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
                <p>
                  Do you want to remove Existing In-Charge*:
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
